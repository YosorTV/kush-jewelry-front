import { LoadOptions } from 'react-select-async-paginate';

export type OptionType = {
  label: string;
  value: string;
};

export interface SelectProps {
  name?: string;
  loadOptions: LoadOptions<OptionType, null, { page: number }>;
  onChange: (selectedOption: OptionType | null) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  value: OptionType | null;
  label?: string;
  options?: OptionType[];
  disabled: boolean;
}

export type ClassNamesType = {
  container: () => string;
  input: () => string;
  control: (state: { isFocused: boolean }) => string;
  valueContainer: () => string;
  menu: () => string;
  option: (state: { isSelected: boolean; isFocused: boolean }) => string;
  singleValue: () => string;
};
