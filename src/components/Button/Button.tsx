import { ButtonHTMLAttributes } from "react";

import "./Button.scss";

export enum BUTTON_TYPES_CLASSES {
  google = "google-sign-in",
  inverted = "inverted"
}

type ButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  buttonType?: "google" | "inverted";
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  disabled,
  buttonType,
  isLoading,
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`button-container ${
        buttonType && BUTTON_TYPES_CLASSES[buttonType]
      }`}
      {...otherProps}
    >
      {isLoading ? <div className="button-spinner" /> : children}
    </button>
  );
};

export default Button;
