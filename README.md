# ENTNT Calendar - Communication Tracking System

A comprehensive React-based web application for managing client communications, scheduling, and tracking business interactions. This system helps organizations maintain consistent communication with their clients through automated tracking and calendar management.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure login/registration system with role-based access (Admin/User)
- **Client Management**: Add, edit, and delete client information
- **Communication Tracking**: Monitor and record all client communications
- **Calendar Integration**: Visual calendar view for scheduling and tracking
- **Automated Notifications**: Alerts for overdue and due communications
- **Performance Analytics**: Dashboard with key metrics and performance indicators

### Advanced Features
- **Communication Methods Management**: Customizable communication channels (LinkedIn, Email, Phone, etc.)
- **Periodicity Settings**: Flexible scheduling options (weekly, monthly, quarterly, annually)
- **Data Export**: Export reports in CSV and PDF formats
- **Real-time Analytics**: Charts and graphs for communication frequency analysis
- **Filtering & Search**: Advanced filtering by company, date range, and status
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd entnt-calendar-communication-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the application**
   ```bash
   vercel --prod
   ```

4. **Alternative: Deploy via Vercel Dashboard**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect it's a React app and deploy it

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Upload the 'build' folder to Netlify
```

#### GitHub Pages
```bash
npm run build
npm run deploy
```

## 🏗️ Project Structure

```
entnt-calendar-communication-tracker/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── logo files
├── src/
│   ├── components/
│   │   └── Home.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── styles.css
├── package.json
├── vercel.json
└── README.md
```

## 🎯 Usage Guide

### Getting Started

1. **Registration**: Create an account with a valid email ending in `@entnt.ac.in`
2. **Login**: Use your credentials to access the system
3. **Role Assignment**: Admins can manage clients, users can view and track communications

### Admin Functions

- **Add Clients**: Enter client details including name, contact information, and communication preferences
- **Manage Communication Methods**: Create and customize communication channels
- **Edit/Delete Clients**: Modify client information or remove clients from the system
- **Generate Reports**: Export communication data in various formats
- **View Analytics**: Access performance metrics and communication trends

### User Functions

- **View Dashboard**: See overview of all clients and communication status
- **Track Communications**: Record completed communications with notes
- **Calendar View**: Visual representation of scheduled communications
- **Search & Filter**: Find specific clients or communications easily

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for custom configurations:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_APP_NAME=ENTNT Calendar
```

### Customization
- **Styling**: Modify `src/styles.css` for custom themes
- **Communication Methods**: Add new methods in the admin panel
- **Email Validation**: Update the email pattern in `src/components/Home.js`

## 📊 Data Management

### Client Information
- Name and Company
- Contact Details (Email, Phone, LinkedIn)
- Location and Comments
- Communication Preferences
- Scheduling Periodicity

### Communication Tracking
- Communication Type and Date
- Notes and Follow-up Actions
- Status (Overdue, Due, Completed)
- Performance Metrics

## 🛠️ Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects from Create React App (irreversible)

### Adding New Features

1. Create new components in `src/components/`
2. Update the main `Home.js` component to include new functionality
3. Add corresponding styles in `src/styles.css`
4. Test thoroughly before deployment

## 🔒 Security Features

- **Email Validation**: Restricts registration to specific domain
- **Role-based Access**: Different permissions for admins and users
- **Input Validation**: Prevents invalid data entry
- **Secure Authentication**: Password and username validation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure all dependencies are installed: `npm install`
   - Clear node_modules and reinstall if needed

2. **Deployment Issues**
   - Check that `vercel.json` is in the root directory
   - Verify build script runs successfully: `npm run build`

3. **Styling Issues**
   - Clear browser cache
   - Check CSS file paths in components

### Getting Help

- Check the browser console for error messages
- Verify all required dependencies are installed
- Ensure Node.js version compatibility

## 📈 Performance Optimization

- **Lazy Loading**: Components load only when needed
- **Efficient State Management**: Optimized React state updates
- **Responsive Images**: Optimized image loading
- **Caching**: Browser caching for static assets

## 🔄 Updates and Maintenance

### Regular Maintenance
- Update dependencies regularly
- Monitor performance metrics
- Backup client data
- Review and update communication methods

### Version Control
- Use semantic versioning
- Document all changes in CHANGELOG.md
- Test thoroughly before releases

## 📞 Support

For technical support or questions:
- Check this README for common solutions
- Review the code comments for implementation details
- Contact the development team for advanced issues

## 📄 License

This project is proprietary software developed for ENTNT. All rights reserved.

## 🙏 Acknowledgments

- React team for the excellent framework
- Chart.js for data visualization
- React Calendar for calendar functionality
- All contributors and testers

---

**Note**: This application is designed for internal use by ENTNT organization. Ensure proper security measures are in place when deploying to production environments.
