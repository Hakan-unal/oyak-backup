import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  fontSize   : "12px",
  lineHeight : "16px",
  transform  : "scale(0.85) translateY(-24px)",
};

export const customTheme = extendTheme({
  colors: {
    primary: {
      base : "#E40520",
      pale : "#EE3F44",
    },
    basic: {
      100 : "#F4F4F4",
      200 : "#E0E0E0",
      300 : "#999999",
      400 : "#6A6A6A",
      500 : "#2C2C2C",
    },
    brand: {
      100: "#f7fafc",
    },
    helper: {
      green: {
        base : "#3E920F",
        pale : "#AADD66",
      },
      blue: {
        base : "#376EDA",
        pale : "#6F9EF8",
      },
      orange: {
        base : "#E58021",
        pale : "#F7953A",
      },
    },
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            my           : 4,
            _focusWithin : {
              input                         : { shadow: "none" },
              "label:not(.chakra-checkbox)" : {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            input: {
              border       : "none",
              rounded      : "none",
              borderBottom : "2px",
              borderColor  : "basic.300",
            },
            label: {
              color           : "basic.400",
              fontSize        : "16px",
              lineHeight      : "20px",
              top             : 2,
              left            : -4,
              // zIndex          : 2,
              position        : "absolute",
              backgroundColor : "#FAFAFA",
              pointerEvents   : "none",
              mx              : 3,
              px              : 1,
              my              : 2,
              transformOrigin : "left top",
            },
            ".chakra-checkbox__control": {
              height       : "24px",
              width        : "24px",
              border       : "1px solid",
              borderColor  : "basic.300",
              borderRadius : "3px",
            },
            ".chakra-checkbox__control[data-checked]": {
              bg          : "primary.base",
              borderColor : "primary.base",
            },
            "label.chakra-checkbox": {
              fontSize      : "14px",
              mr            : 0,
              pointerEvents : "auto",
            },
          },
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight : "bold",
        fontSize   : "18px",
        lineHeight : "20px",
        _hover     : {
          _disabled: { bg: "basic.base" },
        },
      },
      variants: {
        primary: {
          bg         : "primary.base",
          rounded    : "full",
          fontSize   : "18px",
          lineHeight : "20px",
          color      : "white",
        },
        secondary: {
          rounded    : "full",
          border     : "1px",
          fontSize   : "18px",
          lineHeight : "20px",
        },
        primaryLink: {
          color: "primary.base",
        },
      },
    },
    Checkbox: {
      defaultProps: {
        size        : "lg", // default is md
        colorScheme : "red",
        rounded     : "full", // default is gray
      },
      baseStyle: {
        control: {
          border       : "2px solid",
          borderRadius : "sm",
          borderColor  : "basic.400",
        },
        label: {
          fontWeight : "600",
          fontSize   : "14px",
          lineHeight : "18px",
          color      : "basic.400",
        },
      },
    },
    Text: {
      variants: {
        header1: {
          fontWeight : "bold",
          fontSize   : "20px",
          lineHeight : "26px",
          color      : "basic.500",
        },
        header2: {
          fontWeight : "bold",
          fontSize   : "16px",
          lineHeight : "22px",
          color      : "basic.500",
        },
        rBody2: {
          fontWeight : "normal",
          fontSize   : "14px",
          lineHeight : "18px",
          color      : "basic.400",
        },
      },
    },
  },
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: {
      "#root": {
        h: "100%",
      },
      html: {
        h: "100%",
      },
      body: {
        h     : "100%",
        bg    : "#FAFAFA",
        color : "basic.500",
      },
    },
  },
});
