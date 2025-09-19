import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory

function CompanyForm() {
  const [company, setCompany] = useState({
    name: '',
    location: '',
    linkedinProfile: '',
    email: '',
    phoneNumber: '',
    comments: '',
    communicationPeriodicity: '',
  });
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here (e.g., sending data to backend)
    navigate('/');  // Navigate to the home page after submission
  };

  return (
    <div>
      <h2>Add Company</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <input
          type="text"
          placeholder="Company Name"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        {/* Add other form fields here */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CompanyForm;
