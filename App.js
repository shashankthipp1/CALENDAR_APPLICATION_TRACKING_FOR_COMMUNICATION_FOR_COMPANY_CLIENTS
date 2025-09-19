import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { Bar } from 'react-chartjs-2'; // Example chart library
import { CSVLink } from 'react-csv'; // For CSV export
import { Chart, registerables } from 'chart.js'; // Import Chart.js
import jsPDF from 'jspdf'; // For PDF export
import './styles.css'; // Import the CSS file

// Register all necessary components
Chart.register(...registerables);

const App = () => {
  // State variables
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    location: '',
    linkedIn: '',
    email: '',
    phone: '',
    comments: '',
    periodicity: 'Every 2 weeks', // Default periodicity
    communicationMethods: [], // Communication methods array
    commencementDate: new Date(), // New field for commencement date
    companyName: '' // New field for company name
  });

  const [companyNames, setCompanyNames] = useState([]); // State to hold saved company names
  const [editingClient, setEditingClient] = useState(null); // State for editing a client
  const [users, setUsers] = useState([]); // Dynamic user list
  const [currentUser , setCurrentUser ] = useState(null); // Currently logged-in user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '', role: '', email: '' });
  const [clientDate, setClientDate] = useState(new Date()); // State for client added date
  const [communicationDetails, setCommunicationDetails] = useState({
    type: '',
    date: new Date(),
    notes: ''
  });

  const [showCommunicationModal, setShowCommunicationModal] = useState(false); // State to show communication modal
  const [overdueCount, setOverdueCount] = useState(0); // State for overdue communications
  const [dueCount, setDueCount] = useState(0); // State for due communications
  const [showOverdueList, setShowOverdueList] = useState(false); // State to show overdue list
  const [performancePercentage, setPerformancePercentage] = useState(0); // State for performance percentage
  const [frequencyData, setFrequencyData] = useState({}); // State for communication frequency data
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date in calendar

  // New States for Communication Method Management
  const [communicationMethods, setCommunicationMethods] = useState([
    { id: 1, name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { id: 2, name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: true },
    { id: 3, name: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
    { id: 4, name: 'Phone Call', description: 'Call the client', sequence: 4, mandatory: false },
    { id: 5, name: 'Other', description: 'Other methods', sequence: 5, mandatory: false }
  ]);

  const [newMethod, setNewMethod] = useState({ name: '', description: '', sequence: '', mandatory: false }); // New Method State
  const [editingMethod, setEditingMethod] = useState(null); // State for editing communication method

  // New states for filtering and reporting
  const [filterCompany, setFilterCompany] = useState('');
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [engagementEffectiveness, setEngagementEffectiveness] = useState({}); // For tracking effectiveness
  const [overdueTrends, setOverdueTrends] = useState([]); // For overdue trends

  // Register a new user
  const register = () => {
    const { username, password, role, email } = credentials;

    // Check if email is valid
    const emailPattern = /^[a-zA-Z0-9._%+-]+@entnt\.ac\.in$/; // Updated to .ac.in
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address ending with @entnt.ac.in');
      return;
    }

    // Check if username and password are the same
    if (username === password) {
      alert('Username and password cannot be the same.');
      return;
    }

    // Check if the email already exists
    const existingEmail = users.find(user => user.email === email);
    if (existingEmail) {
      alert('Email address already registered. Please use a different email.');
      return;
    }

    // Check if user already exists
    const existingUser  = users.find(user => user.username === username);
    if (existingUser ) {
      alert('Username already exists. Please choose a different username.');
      return;
    }

    // Register the user
    setUsers([...users, { username, password, role, email }]);
    alert('Registration successful! You can now log in.');
    setRegisterForm(false);
    setCredentials({ username: '', password: '', role: '', email: '' }); // Reset fields
  };

  // Log in a user
  const login = () => {
    const user = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );
    if (user) {
      setCurrentUser (user);
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  };

  const logout = () => {
    setCurrentUser (null);
    setIsLoggedIn(false);
    setCredentials({ username: '', password: '', role: '', email: '' });
  };

  // Add a new client ( Admin only)
  const addClient = () => {
    if (currentUser ?.role === 'admin') {
      const addedDate = clientDate.toISOString().split('T')[0]; // Get the added date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      const status = addedDate < today ? 'overdue' : 'not-due'; // Determine status based on date comparison

      setClients([
        ...clients,
        {
          ...newClient,
          id: Date.now(),
          lastCommunicationDate: addedDate,
          nextCommunicationDate: addedDate,
          communicationPerformed: null,
          status: status, // Add status to the client
          communicationHistory: [] // Initialize communication history
        }
      ]);

      // Save the company name if it's not already in the list
      if (newClient.companyName && !companyNames.includes(newClient.companyName)) {
        setCompanyNames([...companyNames, newClient.companyName]);
      }

      resetNewClient();
    } else {
      alert('Only admins can add clients.');
    }
  };

  // Reset new client form
  const resetNewClient = () => {
    setNewClient({
      name: '',
      location: '',
      linkedIn: '',
      email: '',
      phone: '',
      comments: '',
      periodicity: 'Every 2 weeks', // Reset periodicity
      communicationMethods: [], // Reset communication methods
      commencementDate: new Date(), // Reset commencement date
      companyName: '' // Reset company name
    });
    setClientDate(new Date()); // Reset client date
  };

  // Edit a client
  const editClient = (client) => {
    setEditingClient(client);
    setNewClient(client); // Pre-fill the form with the client's current details
    setClientDate(new Date(client.lastCommunicationDate)); // Set the client date for editing
  };

  // Update client details
  const updateClient = () => {
    if (currentUser ?.role === 'admin') {
      setClients(
        clients.map(client => {
          if (client.id === editingClient.id) {
            const formatDate = (date) => {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
              const day = String(date.getDate()).padStart(2, '0');

              return `${year}-${month}-${day}`;
            };

            return {
              ...client,
              name: newClient.name,
              location 
              : newClient.location,
              linkedIn: newClient.linkedIn,
              email: newClient.email,
              phone: newClient.phone,
              comments: newClient.comments,
              periodicity: newClient.periodicity,
              commencementDate: formatDate(newClient.commencementDate), // Format commencement date correctly
              nextCommunicationDate: formatDate(clientDate), // Format next communication date correctly
              status: 'not-due', // Set status to not-due when updating
              communicationMethods: newClient.communicationMethods // Update communication methods
            };
          }
          return client;
        })
      );
      resetNewClient();
      setEditingClient(null); // Clear editing state
    } else {
      alert('Only admins can update clients.');
    }
  };

  const deleteClient = (clientId) => {
    if (currentUser  ?.role === 'admin') {
      setClients(clients.filter((client) => client.id !== clientId));
    } else {
      alert('Only admins can delete clients.');
    }
  };

  // Determine communication status
  const getCommunicationStatus = (nextCommunicationDate) => {
    const today = new Date().toISOString().split('T')[0];
    if (nextCommunicationDate < today) {
      return 'overdue'; // Highlight in red
    } else if (nextCommunicationDate === today) {
      return 'due'; // Highlight in yellow
    }

    return 'not-due'; // No highlight
  };

  // Handle communication performed
  const handleCommunicationPerformed = (client) => {
    setShowCommunicationModal(true);
    setEditingClient(client); // Set the client for which communication is being recorded
  };

  const saveCommunicationDetails = () => {
    if (editingClient) {
      const updatedClients = clients.map(client => {
        if (client.id === editingClient.id) {
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + 7); // Set next communication date to one week later
          return {
            ...client,
            lastCommunicationDate: communicationDetails.date.toISOString().split('T')[0],
            nextCommunicationDate: nextDate.toISOString().split('T')[0],
            communicationPerformed: communicationDetails.type,
            status: 'communication-performed', // Update status to communication performed
            communicationHistory: [
              ...client.communicationHistory,
              {
                type: communicationDetails.type,
                date: communicationDetails.date.toISOString().split('T')[0],
                notes: communicationDetails.notes
              }
            ]
          };
        }
        return client;
      });
      setClients(updatedClients);
      setShowCommunicationModal(false);
      setCommunicationDetails({ type: '', date: new Date(), notes: '' }); // Reset communication details
    }
  };

  // Calculate overdue and due communications and performance percentage
  useEffect(() => {
    const overdueClients = clients.filter(client => getCommunicationStatus(client.nextCommunicationDate) === 'overdue');
    setOverdueCount(overdueClients.length);
    const dueClients = clients.filter(client => getCommunicationStatus(client.nextCommunicationDate) === 'due');
    setDueCount(dueClients.length);
    const totalClients = clients.length;
    const percentage = totalClients > 0 ? (overdueClients.length / totalClients) * 100 : 0;
    setPerformancePercentage(percentage);

    // Calculate communication frequency
    const frequency = {};
    clients.forEach(client => {
      client.communicationHistory.forEach(history => {
        frequency[history.type] = (frequency[history.type] || 0) + 1;
      });
    });
    setFrequencyData(frequency);

    // Calculate overdue trends
    const trends = clients.map(client => ({
      name: client.name,
      overdueCount: client.communicationHistory.filter(history => getCommunicationStatus(history.date) === 'overdue').length
    }));
    setOverdueTrends(trends);

    // Calculate engagement effectiveness
    const effectiveness = {};
    clients.forEach(client => {
      client.communicationHistory.forEach(history => {
        effectiveness[history.type] = (effectiveness[history.type] || 0) + 1;
      });
    });
    setEngagementEffectiveness(effectiveness);
  }, [clients]);

  // Prepare data for reports
  const downloadData = () => {
    const csvData = clients.map(client =>
      ({
        Name: client.name,
        Location: client.location,
        Email: client.email,
        Phone: client.phone,
        Comments: client.comments,
        Periodicity: client.periodicity,
        CommencementDate: client.commencementDate,
        LastCommunicationDate: client.lastCommunicationDate,
        NextCommunicationDate: client.nextCommunicationDate,
        Status: getCommunicationStatus(client.nextCommunicationDate),
        CommunicationMethods: client.communicationMethods.join(', ') // Include communication methods

      }));
    return csvData; // This should be an array of objects
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Communication Report", 20, 20);
    clients.forEach((client, index) => {
      doc.text(`${index + 1}. ${client.name} - ${client.email}`, 20, 30 + (index * 10));
    });
    doc.save("communication_report.pdf");
  };

  // Communication Method Management
  const addMethod = () => {
    if (newMethod.name && newMethod.description && newMethod.sequence) {
      setCommunicationMethods([
        ...communicationMethods,
        { ...newMethod, id: Date.now() } // Assign a unique id
      ]);
      setNewMethod({ name: '', description: '', sequence: '', mandatory: false }); // Reset new method state
    } else {
      alert('Please fill in all fields to add a communication method.');
    }
  };

  const editMethod = (method) => {
    setEditingMethod(method);
    setNewMethod({ name: method.name, description: method.description, sequence: method.sequence, mandatory: method.mandatory });
  };

  const updateMethod = () => {
    setCommunicationMethods(communicationMethods.map(method => {
      if (method.id === editingMethod.id) {
        return { ...method, name: newMethod.name, description: newMethod.description, sequence: newMethod.sequence, mandatory: newMethod.mandatory };
      }
      return method;
    }));
    setNewMethod({ name: '', description: '', sequence: '', mandatory: false });
    setEditingMethod(null);
  };

  const deleteMethod = (methodId) => {
    setCommunicationMethods(communicationMethods.filter(method => method.id !== methodId));
  };

  // Handle date change for the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Get communications for a specific date
  const getCommunicationsForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return clients.flatMap(client => 
      client.communicationHistory.filter(history => history.date === formattedDate)
    );
  };

  // Calculate next communication date based on periodicity
  const calculateNextCommunicationDate = (commencementDate, periodicity) => {
    const date = new Date(commencementDate);
    switch (periodicity) {
      case 'Every 2 weeks':
        date.setDate(date.getDate() + 14);
        break;
      case 'Every month':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'Every 3 months':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'Every 6 months':
        date.setMonth(date.getMonth() + 6);
        break;
      case 'Once a year':
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        break;
    }
    return date.toISOString().split('T')[0];
  };

  // Filter clients based on company name and date range
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(filterCompany.toLowerCase()) &&
    (!filterDateRange.start || new Date(client.commencementDate) >= new Date(filterDateRange.start)) &&
    (!filterDateRange.end || new Date(client.commencementDate) <= new Date(filterDateRange.end))
  );

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="auth-section">
          {registerForm ? (
            <div className="register">
              <h1>Register</h1>
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              <select
                value={credentials.role}
                onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User </option>
              </select>
              <button onClick={register}>Register </button>
              <button onClick={() => setRegisterForm(false)}>Back to Login</button>
            </div>
          ) : (
            <div className="login">
              <h1>Login</h1>
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })}>
              </input>
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })}>
              </input>
              <button onClick={login}>Login</button>
              <button onClick={() => setRegisterForm(true)}>Register</button>
            </div>
          )}
        </div>
      ) : (
        <div className="dashboard">
          <header className="header">
          
            <nav>
              <ul>
                <li><a href="#dashboard">Dashboard</a></li>
                {currentUser .role === 'admin' && <li><a href="#admin-panel">Admin Panel</a></li>}
                <li><a href="#clients"> Clients</a></li>
                <li><a href="#communication-status">Communication Status Overview</a></li>
                {currentUser .role === 'admin' && <li><a href="#communication-methods">Communication Methods</a></li>}
                <li><a href="#calendar" onClick={() => setShowCalendar(!showCalendar)}>
                  {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
                </a></li>
              </ul>
            </nav>
          </header>

          <h1>Welcome, {currentUser .username} ({currentUser .role})</h1><h1  id="logo"></h1>
          <button onClick={logout}>Logout</button>

          <div className="dashboard-section" id="dashboard">
            <h2>Dashboard Overview</h2>
            <div className="dashboard-stats">
              <div className="stat">
                <h3>Total Clients</h3>
                <p>{clients.length}</p>
              </div>
              <div className="stat">
                <h3>Overdue Communications</h3>
                <p>{overdueCount}</p>
              </div>
              <div className="stat">
                <h3>Due Today Communications</h3>
                <p>{dueCount}</p>
              </div>
              <div className="stat">
                <h3>Performance Percentage</h3>
                <p>{performancePercentage.toFixed(2)}%</p>
              </div>
              
            </div>
          </div>

          {/* Calendar View */}
          {showCalendar && (
            <div className="calendar-section" id="calendar">
              <h2>Calendar View</h2>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
              />
              <h3>Communications on {selectedDate.toDateString()}:</h3>
              <ul>
                {getCommunicationsForDate(selectedDate).map((communication, index) => (
                  <li key={index}>
                    <p>{communication.type} - {communication.notes}</p>
                  </li>
                ))}
                {getCommunicationsForDate(selectedDate).length === 0 && <p>No communications found for this date.</p>}
              </ul>
            </div>
          )}

          {/* Next Communication Grid */}
          <div className="next-communications">
            <h2>Next Communication</h2>
            <ul>
              {clients.map(client => {
                const nextDate = calculateNextCommunicationDate(client.commencementDate, client.periodicity);
                return (
                  <li key={client.id}>
                    <p>{client.name} - Next Communication Date: {nextDate}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Overdue Communications Grid */}
          <div className="overdue-communications">
            <h2>Overdue Communications</h2>
            <ul>
              {clients.filter(client => getCommunicationStatus(client.nextCommunicationDate) === 'overdue').map(client => (
                <li key={client.id}>
                  <p>{client.name} - Next Communication Date: {client.nextCommunicationDate}</p>
                </li>
              ))}
              {clients.filter(client => getCommunicationStatus(client.nextCommunicationDate) === 'overdue').length === 0 && <p>No overdue communications.</p>}
            </ul>
          </div>

          {/* Admin Panel for Adding/Editing Clients */}
          {currentUser .role === 'admin' && (
            <div className="admin-panel" id="admin-panel">
              <h2>{editingClient ? 'Edit Client' : 'Add Client'}</h2>
              <input
                type="text"
                placeholder="Client Name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              />
              <select
                value={newClient.companyName}
                onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
              >
                <option value="">Select Company</option>
                {companyNames.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Location"
                value={newClient.location}
                onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
              />
              <input
                type="text"
                placeholder="LinkedIn"
                value={newClient.linkedIn}
                onChange={(e) => setNewClient({ ...newClient, linkedIn: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              />
              <textarea
                placeholder="Comments"
                value={newClient.comments}
                onChange={(e) => setNewClient({ ...newClient, comments: e.target.value })}></textarea>
              <select
                value={newClient.periodicity}
                onChange={(e) => setNewClient({ ...newClient, periodicity: e.target.value })}
              >
                <option value="Every 2 weeks">Every 2 weeks</option>
                <option value="Every month">Every month</option>
                <option value="Every 3 months">Every 3 months</option>
                <option value="Every 6 months">Every 6 months</option>
                <option value="Once a year">Once a year</option>
              </select>
              <button onClick={() => setShowCalendar(!showCalendar)}>
                {showCalendar ? 'Hide Calendar' : 'Select Commencement Date'}
              </button>
              {showCalendar && (
                <Calendar
                  onChange={(date) => setNewClient({ ...newClient, commencementDate: date })}
                  value={newClient.commencementDate}
                />
              )}
              <h3>Select Communication Methods</h3>
              {communicationMethods.map((method) => (
                <div key={method.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={newClient.communicationMethods.includes(method.name)}
                      onChange={() => {
                        if (newClient.communicationMethods.includes(method.name)) {
                          setNewClient({
                            ...newClient,
                            communicationMethods: newClient.communicationMethods.filter(m => m !== method.name)
                          });
                        } else {
                          setNewClient({
                            ...newClient,
                            communicationMethods: [...newClient.communicationMethods, method.name]
                          });
                        }
                      }}
                    />
                    {method.name} - {method.description}
                  </label>
                </div>
              ))}
              {editingClient ? (
                <button onClick={updateClient}>Update Client</button>
              ) : (
                <button onClick={addClient}>Add Client</button>
              )}
            </div>
          )}

          {/* Admin Panel for Communication Method Management */}
          {currentUser .role === 'admin' && (
            <div id="communication-methods">
              <h2>Communication Methods</h2>
              <div>
                <h3>Add Communication Method</h3>
                <input
                  type="text"
                  placeholder="Method Name"
                  value={newMethod.name}
                  onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newMethod.description}
                  onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Sequence"
                  value={newMethod.sequence}
                  onChange={(e) => setNewMethod({ ...newMethod, sequence: e.target.value })}
                />
                
                <label>
                  <input
                    type="checkbox"
                    checked={newMethod.mandatory}
                    onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
                  />
                  Mandatory
                </label>
                {editingMethod ? (
 <button onClick={updateMethod}>Update Method</button>
                ) : (
                  <button onClick={addMethod}>Add Method</button>
                )}
              </div>

              <h3>Existing Communication Methods</h3>
              <ul>
                {communicationMethods.map((method) => (
                  <li key={method.id}>
                    <p>{method.name} - {method.description} (Seq: {method.sequence})</p>
                    <button onClick={() => editMethod(method)}>Edit</button>
                    <button onClick={() => deleteMethod(method.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="notification-badge" onClick={() => setShowOverdueList(!showOverdueList)}>
            {overdueCount > 0 && (
              <span className="badge">{overdueCount} Overdue Communications</span>
            )}
            {dueCount > 0 && (
              <span className="badge">{dueCount} Due Today Communications</span>
            )}
          </div>

          {showOverdueList && (
            <div className="overdue-list">
              <h2>Overdue Communications</h2>
              {clients.filter(client => getCommunicationStatus(client.nextCommunicationDate) === 'overdue').map(client => (
                <div key={client.id}>
                  <p>{client.name} - Next Communication Date: {client.nextCommunicationDate}</p>
                </div>
              ))}
            </div>
          )}

          <div className="client-list" id="clients">
            <h2>Clients</h2>
            <input
              type="text"
              placeholder="Search by Company Name"
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
            />
            <input
              type="date"
              placeholder="Start Date"
              value={filterDateRange.start}
              onChange={(e) => setFilterDateRange({ ...filterDateRange, start: e.target.value })}
            />
            <input
              type="date"
              placeholder="End Date"
              value={filterDateRange.end}
              onChange={(e) => setFilterDateRange({ ...filterDateRange, end: e.target.value })}
            />
            {filteredClients.map((client) => {
              const status = getCommunicationStatus(client.nextCommunicationDate);
              return (
                <div key={client.id} className={client.status}>
                  <h3>{client.name}</h3>
                  <p>Location: {client.location}</p>
                  <p>LinkedIn: {client.linkedIn}</p>
                  <p>Email: {client.email}</p>
                  <p>Phone: {client.phone}</p>
                  <p>Comments: {client.comments}</p>
                  <p>Periodicity: {client.periodicity}</p>
                  <p>Commencement Date: {new Date(client.commencementDate).toDateString()}</p>
                  <p>Communication Methods: {client.communicationMethods.join(', ')}</p>
                  {currentUser  .role === 'admin' && (
                    <>
                      <button onClick={() => editClient(client)}>Edit</button>
                      <button onClick={() => deleteClient(client.id)}>Delete</button>
                      <button onClick={() => handleCommunicationPerformed(client)}>Communication Performed</button>
                    </>
                  )}
                  <p className={status}>
                    Status: {status === 'overdue' ? 'Overdue' : status === 'due' ? 'Due' : 'Not Due'}
                  </p>
                  <div>
                    <h4>Communication History</h4>
                    {client.communicationHistory.map((history, index) => (
                      <div key={index}>
                        <p>Type: {history.type}</p>
                        <p>Date: {history.date}</p>
                        <p>Notes: {history.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="communication-status" id="communication-status">
            <h2>Communication Status Overview</h2>
            {clients.map((client) => {
              const status = getCommunicationStatus(client.nextCommunicationDate);
              return (
                <div key={client.id} className={`communication-status-item ${status}`}>
                  <h3>{client.name}</h3>
                  <p>Status: {status === 'overdue' ? 'Overdue ' : status === 'due' ? 'Overdue' : status === 'communication-performed' ? 'Communication Performed' : 'Not Due'}</p>
                </div>
              );
            })}
          </div>

          {showCommunicationModal && (
            <div className="communication-modal">

              <h2>Record Communication</h2>
              <input
                type="text"
                placeholder="Type of Communication"
                value={communicationDetails.type}
                onChange={(e) => setCommunicationDetails({ ...communicationDetails, type: e.target.value })}
              />
              <input
                type="date"
                value={communicationDetails.date.toISOString().split('T')[0]}
                onChange={(e) => setCommunicationDetails({ ...communicationDetails, date: new Date(e.target.value) })}
              />
              <textarea
                placeholder="Notes"
                value={communicationDetails.notes}
                onChange={(e) => setCommunicationDetails({ ...communicationDetails, notes: e.target.value })}
              />
              <button onClick={saveCommunicationDetails}>Save Communication</button>
              <button onClick={() => setShowCommunicationModal(false)}>Cancel</button>
            </div>
          )}

          {currentUser  .role === 'admin' && (
            <div className="performance-report">
              <h2>Performance Report</h2>
              <div
                className="performance-bar" style={{ width: `${performancePercentage}%`, backgroundColor: 'lightcoral', height: '30px' }}>
                {performancePercentage.toFixed(2)}% Overdue Communications
              </div>
              <p>{clients.length} total clients</p>
              <p>{overdueCount} overdue communications</p>
              <button onClick={exportToPDF}>Export to PDF</button>
            </div>
          )}

          <div className="charts">
            <h2>Communication Frequency Report</h2>
            <Bar
              data={{
                labels: Object.keys(frequencyData),
                datasets: [{
                  label: 'Frequency of Communication Methods',
                  data: Object.values(frequencyData),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                }],
              }}
            />

            <h2>Download Reports</h2>
            <CSVLink data={downloadData()} filename={"communication_report.csv"}>
              Download Communication Report
            </CSVLink>
          </div>

          <div className="activity-log">
            <h2>Real-Time Activity Log</h2>
            {clients.flatMap(client => client.communicationHistory.map((history, index) => (
              <div key={index}>
                <p>{history.date}: {client.name} - {history.type} - {history.notes}</p>
              </div>
            )))}
          </div>

          <div className="overdue-trends">
            <h2>Overdue Communication Trends</h2>
            <ul>
              {overdueTrends.map((trend, index) => (
                <li key={index}>
                  {trend.name}: {trend.overdueCount} overdue communications
                </li>
              ))}
            </ul>
          </div>

          <div className="engagement-effectiveness">
            <h2>Engagement Effectiveness Dashboard</h2>
            <ul>
              {Object.entries(engagementEffectiveness).map(([method, effectiveness], index) => (
                <li key={index}>
                  {method}: {effectiveness}% effective
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;