/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    textShadow:{
      'fire':'0 0.5rem 2rem rgba(255, 56, 96, 0.7)',
      'black':'0 0.2rem 2rem rgba(0,0,0,0.3)'
    },
    extend: {
      fontFamily:{
        'krub': ['Krub','sans-serif'],
        'turret':['Turret Road', 'cursive'],
        'Cormorant':['Cormorant Upright', 'serif'],
        'anurati':['Anurati-Regular'],
        'sourceCode':['Source Code Pro','monospace'],
        'varino':['Varinonormal-Regular'],
        'spaceGrotesk':['Space Grotesk', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      },
      keyframes:{
        buttonBlink:{
          '0%':{opacity:'80%'},
          '10%':{opacity:'10%'},
          '15%':{opacity:'70%'},
          '20%':{opacity:'0%'},
          '30%':{opacity:'70%'},
          '40%':{opacity:'10%'},
          '45%':{opacity:'70%'},
          '50%':{opacity:'30%'},
          '60%':{opacity:'90%'},
          '70%':{opacity:'10%'},
          '75%':{opacity:'80%'},
          '78%':{opacity:'10%'},
          '82%':{opacity:'50%'},
          '90%':{opacity:'80%'},
          '100%':{opacity:'100%'}
        }
      },
      animation:{
        buttonBlink:'buttonBlink 3s ease-out',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwind-scrollbar'),
  ],
}
