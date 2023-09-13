/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DropdownVariant, DropdownVariantType } from './constants';
import TranslatedText from '../text/translated-text';
import ArrowDown from '@libs/assets/images/svgs/angle-down.svg';
import ArrowUp from '@libs/assets/images/svgs/angle-up.svg';
import { DynamicType } from '@libs/models/model';
import { findByText } from '@libs/utils/object.util';

export interface DropdownItemProps {
  label: string;
  value: string | number;
}

export interface DropdownProps {
  label?: string;
  options: DropdownItemProps[];
  defaultValue?: string | number;
  onChange?: (item: DropdownItemProps) => void;
  variant?: DropdownVariantType;
  autocomplete?: boolean;
}

const Dropdown = ({
  label,
  options,
  defaultValue,
  onChange,
  variant = 'default',
  autocomplete = false,
}: DropdownProps) => {
  const { t } = useTranslation();
  const ref = useRef<DynamicType>(null);
  const [ isActive, setIsActive ] = useState<boolean>(false);
  const [ filteredOptions, setFilteredOptions ] = useState<DynamicType>();
  const [ searchInputValue, setSearchInputValue ] = useState<string>();

  const selectedOptionItem = useMemo(
    () => options?.find((option) => option.value === defaultValue),
    [ defaultValue, options ],
  );

  useEffect(() => {
    if (isActive) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => window.removeEventListener('click', handleOutsideClick);
  }, [ isActive ]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (!ref?.current?.contains(event.target)) {
      setIsActive(false);
    }
  };

  const handleClick = (item: DropdownItemProps) => {
    onChange?.(item);
    setIsActive(false);
  };

  const handleSearch = (event) => {
    setIsActive(true);
    setSearchInputValue(event.target.value);
    const filtered = findByText(options, event.target.value);

    setFilteredOptions(filtered);
  };

  const handleFocus = () => {
    setSearchInputValue('');
    setFilteredOptions(undefined);
  };

  return (
    <>
      {label && (
        <TranslatedText
          className='text-xs text-basic-five ml-4'
          label={label}
        />
      )}
      <div className='relative min-w-[140px] min-h-[36px]' ref={ref}>
        <div
          className={`relative flex items-center justify-between focus:outline-none border-basic-four cursor-pointer ${DropdownVariant[variant].outerClass} `}
          onClick={() => setIsActive(!isActive)}
        >
          <input
            className={`${DropdownVariant[variant].labelClass} cursor-pointer`}
            onChange={handleSearch}
            onFocus={handleFocus}
            readOnly={!autocomplete}
            value={isActive ? searchInputValue : selectedOptionItem?.label}
          />
          {isActive ? <ArrowDown /> : <ArrowUp />}
        </div>

        <ul
          className={`absolute max-h-[185px] min-h-[36px] flex flex-col w-full bg-basic-one mt-2 ${
            isActive ? 'block' : 'hidden'
          } overflow-y-auto shadow`}
        >
          {(filteredOptions
            ? filteredOptions
            : options.filter((option) => option.value !== searchInputValue)
          ).map((option: DropdownItemProps) => (
            <li
              className='flex items-center text-basic-six text-sm py-2 px-4 z-50 cursor-pointer bg-inherit hover:bg-basic-two shadow-lg first:rounded-t-lg last:rounded-b-lg'
              key={option.value}
              onClick={() => handleClick(option)}
              value={option.value}
            >
              {t(option.label)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
