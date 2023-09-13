interface VariantOptionProps {
  outerClass: string;
  labelClass: string;
}

export type DropdownVariantType = 'default' | 'material';

export const DropdownVariant: Record<string, VariantOptionProps> = {
  default: {
    outerClass : 'gap-2 py-2 px-4 rounded-lg border',
    labelClass : 'text-sm',
  },
  material: {
    outerClass : 'ml-4 mr-6 border-b',
    labelClass : 'w-full outline-none font-bold',
  },
};
