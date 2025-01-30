import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
}

function Button(props: Props) {
  const { className, children, ...rest } = props;

  return (
    <button
      className={`bg-white disabled:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed rounded p-2 px-8 active:scale-[0.99] duration-75 transition-all will-change-transform border outline-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
