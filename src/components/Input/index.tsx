import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

interface IInput extends CurrencyInputProps {
  name?: string;
  label?: string;
  className?: string;
  prefix: string;
}
export default function Input({
  name,
  label,
  className,
  prefix,
  ...props
}: IInput) {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <CurrencyInput
        prefix={`${prefix} `}
        name="myInput"
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        decimalSeparator=","
        groupSeparator="."
        fixedDecimalLength={2}
        {...props}
      />
    </>
  );
}
