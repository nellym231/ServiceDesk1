import React from 'react';
import { MessageSquare, Bot, Zap, CheckCircle, Settings, Users, Bell, Activity } from 'lucide-react';

const TeamsIntegration: React.FC = () => {
  const integrationFeatures = [
    {
      icon: MessageSquare,
      title: 'Chat Support',
      description: 'Enable end users to create and track tickets directly through Teams chat',
      status: 'active'
    },
    {
      icon: Bot,
      title: 'Microsoft 365 Copilot',
      description: 'AI-powered assistance for ticket resolution and knowledge base queries',
      status: 'active'
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Instant notifications for ticket updates and assignments',
      status: 'active'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Collaborate on tickets with team members in dedicated channels',
      status: 'active'
    },
    {
      icon: Activity,
      title: 'Dashboard Integration',
      description: 'Access ServiceDesk dashboard directly within Teams interface',
      status: 'active'
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Automated ticket routing and escalation through Teams',
      status: 'active'
    }
  ];

  const tabFeatures = [
    'Dashboard - Real-time overview of tickets and metrics',
    'Scheduler - Maintenance windows and team schedules',
    'Tech Availability Chart - Live technician status and workload',
    'Tasks - Team task management and assignments',
    'Reminders - Important follow-ups and deadlines',
    'Announcements - Team communications and updates'
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Microsoft Teams Integration</h2>
        <p className="text-gray-600">Leverage Microsoft Teams as an additional channel for IT support with ServiceDesk Plus Cloud</p>
      </div>

      {/* Connection Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Microsoft 365 Copilot Integration</h3>
              <p className="text-green-600 font-medium">Connected and Active</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">Live</span>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Bot className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">AI-Powered Support</h4>
              <p className="text-blue-700 text-sm mt-1">
                Microsoft 365 Copilot is now integrated with your ServiceDesk Plus Cloud instance. 
                Users can get instant AI assistance for common issues and create tickets using natural language.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Tab Integration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">ServiceDesk Plus Teams Tab</h3>
            <p className="text-gray-600">Full incident management module integrated as a Teams tab</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {tabFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-purple-700 text-sm">
            <strong>Teams Tab Benefits:</strong> Technicians and end users can perform all request management activities 
            without leaving the Teams interface, improving productivity and user adoption.
          </p>
        </div>
      </div>

      {/* Integration Features */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrationFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Integration Settings</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Configure</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Notification Settings</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Ticket creation notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Status update notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Assignment notifications</span>
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Copilot Settings</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Auto-suggest solutions</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Knowledge base integration</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Smart ticket routing</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsIntegration;