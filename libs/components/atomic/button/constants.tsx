export type ButtonVariant = 'primary' | 'secondary';
export type ButtonType = 'button' | 'text' | 'tabLabel' | 'colorless';

export const ButtonTypes: Record<ButtonType, string> = {
  button:
    'w-full sm:w-fit font-bold py-3 px-10 text-center rounded-full whitespace-nowrap',
  text      : 'text-sm',
  tabLabel  : 'text-base sm:text-lg whitespace-nowrap',
  colorless : '',
};

export const ButtonColors: Record<ButtonType, Record<ButtonVariant, string>> = {
  button: {
    primary   : 'bg-primary-dark text-white',
    secondary : 'bg-white text-basic-six border-2 border-basic-six',
  },
  text: {
    primary   : 'text-basic-six',
    secondary : 'text-primary-dark',
  },
  tabLabel: {
    primary   : 'font-bold text-basic-six border-b-2 border-primary-dark',
    secondary : 'font-normal text-basic-five',
  },
  colorless: {
    primary   : '',
    secondary : '',
  },
};
