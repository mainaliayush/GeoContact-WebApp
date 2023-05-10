import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ContactInfo = () => {
  const [contact, setContact] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [edited, setEdited] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/newContact/${id}`
        );
        console.log("Result", response);
        setContact(response.data.contacts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!contact) {
    return <div>Loading</div>;
  }

  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/newContact/${id}`
      );
      console.log("Deleted", response);
      setEdited(response);
      navigate("/homepage");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = async () => {
    try {
      navigate(`../edit/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="contact-info-header">
        <h1 className="contact-info-title">Contact Info</h1>
        <h2 className="contact-name">{contact.name}</h2>
      </header>
      <main className="contact-info-main">
        <hr className="contact-info-divider" />
        <Link to="/homepage" className="back-link">
          Back to list
        </Link>
        <section className="phone-section">
          <h4>Phone number:</h4>
          <p>{contact.phone}</p>
          {!contact.phone && (
            <i className="contact-info-note">
              May NOT be contacted by phone or text
            </i>
          )}
        </section>
        <hr className="contact-info-divider" />
        <section className="email-section">
          <h4>Email address:</h4>
          <p>{contact.email}</p>
          {!contact.cByEmail && (
            <i className="contact-info-note">May NOT be contacted by email</i>
          )}
        </section>
        <hr className="contact-info-divider" />
        <section className="address-section">
          <h4>Address:</h4>
          <p>{contact.address}</p>
          {!contact.cByMail && (
            <i className="contact-info-note">May NOT be contacted by mail</i>
          )}
        </section>
        <hr className="contact-info-divider" />
        <button className="edit-contact-btn" onClick={handleEditClick}>
          Edit Contact
        </button>
        <br />
        <button className="delete-contact-btn" onClick={handleDeleteClick}>
          Delete Contact
        </button>
      </main>
    </>
  );
};

export default ContactInfo;
