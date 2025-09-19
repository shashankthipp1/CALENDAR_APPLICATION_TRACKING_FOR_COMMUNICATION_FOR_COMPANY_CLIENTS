import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/companies")
      .then(response => setCompanies(response.data))
      .catch(error => console.error("Error fetching companies:", error));
  }, []);

  return (
    <div>
      <h2>Companies List</h2>
      <Link to="/add-company">Add New Company</Link>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            <p>{company.name} - {company.location}</p>
            <Link to={`/edit-company/${company.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
