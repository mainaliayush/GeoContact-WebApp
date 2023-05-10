import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    id: "",
    _id: "",
    cByPhone: false,
    cByEmail: false,
    cByMail: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/newContact/${id}`
        );
        console.log("Result", response);  
        const tempFormData = {};
        tempFormData["fname"] = response.data.contacts.fname;
        tempFormData["lname"] = response.data.contacts.lname;
        tempFormData["street"] = response.data.contacts.street;
        tempFormData["phone"] = response.data.contacts.phone;
        tempFormData["email"] = response.data.contacts.email;
        tempFormData["city"] = response.data.contacts.city;
        tempFormData["state"] = response.data.contacts.state;
        tempFormData["zip"] = response.data.contacts.zip;
        tempFormData["country"] = response.data.contacts.country;
        tempFormData["id"] = response.data.contacts.id;
        tempFormData["cByPhone"] = response.data.contacts.cByPhone;
        tempFormData["cByEmail"] = response.data.contacts.cByEmail;
        tempFormData["cByMail"] = response.data.contacts.cByMail;
        tempFormData["_id"] = response.data.contacts._id;
        setFormData(tempFormData)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      const response = await axios.patch(`http://localhost:3001/newContact/${id}`, formData)
      console.log("Edited Contact", response)
      navigate("/homepage")
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick2 = () => {
    navigate("/homepage");
  };


  console.log("Form Data", formData);
  return (
    <div className="new-section">
      <a href="/login" className="new-sign-in">
        Sign in
      </a>
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
            value = {formData.fname}
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
            value = {formData.lname}
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
            value = {formData.phone}
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
            value = {formData.email}
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
            value = {formData.street}
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
            value = {formData.city}
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
            value = {formData.state}
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
            value = {formData.zip}
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
            value = {formData.country}
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
            checked = {formData.cByPhone}
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
            checked = {formData.cByEmail}
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
            checked = {formData.cByMail}
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
          Make Edit
        </button>
        <button type="submit" className="new-form-btn" onClick={handleClick2}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditContact;
