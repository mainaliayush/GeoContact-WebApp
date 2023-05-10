import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register">
      <h1 className="register-title">REGISTER</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="fname" className="register-label">First Name:</label>
        <input type="text" id="fname" name="fname" className="register-input" value={formData.fname} onChange={handleInputChange} />
        <br />
        <label htmlFor="lname" className="register-label">Last Name:</label>
        <input type="text" id="lname" name="lname" className="register-input" value={formData.lname} onChange={handleInputChange} />
        <br />
        <label htmlFor="username" className="register-label">Username:</label>
        <input type="text" id="username" name="username" className="register-input" value={formData.username} onChange={handleInputChange} />
        <br />
        <label htmlFor="password" className="register-label">Password:</label>
        <input type="password" id="password" name="password" className="register-input" value={formData.password} onChange={handleInputChange} />
        <br />
        <label htmlFor="confirm-password" className="register-label">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirmPassword" className="register-input" value={formData.confirmPassword} onChange={handleInputChange} />
        <br />
        <button type="submit" className="register-button">Register</button>
        <p className='login-p'>Already have an account?{" "}<span><a href="/"> Login</a></span></p>
      </form>
    </div>
  );
}

export default Register;
