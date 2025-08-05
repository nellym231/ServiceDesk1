import React, { useState } from 'react';
import { Megaphone, Plus, AlertTriangle, Info, Settings, Zap, User, Calendar, Filter } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementsProps {
  announcements: Announcement[];
}

const Announcements: React.FC<AnnouncementsProps> = ({ announcements }) => {
  const [filter, setFilter] = useState('all');

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return announcement.isActive;
    return announcement.category === filter && announcement.isActive;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'maintenance': return 'text-red-600 bg-red-100 border-red-200';
      case 'policy': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'system_update': return 'text-green-600 bg-green-100 border-green-200';
      case 'general': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'maintenance': return <AlertTriangle className="w-4 h-4" />;
      case 'policy': return <Info className="w-4 h-4" />;
      case 'system_update': return <Zap className="w-4 h-4" />;
      case 'general': return <Megaphone className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const highPriorityAnnouncements = announcements.filter(a => a.priority === 'high' && a.isActive);
  const totalActiveAnnouncements = announcements.filter(a => a.isActive);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Announcements</h2>
            <p className="text-gray-600">Important updates and notifications for the team</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Announcement</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Megaphone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Announcements</p>
              <p className="text-2xl font-bold text-blue-600">{totalActiveAnnouncements.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">{highPriorityAnnouncements.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* High Priority Announcements Banner */}
      {highPriorityAnnouncements.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">High Priority Announcements</h3>
          </div>
          <div className="space-y-2">
            {highPriorityAnnouncements.map(announcement => (
              <div key={announcement.id} className="text-sm text-red-800">
                <strong>{announcement.title}:</strong> {announcement.content.substring(0, 100)}...
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Categories' },
            { value: 'maintenance', label: 'Maintenance' },
            { value: 'policy', label: 'Policy Updates' },
            { value: 'system_update', label: 'System Updates' },
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

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map(announcement => (
          <div
            key={announcement.id}
            className={`bg-white rounded-lg shadow-sm border p-6 ${
              announcement.priority === 'high' ? 'border-red-200' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg border ${getCategoryColor(announcement.category)}`}>
                  {getCategoryIcon(announcement.category)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(announcement.category)}`}>
                      {announcement.category.replace('_', ' ')}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority} priority
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>By {announcement.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{announcement.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                  Share in Teams
                </button>
                <button className="px-3 py-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Mark as Read
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No announcements found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Announcements;