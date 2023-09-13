/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        xs    : '376px',
        sm    : '640px',
        md    : '768px',
        lg    : '1024px',
        xl    : '1280px',
        '2xl' : '1536px',
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },
      height: {
        auth: '720px',
      },
      minWidth: {
        sidebar: '320px',
      },
      fontSize: {
        xxs: [ '10px', '14px' ],
      },
      colors: {
        primary: {
          dark  : '#E40520',
          light : '#EE3F44',
        },
        basic: {
          one   : '#FFFFFF',
          two   : '#F4F4F4',
          three : '#E0E0E0',
          four  : '#999999',
          five  : '#6A6A6A',
          six   : '#2C2C2C',
        },
        green: {
          dark  : '#3E920F',
          light : '#AADD66',
        },
        blue: {
          dark  : '#376EDA',
          light : '#6F9EF8',
        },
        orange: {
          dark  : '#E58021',
          light : '#F7953A',
        },
        grey: {
          light: '#444444',
        },
        shadow: {
          dark  : '#FFFFFF',
          light : '#FFFFFF',
        },
        black      : '#231F20',
        background : {
          auth : '#E6E6E6',
          main : '#E3E3E3',
        },
        softRed: {
          dark  : '#F3797C',
          light : '#FCE6E9',
        },
        softGreen: {
          light: '#DDF1C2',
        },
        graph: {
          red                 : '#E74C3C',
          green               : '#2ECC71',
          black               : '#000000',
          white               : '#FFFFFF',
          performanceAnalysis : {
            closing  : '#505050',
            perfRate : '#D14E27',
          },
          technicAnalysis: {
            selectedButton : '#FFCECE',
            ohlcL          : '#437EB4',
            bandTop        : '#D6A08E',
            bandBot        : '#38485C',
            volume         : '#E6C344',
          },
          sentimentAnalysis: {
            negativeStrongColor : '#E74C3C',
            negativeColor       : '#F1948A',
            neutralColor        : '#808080',
            positiveColor       : '#82E0AA',
            positiveStrongColor : '#2ECC71',
          },
          valuationFactor: {
            series1 : '#5B8FF9',
            series2 : '#5AD8A6',
            series3 : '#5D7092',
            series4 : '#F6BD16',
            series5 : '#E8684A',
            series6 : '#6DC8EC',
          },
        },
        skeleton: {
          base      : '#C0C0C0',
          highlight : '#FFFFFF',
        },
      },
    },
  },
  plugins  : [],
  safelist : [
    {
      pattern: /(bg|text|border)-*/,
    },
  ],
};
