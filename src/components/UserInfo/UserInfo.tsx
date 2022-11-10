import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selectors";
import { updateUserData } from "../../store/user/user.actions";

import FormInput, { FormInputSelectCountries } from "../FormInput/FormInput";
import Button from "../Button/Button";

import "./UserInfo.scss";

const defaultFormFields = {
  name: "",
  email: "email",
  city: "",
  country: "",
  address: ""
};

const Address = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, city, country, address } = formFields;

  useEffect(() => {
    if (currentUser) {
      const { displayName, email, userAddress } = currentUser;
      const name = displayName;
      setFormFields({ name, email, ...userAddress });
    } else {
      setFormFields(defaultFormFields);
    }
  }, [currentUser]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const submitUpdatedInfo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedInfo = {
      displayName: name,
      email: email,
      userAddress: { country, city, address }
    };
    dispatch(updateUserData(updatedInfo));
  };

  return (
    <div className="user-info-container">
      <form className="form-container" onSubmit={submitUpdatedInfo}>
        <h2>Account Info</h2>
        <span className="email">{email}</span>
        <FormInput
          label="name"
          type="text"
          onChange={handleChange}
          name="name"
          value={name}
        />
        <h2>Address</h2>
        <FormInputSelectCountries
          label="country"
          onChange={handleChange}
          name="country"
          value={country}
        />
        <FormInput
          label="city"
          type="text"
          onChange={handleChange}
          name="city"
          value={city}
        />
        <FormInput
          label="address"
          type="text"
          onChange={handleChange}
          name="address"
          value={address}
        />
        <Button>Update info</Button>
      </form>
    </div>
  );
};

export default Address;
