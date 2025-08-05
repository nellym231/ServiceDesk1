import React, { useState } from 'react';
import { Clock, Plus, Bell, CheckCircle, AlertTriangle, Calendar, User } from 'lucide-react';
import { Reminder } from '../types';

interface RemindersProps {
  reminders: Reminder[];
}

const Reminders: React.FC<RemindersProps> = ({ reminders }) => {
  const [filter, setFilter] = useState('all');

  const filteredReminders = reminders.filter(reminder => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !reminder.isCompleted;
    if (filter === 'completed') return reminder.isCompleted;
    if (filter === 'overdue') {
      return !reminder.isCompleted && new Date(reminder.dueDate) < new Date();
    }
    return reminder.type === filter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ticket_followup': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'maintenance': return 'text-red-600 bg-red-100 border-red-200';
      case 'meeting': return 'text-green-600 bg-green-100 border-green-200';
      case 'general': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ticket_followup': return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'general': return <Bell className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const isOverdue = (dueDate: Date, isCompleted: boolean) => {
    return !isCompleted && new Date(dueDate) < new Date();
  };

  const pendingReminders = reminders.filter(r => !r.isCompleted);
  const overdueReminders = reminders.filter(r => isOverdue(r.dueDate, r.isCompleted));
  const completedReminders = reminders.filter(r => r.isCompleted);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reminders</h2>
            <p className="text-gray-600">Stay on top of important tasks and follow-ups</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Reminder</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-blue-600">{pendingReminders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{overdueReminders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedReminders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Reminders' },
            { value: 'pending', label: 'Pending' },
            { value: 'overdue', label: 'Overdue' },
            { value: 'completed', label: 'Completed' },
            { value: 'ticket_followup', label: 'Ticket Follow-ups' },
            { value: 'maintenance', label: 'Maintenance' },
            { value: 'meeting', label: 'Meetings' },
            { value: 'general', label: 'General' }
          ].map(filterOption => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption.value
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.map(reminder => (
          <div
            key={reminder.id}
            className={`bg-white rounded-lg shadow-sm border p-4 ${
              isOverdue(reminder.dueDate, reminder.isCompleted)
                ? 'border-red-200 bg-red-50'
                : reminder.isCompleted
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg border ${getTypeColor(reminder.type)}`}>
                    {getTypeIcon(reminder.type)}
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      reminder.isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {reminder.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(reminder.type)}`}>
                      {reminder.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <p className={`text-sm mb-3 ${
                  reminder.isCompleted ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {reminder.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className={isOverdue(reminder.dueDate, reminder.isCompleted) ? 'text-red-600 font-medium' : ''}>
                      Due: {reminder.dueDate.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{reminder.assignee}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {!reminder.isCompleted && (
                  <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
                {isOverdue(reminder.dueDate, reminder.isCompleted) && (
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">OVERDUE</span>
                  </div>
                )}
                {reminder.isCompleted && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">COMPLETED</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No reminders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Reminders;