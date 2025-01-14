import React from 'react';
 
const RegistrationForm = () => {
  return (
    <div className="form-container">
      <h2>Registration</h2>
      <form>
        <div className="form-group">
          <input type="text" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Create a password" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm a password" />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" />
            I accept all terms & conditions
          </label>
        </div>
        <button type="submit" className="btn">Register Now</button>
        <p>
          Already have an account? <a href="#">Login now</a>
        </p>
      </form>
    </div>
  );
};
 
export default RegistrationForm;