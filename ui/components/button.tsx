import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  className?: string; // Disabled state
  type?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  startIcon,
  endIcon,
  onClick,
  className = "",
}) => {

  return (
    <button
      className={`${className}`}
      onClick={onClick}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;