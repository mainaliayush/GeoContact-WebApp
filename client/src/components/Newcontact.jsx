import { useState } from "react";
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../index.css";

const Newcontact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cByPhone: false,
    cByEmail: false,
    cByMail: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClick1 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/newContact/newContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      console.log(data);
      navigate("/homepage");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick2 = () => {
    navigate("/homepage");
  };

  return (
    <div className="new-section">
      <h1 className="new-create-contact">Create Contact</h1>
      <form className="new-contact-form" onSubmit={handleClick1}>
        <fieldset className="new-basic-info">
          <legend>Basic Info</legend>
          <label htmlFor="fname" className="new-form-label">
            First Name:
          </label>
          <input
            type="text"
            name="fname"
            id="fname"
            className="new-form-control"
            required
            onChange={handleChange}
          />

          <label htmlFor="lname" className="new-form-label">
            Last Name:
          </label>
          <input
            type="text"
            name="lname"
            id="lname"
            className="new-form-control"
            required
            onChange={handleChange}
          />

          <label htmlFor="phone" className="new-form-label">
            Phone:
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="new-form-control"
            required
            onChange={handleChange}
          />

          <label htmlFor="email" className="new-form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="new-form-control"
            required
            onChange={handleChange}
          />
        </fieldset>
        <br />

        <fieldset className="new-address">
          <legend>Address</legend>
          <label htmlFor="street" className="new-form-label">
            Street:
          </label>
          <input
            type="text"
            name="street"
            id="street"
            className="new-form-control"
            required
            onChange={handleChange}
          />

          <label htmlFor="city" className="new-form-label">
            City:
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="new-form-control"
            required
            onChange={handleChange}
          />

          <label htmlFor="state" className="new-form-label">
            State:
          </label>
          <input
            type="text"
            name="state"
            id="state"
            className="new-form-control"
            required
            onChange={handleChange}
          />

          <label htmlFor="zip" className="new-form-label">
            Zip:
          </label>
          <input
            type="text"
            name="zip"
            id="zip"
            className="new-form-control"
            required
            onChange={handleChange}
          />

          <label htmlFor="country" className="new-form-label">
            Country:
          </label>
          <input
            type="text"
            name="country"
            id="country"
            className="new-form-control"
            required
            onChange={handleChange}
          />
        </fieldset>
        <br />

        <fieldset className="new-contact-prefs">
          <legend>Contact Preferences</legend>
          <input
            type="checkbox"
            name="cByPhone"
            id="cByPhone"
            className="new-form-checkbox"
            onChange={handleChange}
          />
          <label htmlFor="cByPhone" className="new-form-label">
            Contact by phone
          </label>
          <br />
          <input
            type="checkbox"
            name="cByEmail"
            id="cByEmail"
            className="new-form-checkbox"
            onChange={handleChange}
          />
          <label htmlFor="cByEmail" className="new-form-label">
            Contact by email
          </label>
          <br />
          <input
            type="checkbox"
            name="cByMail"
            id="cByMail"
            className="new-form-checkbox"
            onChange={handleChange}
          />
          <label htmlFor="cByMail" className="new-form-label">
            Contact by mail
          </label>
          <br />
        </fieldset>
        <br />

        <button type="submit" className="new-form-btn" onClick={handleClick1}>
          Add
        </button>
        <button type="submit" className="new-form-btn" onClick={handleClick2}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Newcontact;
