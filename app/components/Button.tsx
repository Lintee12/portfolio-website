import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

function Button(props: Props) {
  const { className, children, ...rest } = props;

  return (
    <button
      className={`disabled:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed p-2 px-8 active:scale-[0.99] duration-75 transition-all will-change-transform border outline-none w-full py-3 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
