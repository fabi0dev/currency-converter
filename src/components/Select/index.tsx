import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  name?: string;
  label?: string;
}
export default function Select({ children, name, label, ...props }: IButton) {
  return (
    <>
      <label
        htmlFor={`sel-${name}`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={`sel-${name}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      >
        {children}
      </select>
    </>
  );
}
