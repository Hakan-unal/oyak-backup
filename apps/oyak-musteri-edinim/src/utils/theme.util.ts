import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

import { DynamicType } from '@models/common.model';

const breakpoints = createBreakpoints({
  xs    : '25em',
  sm    : '30em',
  md    : '48em',
  lg    : '62em',
  xl    : '80em',
  '2xl' : '96em',
});

const activeLabelStyles = {
  fontSize   : '14px',
  lineHeight : '16px',
  transform  : 'scale(0.85) translateY(-24px)',
};

export const customTheme = extendTheme({
  breakpoints,
  colors: {
    primary: {
      base : '#E40520',
      pale : '#EE3F44',
    },
    basic: {
      100 : '#F4F4F4',
      200 : '#E0E0E0',
      300 : '#999999',
      400 : '#6A6A6A',
      500 : '#2C2C2C',
    },
    brand: {
      100: '#f7fafc',
    },
    helper: {
      green: {
        base    : '#3E920F',
        pale    : '#AADD66',
        opacity : '#3E920F10',
      },
      blue: {
        base : '#376EDA',
        pale : '#6F9EF8',
      },
      orange: {
        base : '#E58021',
        pale : '#F7953A',
      },
      red: {
        base    : '#E40520',
        opacity : '#E4052010',
      },
    },
  },
  components: {
    Steps: {
      ...Steps,
      baseStyle: (props: DynamicType) => ({
        ...Steps.baseStyle(props),
        stepIconContainer: {
          ...Steps.baseStyle(props).stepIconContainer,
          width  : '24px',
          height : '24px',
        },
      }),
    },
    Form: {
      variants: {
        floating: {
          container: {
            my           : 4,
            _focusWithin : {
              input                         : { shadow: 'none' },
              'label:not(.chakra-checkbox)' : {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            input: {
              border       : 'none',
              rounded      : 'none',
              borderBottom : '1px',
              borderColor  : 'basic.300',
            },
            label: {
              color           : 'basic.400',
              fontSize        : '16px',
              lineHeight      : '20px',
              top             : 2,
              left            : -4,
              // zIndex          : 2,
              position        : 'absolute',
              backgroundColor : 'white',
              pointerEvents   : 'none',
              mx              : 3,
              px              : 1,
              my              : 2,
              transformOrigin : 'left top',
            },
            '.chakra-checkbox__control': {
              height       : '24px',
              width        : '24px',
              border       : '1px solid',
              borderColor  : 'basic.300',
              borderRadius : '3px',
            },
            '.chakra-checkbox__control[data-checked]': {
              bg          : 'primary.base',
              borderColor : 'primary.base',
            },
            'label.chakra-checkbox': {
              fontSize      : '14px',
              mr            : 0,
              pointerEvents : 'auto',
            },
          },
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight : { md: 'bold' },
        fontSize   : { base: '14px', md: '16px' },
        lineHeight : { base: '19px', md: '20px' },
        _hover     : {
          _disabled: { bg: 'basic.base' },
        },
      },
      variants: {
        primary: {
          bg      : 'primary.base',
          rounded : 'full',
          color   : 'white',
        },
        secondary: {
          rounded : 'full',
          border  : '1px',
        },
        primaryLink: {
          color : 'primary.base',
          width : '120px',
        },
      },
    },
    Checkbox: {
      defaultProps: {
        size        : 'xl', // default is md
        colorScheme : 'red', // default is gray
      },
      baseStyle: {
        control: {
          border       : '2px solid',
          borderRadius : 'md',
        },
      },
      sizes: {
        xl: {
          control : { w: 6, h: 6 },
          label   : { fontSize: 'lg' },
          icon    : { fontSize: '0.625rem' },
        },
      },
    },
    Text: {
      variants: {
        info: {
          fontWeight : 'normal',
          fontSize   : '16px',
          lineHeight : '20px',
          color      : 'basic.400',
        },
        boldInfo: {
          fontWeight : 'bold',
          fontSize   : '16px',
          lineHeight : '20px',
          color      : 'basic.400',
        },
        body1: {
          fontWeight : '700',
          fontSize   : '16px',
          lineHeight : '20px',
          color      : 'basic.500',
          fontStyle  : 'normal',
        },
        body2: {
          fontWeight : '400',
          fontSize   : '16px',
          lineHeight : '20px',
          color      : 'basic.500',
          fontStyle  : 'normal',
        },
        body3: {
          fontWeight : '700',
          fontSize   : '14px',
          lineHeight : '19px',
          color      : 'basic.500',
          fontStyle  : 'normal',
        },
        body4: {
          fontWeight : '400',
          fontSize   : '14px',
          lineHeight : '19px',
          color      : 'basic.500',
          fontStyle  : 'normal',
        },
        boldMobile: {
          fontWeight : '700',
          fontSize   : '2.7vw',
          lineHeight : '12px',
          color      : 'basic.500',
          fontStyle  : 'normal',
        },
        mobile: {
          fontWeight : '400',
          fontSize   : '2.6vw', // calculate screen width * 2.6 / 100
          lineHeight : '12px',
          color      : 'basic.500',
          fontStyle  : 'normal',
        },
      },
    },
  },
  styles: {
    global: {
      '#root': {
        h: '100%',
      },
      html: {
        h: '100%',
      },
      body: {
        h          : '100%',
        bg         : 'basic.100',
        color      : 'basic.500',
        fontFamily : `"Roboto", sans-serif`,
      },
    },
  },
});
