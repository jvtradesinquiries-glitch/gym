import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { heroProduct } from '../data/mock';
import { getSanitizedImage, preloadCriticalImages } from '../utils/imageSanitizer';

const Hero = ({ onEarlyAccessClick }) => {
  const { t } = useTranslation();
  const [showBack, setShowBack] = useState(false);
  const [frontSanitized, setFrontSanitized] = useState(null);
  const [backSanitized, setBackSanitized] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({ front: false, back: false });
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  const frontOriginal = heroProduct.image;
  const backOriginal = heroProduct.backImage;

  // Preload hero images immediately on mount
  useEffect(() => {
    preloadCriticalImages([frontOriginal, backOriginal]);
    
    // Force decode images before showing
    const decodeImages = async () => {
      const img1 = new Image();
      const img2 = new Image();
      
      img1.src = frontOriginal;
      img2.src = backOriginal;
      
      try {
        await Promise.all([
          img1.decode(),
          img2.decode()
        ]);
        // Images fully decoded, they'll display instantly now
      } catch (e) {
        // Fallback if decode fails
        console.log('Image decode failed, using normal load');
      }
    };
    
    decodeImages();
    
    // Show skeleton for minimum 800ms so users can see the loading state
    const minDisplayTime = setTimeout(() => {
      setShowSkeleton(false);
    }, 800);
    
    return () => clearTimeout(minDisplayTime);
  }, [frontOriginal, backOriginal]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sanitize images in background
  useEffect(() => {
    let mounted = true;
    
    const sanitizeImages = async () => {
      // Process both images in parallel
      const [sanitizedFront, sanitizedBack] = await Promise.all([
        getSanitizedImage(frontOriginal),
        getSanitizedImage(backOriginal)
      ]);
      
      if (mounted) {
        setFrontSanitized(sanitizedFront);
        setBackSanitized(sanitizedBack);
      }
    };
    
    sanitizeImages();
    
    return () => {
      mounted = false;
    };
  }, [frontOriginal, backOriginal]);
  
  // Memoize current image to prevent unnecessary re-renders
  const currentSanitized = useMemo(() => {
    return showBack 
      ? (backSanitized || backOriginal) 
      : (frontSanitized || frontOriginal);
  }, [showBack, frontSanitized, backSanitized, frontOriginal, backOriginal]);

  return (
    <section className="hero-section">
      <div className="hero-inner">
        {/* Text content */}
        <div className="hero-content">
          <h1 className="hero-title">RAZE</h1>
          <p className="hero-tagline">{t('hero.tagline')}</p>
          <p className="hero-description">
            {t('hero.description')}
          </p>
          <div className="hero-cta">
            <Button 
              className="btn-primary"
              onClick={() => {
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('hero.shopNow')}
            </Button>
          </div>
        </div>

        {/* Hero shirt display */}
        <div className="hero-product-display">
          {/* Loading skeleton - shows for min 800ms OR until images loaded */}
          {(showSkeleton || !imagesLoaded) && (
            <div className="hero-image-loading">
              <div className="loading-shimmer"></div>
            </div>
          )}
          
          {isMobile ? (
            /* Mobile: Show both shirts side by side */
            <div className="hero-shirts-mobile" style={{ opacity: (!showSkeleton && imagesLoaded) ? 1 : 0 }}>
              <div className="hero-image-container hero-shirt-front">
                <div className="hero-shirt-glow-layer" />
                <img 
                  src={frontSanitized || frontOriginal}
                  alt="Performance T-Shirt - Front View"
                  className="hero-shirt-single"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  onLoad={() => {
                    setLoadedImages(prev => ({ ...prev, front: true }));
                    if (loadedImages.back) setImagesLoaded(true);
                  }}
                />
              </div>
              <div className="hero-image-container hero-shirt-back">
                <div className="hero-shirt-glow-layer" />
                <img 
                  src={backSanitized || backOriginal}
                  alt="Performance T-Shirt - Back View"
                  className="hero-shirt-single"
                  loading="eager"
                  decoding="async"
                  onLoad={() => {
                    setLoadedImages(prev => ({ ...prev, back: true }));
                    if (loadedImages.front) setImagesLoaded(true);
                  }}
                />
              </div>
            </div>
          ) : (
            /* Desktop: Show single shirt with toggle */
            <>
              <div className="hero-image-container" style={{ opacity: (!showSkeleton && imagesLoaded) ? 1 : 0 }}>
                <div className="hero-shirt-glow-layer" />
                <img 
                  src={currentSanitized}
                  alt={`Performance T-Shirt - ${showBack ? 'Back' : 'Front'} View`}
                  className="hero-shirt-single"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  onLoad={() => setImagesLoaded(true)}
                />
              </div>
              
              {/* Front/Back Toggle - Desktop only */}
              <div className="hero-view-toggle">
                <button 
                  className={`toggle-btn ${!showBack ? 'active' : ''}`}
                  onClick={() => setShowBack(false)}
                >
                  {t('hero.front')}
                </button>
                <button 
                  className={`toggle-btn ${showBack ? 'active' : ''}`}
                  onClick={() => setShowBack(true)}
                >
                  {t('hero.back')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
