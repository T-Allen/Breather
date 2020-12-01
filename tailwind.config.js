module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      display: ['Cabin', 'sans-serif'],
      body: ['Cabin', 'sans-serif']
    },
    extend: {
      animation: {
        'disappear': 'disappear 500ms ease-out',
        'wave': 'wave 2s linear infinite',
      },
      colors: {
        lightGreen: '#27AE60',
        yellow: '#FFD554',
        orange: '#FFB26D',
        salmon: '#E59A9A',
        red: '#FF4141',
        brown: '#93471C',
        lightGray: '#666666'
      },
      borderRadius: {
        'xl': '2rem'
      },
      height: {
        'page': '60vh'
      },
      keyframes: {
        disappear: {
          '0%': {
            opacity: '100',
            transform: 'translateY(0%)'
          },
          '50%': {
            opacity: '0',
          },
          '99%': {
            transform: 'translateY(50%)'
          },
          '100%': {
            display: 'none'
          },
        },
        wave: {
          '0%': { transform: 'translateX(0%)'},
          '100%': { transform: 'translateX(50%)'}
        }
      }
    }
  },
  plugins: [
    require('tailwindcss-blend-mode')(),
  ],
}
