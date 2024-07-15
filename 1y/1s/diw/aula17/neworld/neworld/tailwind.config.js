/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'neutras01':'#000000',
        'neutras02':'#FFFFFF',
        'primarias01':'#FDE2FF',
        'primarias02':'#5D576B',
        'primarias03':'#8884FF',
      }
    },
    fontFamily: {
      ibm: ["IBM Plex Sans", "sans-serif"],
      ibmc: ["IBM Plex Sans Condensed", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    fontSize: {
      // TODO: Trocar tamanhos das fontes
      sm: '1.25rem',           // Body small
      base: '2rem',         // Body
      xl: '4rem',           // H2
      '2xl': '8rem',     // H1
      'button': '2.25rem',  // Button
      /* '4xl': '2.441rem',
      '5xl': '3.052rem', */
    },
  },
  plugins: [],
}

