# ServiceDesk Plus Cloud Application

A modern, feature-rich IT service desk application built with React, TypeScript, and Tailwind CSS. This application provides comprehensive incident management, Microsoft Teams integration, and AI-powered assistance through Microsoft 365 Copilot.

## 🚀 Features

### Core Functionality
- **Dashboard**: Real-time overview of tickets, metrics, and system status
- **Ticket Management**: Create, assign, track, and resolve incidents and service requests
- **Major Incident Management**: Coordinate critical incidents with dedicated workflows
- **Tech Availability Chart**: Real-time view of technician status and workload
- **Task Management**: Assign and track team tasks with priority levels
- **Scheduler**: Manage maintenance windows, meetings, and on-call schedules
- **Reminders**: Important follow-ups and deadline tracking
- **Announcements**: Team communications and system updates

### Microsoft Integration
- **Teams Integration**: Full incident management within Microsoft Teams
- **Microsoft 365 Copilot**: AI-powered assistance for ticket resolution
- **Adaptive Cards**: Interactive notifications and actions in Teams
- **Real-time Notifications**: Instant updates via Teams channels

### Advanced Features
- **Real-time Updates**: Live status changes and notifications
- **Smart Routing**: Intelligent ticket assignment based on workload
- **Knowledge Base Integration**: Quick access to solutions and articles
- **Workflow Automation**: Automated escalation and routing rules
- **Comprehensive Reporting**: Analytics and performance metrics

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Netlify ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)
- Microsoft Teams (for integration features)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd servicedesk-plus-cloud
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
The application uses Supabase for data storage. The current schema includes:
- `tickets` table with columns for ticket management

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── TicketList.tsx   # Ticket management
│   ├── CreateTicket.tsx # Ticket creation form
│   ├── TicketDetails.tsx# Individual ticket view
│   ├── MajorIncidentManagement.tsx
│   ├── TeamsIntegration.tsx
│   ├── CopilotAssistant.tsx
│   ├── Scheduler.tsx
│   ├── TechAvailability.tsx
│   ├── Tasks.tsx
│   ├── Reminders.tsx
│   ├── Announcements.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and mock data
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Key Components

### Dashboard
- Real-time metrics and KPIs
- Recent ticket overview
- Quick access to critical functions

### Ticket Management
- Create incidents and service requests
- Assign to technicians
- Track status and priority
- Real-time updates and notifications

### Microsoft Teams Integration
- Native Teams tab integration
- Adaptive card notifications
- Teams chat support
- Copilot AI assistance

### Major Incident Management
- Dedicated incident commander workflows
- Real-time collaboration channels
- Impact assessment and communication
- Workaround management

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

The application uses a consistent design system with:
- **Colors**: Blue primary, semantic colors for status
- **Typography**: Clean, readable font hierarchy
- **Spacing**: 8px grid system
- **Components**: Reusable UI components with hover states
- **Responsive**: Mobile-first responsive design

## 🔐 Authentication & Security

- Supabase authentication system
- Row Level Security (RLS) policies
- Secure API endpoints
- Role-based access control

## 📊 Database Schema

### Tickets Table
- `Type`: Incident or Service Request
- `Priority`: Low, Medium, High, Critical
- `category`: Main category classification
- `subcategory`: Detailed classification
- `request`: Request description
- `description`: Detailed description
- `assignee`: Assigned technician
- `status`: Current ticket status

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Environment Variables for Production
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Roadmap

- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Additional integrations (Slack, Jira)
- [ ] Enhanced AI capabilities
- [ ] Multi-tenant support
- [ ] Advanced workflow automation

## 🙏 Acknowledgments

- Microsoft Teams Platform for integration capabilities
- Supabase for backend infrastructure
- Tailwind CSS for styling framework
- Lucide React for beautiful icons