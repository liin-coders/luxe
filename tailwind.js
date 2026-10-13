  tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            cream: '#FAF4F0',
            espresso: '#2E2625',
            charcoal: '#5C5351',
            dusty: '#D9A294',
            onyx: '#1E1B1B',
            alabaster: '#EAE4E2',
            darkSurface: '#161313',
            darkCard: '#241F1E'
          },
          fontFamily: {
            serif: ['"Playfair Display"', 'serif'],
            sans: ['"Lato"', 'sans-serif'],
          },
          boxShadow: {
            'luxury': '0 20px 45px -15px rgba(46, 38, 37, 0.08)',
            'luxury-dark': '0 20px 45px -15px rgba(0, 0, 0, 0.45)',
            'glow': '0 0 25px rgba(217, 162, 148, 0.45)'
          }
        }
      }
    };