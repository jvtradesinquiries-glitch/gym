import React, { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage Component
 * 
 * Features:
 * - Lazy loading (loads only when visible)
 * - Progressive loading (blur placeholder → full image)
 * - Automatic CDN proxy for CORS
 * - Loading skeleton
 * - Error handling with fallback
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '',
  priority = false, // Set true for above-fold images
  placeholder = 'blur', // 'blur', 'skeleton', or 'none'
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images load immediately
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // Generate blur placeholder (tiny version)
  const getPlaceholder = () => {
    if (placeholder === 'none') return null;
    
    if (placeholder === 'blur') {
      // Create a tiny blurred version
      return (
        <div 
          className="image-placeholder blur"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      );
    }

    if (placeholder === 'skeleton') {
      return (
        <div 
          className="image-skeleton"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%)',
            backgroundSize: '200% 100%',
            animation: isLoaded ? 'none' : 'shimmer 1.5s infinite',
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      );
    }
  };

  // Proxy URL through backend to avoid CORS issues
  const getProxiedUrl = (url) => {
    if (!url) return '';
    
    // If it's a customer-assets URL, proxy it
    if (url.includes('customer-assets.emergentagent.com')) {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      return `${backendUrl}/api/proxy-image?url=${encodeURIComponent(url)}`;
    }
    
    return url;
  };

  const imageSrc = isInView ? getProxiedUrl(src) : '';

  if (hasError) {
    return (
      <div 
        className={`image-error ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          color: '#666',
          fontSize: '14px'
        }}
        {...props}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-wrapper ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {getPlaceholder()}
      
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
          {...props}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
