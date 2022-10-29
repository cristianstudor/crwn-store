import "./Button.scss";

export const BUTTON_TYPES_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted"
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  return (
    <button
      disabled={isLoading}
      className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? <div className="button-spinner" /> : children}
    </button>
  );
};

export default Button;
