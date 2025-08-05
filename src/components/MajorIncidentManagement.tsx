import React, { useState } from 'react';
import { AlertTriangle, Users, MessageSquare, Clock, Activity, Bell, CheckCircle, ExternalLink, Plus, Filter } from 'lucide-react';
import { MajorIncident } from '../types';

interface MajorIncidentManagementProps {
  incidents: MajorIncident[];
}

const MajorIncidentManagement: React.FC<MajorIncidentManagementProps> = ({ incidents }) => {
  const [selectedIncident, setSelectedIncident] = useState<MajorIncident | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredIncidents = incidents.filter(incident => {
    if (statusFilter === 'all') return true;
    return incident.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100 border-red-200';
      case 'investigating': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'identified': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'monitoring': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'resolved': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const activeIncidents = incidents.filter(i => i.status !== 'resolved');
  const criticalIncidents = incidents.filter(i => i.severity === 'critical');

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Major Incident Management</h2>
            <p className="text-gray-600">Coordinate and manage critical incidents affecting business operations</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Declare Major Incident</span>
          </button>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {criticalIncidents.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Critical Incidents Active</h3>
              <p className="text-red-700 text-sm">
                {criticalIncidents.length} critical incident(s) requiring immediate attention
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Incidents</p>
              <p className="text-2xl font-bold text-red-600">{activeIncidents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-orange-600">2.5h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Impacted Users</p>
              <p className="text-2xl font-bold text-blue-600">
                {incidents.reduce((sum, inc) => sum + inc.impactedUsers, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="identified">Identified</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Major Incidents</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredIncidents.map(incident => (
                <div
                  key={incident.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedIncident?.id === incident.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedIncident(incident)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{incident.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{incident.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{incident.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{incident.impactedUsers} users affected</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Started {incident.startTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Activity className="w-4 h-4 mr-1" />
                      <span>Commander: {incident.incidentCommander}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Incident Details Sidebar */}
        <div className="space-y-6">
          {selectedIncident ? (
            <>
              {/* Incident Overview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Incident Overview</h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600 block">Incident Commander</span>
                    <span className="text-sm font-medium text-gray-900">{selectedIncident.incidentCommander}</span>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600 block">Communication Channel</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">{selectedIncident.communicationChannel}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600 block">Estimated Resolution</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedIncident.estimatedResolution?.toLocaleString() || 'TBD'}
                    </span>
                  </div>
                </div>
                
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Join Teams Channel</span>
                </button>
              </div>

              {/* Affected Services */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Affected Services</h4>
                
                <div className="space-y-2">
                  {selectedIncident.affectedServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-900">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workarounds */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Available Workarounds</h4>
                
                <div className="space-y-2">
                  {selectedIncident.workarounds.map((workaround, index) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-900">{workaround}</p>
                    </div>
                  ))}
                </div>
                
                <button className="mt-3 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Share Workarounds in Teams
                </button>
              </div>

              {/* Recent Updates */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Recent Updates</h4>
                
                <div className="space-y-3">
                  {selectedIncident.updates.slice(0, 3).map(update => (
                    <div key={update.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{update.author}</span>
                        <span className="text-xs text-gray-500">
                          {update.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    <Users className="w-4 h-4" />
                    <span>Tag Team Members</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <Bell className="w-4 h-4" />
                    <span>Send Status Update</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span>Escalate to Vendor</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select an incident to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MajorIncidentManagement;