import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import CreateTicket from './components/CreateTicket';
import TicketDetails from './components/TicketDetails';
import Scheduler from './components/Scheduler';
import TechAvailability from './components/TechAvailability';
import Tasks from './components/Tasks';
import Reminders from './components/Reminders';
import Announcements from './components/Announcements';
import MajorIncidentManagement from './components/MajorIncidentManagement';
import CopilotAssistant from './components/CopilotAssistant';
import TeamsIntegration from './components/TeamsIntegration';
import { 
  mockTickets, 
  mockStats, 
  mockUsers, 
  mockScheduleEvents, 
  mockTechAvailability, 
  mockTasks, 
  mockReminders, 
  mockAnnouncements,
  mockMajorIncidents
} from './utils/mockData';
import { Ticket } from './types';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const currentUser = mockUsers[0].name; // Simulate logged-in user

  const handleTicketCreate = (newTicket: Ticket) => {
    setTickets(prev => [newTicket, ...prev]);
    setActiveView('tickets'); // Redirect to tickets list
  };

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setActiveView('ticket-details');
  };

  const handleBackToTickets = () => {
    setSelectedTicketId(null);
    setActiveView('tickets');
  };

  const handleTicketAssign = (ticketId: string, assignee: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, assignee, updatedAt: new Date() }
        : ticket
    ));
  };

  const handleStatusChange = (ticketId: string, status: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: status as any, updatedAt: new Date() }
        : ticket
    ));
  };
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard stats={mockStats} recentTickets={tickets} />;
      case 'tickets':
        return <TicketList tickets={tickets} onTicketSelect={handleTicketSelect} />;
      case 'create':
        return <CreateTicket onTicketCreate={handleTicketCreate} />;
      case 'major-incidents':
        return <MajorIncidentManagement incidents={mockMajorIncidents} />;
      case 'scheduler':
        return <Scheduler events={mockScheduleEvents} />;
      case 'tech-availability':
        return <TechAvailability technicians={mockTechAvailability} />;
      case 'tasks':
        return <Tasks tasks={mockTasks} />;
      case 'reminders':
        return <Reminders reminders={mockReminders} />;
      case 'announcements':
        return <Announcements announcements={mockAnnouncements} />;
      case 'copilot':
        return <CopilotAssistant />;
      case 'ticket-details':
        const selectedTicket = tickets.find(t => t.id === selectedTicketId);
        return selectedTicket ? (
          <TicketDetails 
            ticket={selectedTicket} 
            onBack={handleBackToTickets}
            onAssign={handleTicketAssign}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div className="p-6">
            <p className="text-gray-500">Ticket not found.</p>
          </div>
        );
      case 'agents':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agent Management</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Agent management interface coming soon...</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Advanced reporting and analytics features coming soon...</p>
            </div>
          </div>
        );
      case 'teams':
        return <TeamsIntegration />;
      case 'automation':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Automation Rules</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Automation and workflow configuration coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">System settings and configuration options coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard stats={mockStats} recentTickets={tickets} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header currentUser={currentUser} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;