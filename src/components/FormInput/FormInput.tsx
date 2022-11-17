import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

import SelectCountry from "../SelectCountry/SelectCountry";

import "./FormInput.scss";

type FormInputProps = {
  label: string;
  value?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  return (
    <div className="form-input-container">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value && otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

type FormInputSelectCountriesProps = {
  label: string;
  value?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const FormInputSelectCountries = ({
  label,
  ...otherProps
}: FormInputSelectCountriesProps) => {
  return (
    <div className="form-input-container">
      <SelectCountry className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value && otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
