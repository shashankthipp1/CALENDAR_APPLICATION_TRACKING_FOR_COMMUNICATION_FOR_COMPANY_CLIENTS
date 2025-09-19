# ENTNT Calendar Application for Communication Tracking

A comprehensive React-based web application designed for tracking and managing client communications with advanced calendar integration, reporting features, and user management capabilities.

## 🚀 Features

### Core Functionality
- **Client Management**: Add, edit, and delete client information with detailed profiles
- **Communication Tracking**: Monitor communication history and schedule future interactions
- **Calendar Integration**: Visual calendar view for scheduling and tracking communications
- **User Authentication**: Role-based access control (Admin/User roles)
- **Real-time Dashboard**: Overview of communication status and performance metrics

### Advanced Features
- **Communication Methods Management**: Customizable communication channels (LinkedIn, Email, Phone, etc.)
- **Periodicity Settings**: Flexible scheduling options (2 weeks, monthly, quarterly, annually)
- **Status Tracking**: Real-time monitoring of overdue, due, and completed communications
- **Reporting & Analytics**: 
  - Performance percentage calculations
  - Communication frequency reports
  - Overdue trends analysis
  - Engagement effectiveness metrics
- **Data Export**: CSV and PDF export capabilities
- **Filtering & Search**: Advanced filtering by company, date range, and communication status

### User Interface
- **Responsive Design**: Modern, animated UI with gradient backgrounds
- **Interactive Calendar**: React Calendar component for date selection and viewing
- **Data Visualization**: Chart.js integration for communication analytics
- **Modal Dialogs**: User-friendly forms for data entry and editing

## 🛠️ Technology Stack

- **Frontend**: React.js
- **Styling**: CSS3 with animations and responsive design
- **Charts**: Chart.js with react-chartjs-2
- **Calendar**: react-calendar
- **PDF Generation**: jsPDF
- **CSV Export**: react-csv
- **HTTP Client**: Axios
- **Routing**: React Router (implied from components)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ENTNT-calendar-application-for-communication-Tracking-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional required packages**
   ```bash
   npm install react-calendar react-chartjs-2 chart.js react-csv jspdf axios
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Email Service
The application includes a mock email service (`emailService.js`) for OTP functionality. For production use, integrate with a real email service provider.

### Backend Integration
The `CompanyList.js` component expects a backend API at `http://localhost:5000/api/companies`. Ensure your backend server is running on this endpoint.

## 👥 User Roles

### Admin
- Add, edit, and delete clients
- Manage communication methods
- Access performance reports
- Export data (CSV/PDF)
- Full dashboard access

### User
- View client information
- Record communications
- Access calendar view
- View communication status

## 📊 Dashboard Features

### Overview Statistics
- Total clients count
- Overdue communications
- Due today communications
- Performance percentage

### Communication Management
- **Status Categories**:
  - Overdue (past due date)
  - Due (due today)
  - Not Due (future scheduled)
  - Communication Performed (completed)

### Calendar Integration
- Visual calendar for date selection
- Communication history viewing by date
- Commencement date selection for new clients

## 🔐 Authentication

### Registration Requirements
- Username and password (must be different)
- Email address (must end with `@entnt.ac.in`)
- Role selection (Admin/User)
- Unique username and email validation

### Login Process
- Username/password authentication
- Role-based dashboard access
- Session management

## 📈 Reporting & Analytics

### Available Reports
1. **Communication Frequency Report**: Bar chart showing usage of different communication methods
2. **Performance Report**: Visual representation of overdue communications percentage
3. **Overdue Trends**: Analysis of communication patterns
4. **Engagement Effectiveness**: Tracking of communication method effectiveness

### Export Options
- **CSV Export**: Complete client data with communication history
- **PDF Export**: Formatted communication reports

## 🎨 UI/UX Features

### Design Elements
- Animated gradient backgrounds
- Responsive layout design
- Interactive buttons with hover effects
- Modal dialogs for data entry
- Status-based color coding

### Navigation
- Role-based menu items
- Quick access to key features
- Breadcrumb navigation
- Collapsible sections

## 📱 Responsive Design

The application is built with responsive design principles:
- Mobile-friendly interface
- Flexible grid layouts
- Adaptive form elements
- Touch-friendly interactions

## 🔄 Data Management

### Client Data Structure
```javascript
{
  id: number,
  name: string,
  location: string,
  linkedIn: string,
  email: string,
  phone: string,
  comments: string,
  periodicity: string,
  communicationMethods: array,
  commencementDate: date,
  companyName: string,
  lastCommunicationDate: date,
  nextCommunicationDate: date,
  communicationHistory: array,
  status: string
}
```

### Communication History
```javascript
{
  type: string,
  date: date,
  notes: string
}
```

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### GitHub Pages Deployment
The project includes `gh-pages` dependency for easy deployment:
```bash
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## 🔮 Future Enhancements

- Real-time notifications
- Email integration for automated reminders
- Mobile app development
- Advanced analytics dashboard
- Integration with CRM systems
- Multi-language support

---

**Note**: This application is designed specifically for ENTNT organization with email domain validation (`@entnt.ac.in`). Modify the email validation pattern in the registration function for different organizations.
