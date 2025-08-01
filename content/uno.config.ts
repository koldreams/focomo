import { defineConfig, presetUno, presetTypography, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:300,400,500,600,700',
        mono: 'SF Mono:400,500',
      },
    }),
  ],
  theme: {
    colors: {
      tomato: {
        50: '#fff7f5',
        100: '#ffeee8',
        200: '#ffddd0',
        300: '#ffbfa8',
        400: '#ff8a65', // tomato-red-light
        500: '#ff6b47', // tomato-red (primary)
        600: '#e64a19', // tomato-red-dark
        700: '#bf360c',
        800: '#8d2f00',
        900: '#5d1f00',
      },
      surface: '#f8f9fa',
      border: '#dee2e6',
    },
    boxShadow: {
      'custom': '0 2px 4px rgba(0,0,0,0.1)',
      'custom-lg': '0 8px 32px rgba(0,0,0,0.12)',
    },
    borderRadius: {
      'custom': '8px',
      'custom-lg': '12px',
    },
    animation: {
      'fade-in': 'fadeIn 0.2s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-out',
      'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      bounceGentle: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-5px)' },
      },
    },
  },
  shortcuts: {
    // Layout shortcuts
    'container-custom': 'max-w-6xl mx-auto px-4 lg:px-8',
    'section-spacing': 'py-12 lg:py-16',
    
    // Button shortcuts
    'btn-base': 'inline-flex items-center px-6 py-3 rounded-custom font-semibold text-sm transition-all duration-200 cursor-pointer',
    'btn-primary': 'btn-base bg-tomato-500 text-white hover:bg-tomato-600 hover:transform hover:translate-y-[-1px] hover:shadow-custom-lg',
    'btn-outline': 'btn-base bg-transparent text-tomato-500 border-2 border-tomato-500 hover:bg-tomato-500 hover:text-white hover:transform hover:translate-y-[-1px]',
    
    // Card shortcuts
    'card-base': 'bg-white rounded-custom-lg shadow-custom p-6 transition-all duration-200',
    'card-hover': 'card-base hover:transform hover:translate-y-[-4px] hover:shadow-custom-lg',
    'card-surface': 'bg-surface rounded-custom-lg p-6',
    
    // Text shortcuts
    'text-muted': 'text-gray-600',
    'text-primary': 'text-gray-900',
    'heading-primary': 'text-3xl lg:text-4xl font-bold text-gray-900 mb-4',
    'heading-secondary': 'text-2xl lg:text-3xl font-semibold text-tomato-500 mb-6',
    
    // Navigation shortcuts
    'nav-link': 'text-gray-600 font-medium hover:text-tomato-500 transition-colors duration-200',
    'nav-brand': 'flex items-center text-gray-900 font-semibold text-xl',
    
    // Hero shortcuts
    'hero-title': 'text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-tomato-500 to-tomato-400 bg-clip-text text-transparent',
    'hero-description': 'text-lg text-gray-600 max-w-3xl mx-auto mb-8',
    
    // FAQ shortcuts
    'faq-question': 'bg-tomato-500 text-white p-6 font-semibold text-lg',
    'faq-answer': 'p-6 bg-surface',
    
    // Grid shortcuts
    'grid-responsive': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    'grid-2col': 'grid grid-cols-1 lg:grid-cols-2 gap-8',
    
    // Footer shortcuts
    'footer-section': 'space-y-4',
    'footer-link': 'text-gray-300 hover:text-white transition-colors duration-200 text-sm',
    'footer-heading': 'text-white font-semibold mb-4',
  },
  rules: [
    // Custom backdrop blur for better browser support
    ['backdrop-blur-custom', { 'backdrop-filter': 'blur(10px)', '-webkit-backdrop-filter': 'blur(10px)' }],
    
    // Skip link accessibility
    ['skip-link', {
      'position': 'absolute',
      'top': '-40px',
      'left': '6px',
      'background': '#ff6b47',
      'color': 'white',
      'padding': '8px',
      'text-decoration': 'none',
      'border-radius': '8px',
      'font-weight': '600',
      'z-index': '1000',
    }],
    ['skip-link:focus', { 'top': '6px' }],
    
    // Smooth scroll behavior
    ['scroll-smooth', { 'scroll-behavior': 'smooth' }],
    
    // Text rendering optimizations
    ['text-rendering-optimized', {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    }],
  ],
  safelist: [
    // Always include these classes
    'skip-link',
    'hero-title',
    'hero-description',
    'btn-primary',
    'btn-outline',
    'card-hover',
    'nav-link',
  ],
})