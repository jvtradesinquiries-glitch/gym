import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.shop": "SHOP",
      "nav.about": "ABOUT",
      "nav.contact": "CONTACT",
      "nav.account": "ACCOUNT",
      "nav.cart": "CART",
      
      // Hero Section
      "hero.title": "Performance Training Wear",
      "hero.subtitle": "Engineered for Gymnastics",
      "hero.description": "Minimalist performance training wear — Designed for those who value freedom of movement, in and out of training.",
      "hero.shop": "SHOP NOW",
      "hero.earlyAccess": "EARLY ACCESS",
      "hero.front": "Front",
      "hero.back": "Back",
      
      // Product
      "product.soldCount": "{{count}} sold",
      "product.addToCart": "ADD TO CART",
      "product.joinWaitlist": "JOIN WAITLIST",
      "product.selectSize": "Select Size",
      "product.inStock": "In Stock",
      "product.soldOut": "SOLD OUT",
      "product.comingSoon": "COMING SOON",
      "product.mostPopular": "Most Popular",
      
      // Cart
      "cart.title": "Your Cart",
      "cart.empty": "Your cart is empty",
      "cart.continueShopping": "Continue Shopping",
      "cart.checkout": "CHECKOUT",
      "cart.subtotal": "Subtotal",
      "cart.shipping": "Shipping",
      "cart.total": "Total",
      "cart.remove": "Remove",
      
      // Auth
      "auth.signIn": "SIGN IN",
      "auth.signUp": "SIGN UP",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.name": "Full Name",
      "auth.createAccount": "Create Account",
      "auth.alreadyHaveAccount": "Already have an account?",
      "auth.noAccount": "Don't have an account?",
      "auth.forgotPassword": "Forgot password?",
      "auth.continueWithGoogle": "Continue with Google",
      
      // Common
      "common.loading": "Loading...",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.submit": "Submit",
      "common.close": "Close",
      "common.or": "OR"
    }
  },
  
  es: {
    translation: {
      // Navigation
      "nav.shop": "TIENDA",
      "nav.about": "ACERCA DE",
      "nav.contact": "CONTACTO",
      "nav.account": "CUENTA",
      "nav.cart": "CARRITO",
      
      // Hero Section
      "hero.title": "Ropa de Entrenamiento de Alto Rendimiento",
      "hero.subtitle": "Diseñada para Gimnasia",
      "hero.description": "Ropa de entrenamiento minimalista y de alto rendimiento — Diseñada para quienes valoran la libertad de movimiento, dentro y fuera del entrenamiento.",
      "hero.shop": "COMPRAR AHORA",
      "hero.earlyAccess": "ACCESO ANTICIPADO",
      "hero.front": "Frente",
      "hero.back": "Atrás",
      
      // Product
      "product.soldCount": "{{count}} vendidos",
      "product.addToCart": "AGREGAR AL CARRITO",
      "product.joinWaitlist": "ÚNETE A LA LISTA",
      "product.selectSize": "Seleccionar Talla",
      "product.inStock": "En Stock",
      "product.soldOut": "AGOTADO",
      "product.comingSoon": "PRÓXIMAMENTE",
      "product.mostPopular": "Más Popular",
      
      // Cart
      "cart.title": "Tu Carrito",
      "cart.empty": "Tu carrito está vacío",
      "cart.continueShopping": "Seguir Comprando",
      "cart.checkout": "PAGAR",
      "cart.subtotal": "Subtotal",
      "cart.shipping": "Envío",
      "cart.total": "Total",
      "cart.remove": "Eliminar",
      
      // Auth
      "auth.signIn": "INICIAR SESIÓN",
      "auth.signUp": "REGISTRARSE",
      "auth.email": "Correo Electrónico",
      "auth.password": "Contraseña",
      "auth.name": "Nombre Completo",
      "auth.createAccount": "Crear Cuenta",
      "auth.alreadyHaveAccount": "¿Ya tienes una cuenta?",
      "auth.noAccount": "¿No tienes una cuenta?",
      "auth.forgotPassword": "¿Olvidaste tu contraseña?",
      "auth.continueWithGoogle": "Continuar con Google",
      
      // Common
      "common.loading": "Cargando...",
      "common.save": "Guardar",
      "common.cancel": "Cancelar",
      "common.submit": "Enviar",
      "common.close": "Cerrar",
      "common.or": "O"
    }
  },
  
  fr: {
    translation: {
      // Navigation
      "nav.shop": "BOUTIQUE",
      "nav.about": "À PROPOS",
      "nav.contact": "CONTACT",
      "nav.account": "COMPTE",
      "nav.cart": "PANIER",
      
      // Hero Section
      "hero.title": "Vêtements d'Entraînement Performance",
      "hero.subtitle": "Conçu pour la Gymnastique",
      "hero.description": "Vêtements d'entraînement minimalistes et performants — Conçus pour ceux qui valorisent la liberté de mouvement, pendant et en dehors de l'entraînement.",
      "hero.shop": "ACHETER MAINTENANT",
      "hero.earlyAccess": "ACCÈS ANTICIPÉ",
      "hero.front": "Devant",
      "hero.back": "Dos",
      
      // Product
      "product.soldCount": "{{count}} vendus",
      "product.addToCart": "AJOUTER AU PANIER",
      "product.joinWaitlist": "REJOINDRE LA LISTE",
      "product.selectSize": "Sélectionner la Taille",
      "product.inStock": "En Stock",
      "product.soldOut": "ÉPUISÉ",
      "product.comingSoon": "BIENTÔT DISPONIBLE",
      "product.mostPopular": "Le Plus Populaire",
      
      // Cart
      "cart.title": "Votre Panier",
      "cart.empty": "Votre panier est vide",
      "cart.continueShopping": "Continuer vos Achats",
      "cart.checkout": "PAYER",
      "cart.subtotal": "Sous-total",
      "cart.shipping": "Livraison",
      "cart.total": "Total",
      "cart.remove": "Retirer",
      
      // Auth
      "auth.signIn": "SE CONNECTER",
      "auth.signUp": "S'INSCRIRE",
      "auth.email": "Email",
      "auth.password": "Mot de Passe",
      "auth.name": "Nom Complet",
      "auth.createAccount": "Créer un Compte",
      "auth.alreadyHaveAccount": "Vous avez déjà un compte?",
      "auth.noAccount": "Vous n'avez pas de compte?",
      "auth.forgotPassword": "Mot de passe oublié?",
      "auth.continueWithGoogle": "Continuer avec Google",
      
      // Common
      "common.loading": "Chargement...",
      "common.save": "Sauvegarder",
      "common.cancel": "Annuler",
      "common.submit": "Soumettre",
      "common.close": "Fermer",
      "common.or": "OU"
    }
  }
};

i18n
  .use(LanguageDetector) // Automatically detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default to English if language not found
    supportedLngs: ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'zh', 'ko', 'nl'],
    
    detection: {
      // Order of language detection
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
