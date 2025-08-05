import React from 'react';
import { Activity, Clock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { TechAvailability as TechAvailabilityType } from '../types';

interface TechAvailabilityProps {
  technicians: TechAvailabilityType[];
}

const TechAvailability: React.FC<TechAvailabilityProps> = ({ technicians }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-red-100 text-red-800 border-red-200';
      case 'away': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'busy': return <AlertCircle className="w-4 h-4" />;
      case 'away': return <Clock className="w-4 h-4" />;
      case 'offline': return <User className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return 'bg-red-500';
    if (workload >= 60) return 'bg-yellow-500';
    if (workload >= 40) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const availableTechs = technicians.filter(tech => tech.status === 'available');
  const busyTechs = technicians.filter(tech => tech.status === 'busy');
  const awayTechs = technicians.filter(tech => tech.status === 'away');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tech Availability Chart</h2>
        <p className="text-gray-600">Real-time view of technician availability and workload</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{availableTechs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Busy</p>
              <p className="text-2xl font-bold text-red-600">{busyTechs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Away</p>
              <p className="text-2xl font-bold text-yellow-600">{awayTechs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Workload</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(technicians.reduce((sum, tech) => sum + tech.workload, 0) / technicians.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technician Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Technician Status</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {technicians.map(tech => (
              <div key={tech.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{tech.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tech.status)}`}>
                          {getStatusIcon(tech.status)}
                          <span className="ml-1 capitalize">{tech.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workload Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Workload</span>
                    <span>{tech.workload}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getWorkloadColor(tech.workload)}`}
                      style={{ width: `${tech.workload}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current Task */}
                {tech.currentTask && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Current Task:</p>
                    <p className="text-sm font-medium text-gray-900">{tech.currentTask}</p>
                  </div>
                )}

                {/* Next Available */}
                {tech.nextAvailable && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Available at: {tech.nextAvailable.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Assign Task
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechAvailability;