import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Maps from "./Maps";
import "../index.css";

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [flyLocation, setFlyLocation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  const handleClick = () => {
    navigate("/newContact");
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get(
        "http://localhost:3001/newContact/contact"
      );
      setContacts(response.data.contacts);
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const item = localStorage.getItem("userData");
    if (!item) {
      navigate("/");
    }
  }, []);

  const checkout = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    setSearchTerm(document.getElementById("search-input").value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Search Term", searchTerm)

  return (
    <div class="container">
      <div class="right">
        <div className="button-container">
          <button className="sign-out-btn" onClick={checkout}>
            Sign out
          </button>
        </div>
        <h1 className="page-title">CONTACT LIST</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={(handleSearch)}>
            Search
          </button>
        </div>

        <button className="new-button" onClick={handleClick}>
          New Contact
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr
                key={contact.id}
                onClick={() => setFlyLocation(contact.coordinates)}
              >
                <td>
                  <Link to={`../details/${contact.id}`}>{contact.name}</Link>
                </td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <Link
                  className="a-tag-address"
                  onClick={() => setFlyLocation(contact.coordinates)}
                >
                  <td className="address-td">{contact.address}</td>
                </Link>
                <td>
                  <input
                    type="checkbox"
                    name="cByPhone"
                    id="text"
                    disabled
                    checked={contact.cByPhone}
                  />
                  <label htmlFor="cByPhone">Phone</label>
                  <br />
                  <input
                    type="checkbox"
                    name="cByEmail"
                    id="text"
                    disabled
                    checked={contact.cByEmail}
                  />
                  <label htmlFor="cByEmail">Email</label>
                  <br />
                  <input
                    type="checkbox"
                    name="cByMail"
                    id="text"
                    disabled
                    checked={contact.cByMail}
                  />
                  <label htmlFor="cByMail">Mail</label>
                  <br />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div class="left">
        <Maps contacts={filteredContacts} flyLocation={flyLocation} />
      </div>
    </div>
  );
};

export default ContactList;
