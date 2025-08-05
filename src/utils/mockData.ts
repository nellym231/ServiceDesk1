import { Ticket, User, DashboardStats } from '../types';
import { TechAvailability, Task, Reminder, Announcement, ScheduleEvent, MajorIncident, IncidentUpdate } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'agent', department: 'IT Support' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', role: 'admin', department: 'IT Support' },
  { id: '3', name: 'Mike Johnson', email: 'mike.johnson@company.com', role: 'requester', department: 'Sales' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', role: 'agent', department: 'IT Support' },
];

export const mockTickets: Ticket[] = [
  {
    id: 'INC-001',
    title: 'Email server down - urgent',
    description: 'The email server is not responding. Multiple users affected.',
    type: 'incident',
    priority: 'critical',
    status: 'in_progress',
    assignee: 'John Doe',
    requester: 'Mike Johnson',
    createdAt: new Date('2025-01-08T09:15:00'),
    updatedAt: new Date('2025-01-08T10:30:00'),
    category: 'Email',
    subcategory: 'Server Issues'
  },
  {
    id: 'SR-002',
    title: 'New user account setup',
    description: 'Please create a new user account for the new hire in marketing department.',
    type: 'service_request',
    priority: 'medium',
    status: 'open',
    assignee: 'Sarah Wilson',
    requester: 'Jane Smith',
    createdAt: new Date('2025-01-08T08:45:00'),
    updatedAt: new Date('2025-01-08T08:45:00'),
    category: 'User Management',
    subcategory: 'Account Creation'
  },
  {
    id: 'INC-003',
    title: 'VPN connection issues',
    description: 'Unable to connect to VPN from home office. Getting timeout errors.',
    type: 'incident',
    priority: 'high',
    status: 'open',
    assignee: 'John Doe',
    requester: 'Mike Johnson',
    createdAt: new Date('2025-01-08T07:20:00'),
    updatedAt: new Date('2025-01-08T07:20:00'),
    category: 'Network',
    subcategory: 'VPN'
  },
  {
    id: 'SR-004',
    title: 'Software license renewal',
    description: 'Need to renew Office 365 licenses for the entire development team.',
    type: 'service_request',
    priority: 'medium',
    status: 'resolved',
    assignee: 'Sarah Wilson',
    requester: 'Jane Smith',
    createdAt: new Date('2025-01-07T14:30:00'),
    updatedAt: new Date('2025-01-08T09:00:00'),
    category: 'Software',
    subcategory: 'Licensing'
  },
  {
    id: 'INC-005',
    title: 'Printer not working',
    description: 'Office printer on 3rd floor is showing paper jam error but no paper is stuck.',
    type: 'incident',
    priority: 'low',
    status: 'closed',
    assignee: 'John Doe',
    requester: 'Mike Johnson',
    createdAt: new Date('2025-01-07T11:15:00'),
    updatedAt: new Date('2025-01-07T16:45:00'),
    category: 'Hardware',
    subcategory: 'Printers'
  }
];

export const mockStats: DashboardStats = {
  totalTickets: 45,
  openTickets: 12,
  inProgressTickets: 8,
  resolvedToday: 5,
  criticalTickets: 2
};

export const mockTechAvailability: TechAvailability[] = [
  {
    id: '1',
    name: 'John Doe',
    status: 'available',
    workload: 65,
    currentTask: 'Email server maintenance'
  },
  {
    id: '2',
    name: 'Jane Smith',
    status: 'busy',
    workload: 90,
    currentTask: 'Critical incident resolution',
    nextAvailable: new Date('2025-01-08T15:30:00')
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    status: 'available',
    workload: 45,
    currentTask: 'User account setup'
  },
  {
    id: '4',
    name: 'Mike Johnson',
    status: 'away',
    workload: 0,
    nextAvailable: new Date('2025-01-08T14:00:00')
  }
];

export const mockTasks: Task[] = [
  {
    id: 'T-001',
    title: 'Update server security patches',
    description: 'Apply latest security updates to production servers',
    assignee: 'John Doe',
    dueDate: new Date('2025-01-10T17:00:00'),
    priority: 'high',
    status: 'in_progress',
    relatedTicket: 'INC-001'
  },
  {
    id: 'T-002',
    title: 'Backup system verification',
    description: 'Verify backup systems are functioning correctly',
    assignee: 'Sarah Wilson',
    dueDate: new Date('2025-01-09T12:00:00'),
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'T-003',
    title: 'Network performance analysis',
    description: 'Analyze network performance metrics from last week',
    assignee: 'Jane Smith',
    dueDate: new Date('2025-01-08T16:00:00'),
    priority: 'low',
    status: 'completed'
  }
];

export const mockReminders: Reminder[] = [
  {
    id: 'R-001',
    title: 'Follow up on VPN issue',
    description: 'Check if VPN connection issue has been resolved',
    dueDate: new Date('2025-01-08T14:00:00'),
    type: 'ticket_followup',
    isCompleted: false,
    assignee: 'John Doe'
  },
  {
    id: 'R-002',
    title: 'Monthly server maintenance',
    description: 'Scheduled maintenance window for all servers',
    dueDate: new Date('2025-01-15T02:00:00'),
    type: 'maintenance',
    isCompleted: false,
    assignee: 'Jane Smith'
  },
  {
    id: 'R-003',
    title: 'Team standup meeting',
    description: 'Weekly team standup and progress review',
    dueDate: new Date('2025-01-09T09:00:00'),
    type: 'meeting',
    isCompleted: false,
    assignee: 'Sarah Wilson'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'A-001',
    title: 'Scheduled Maintenance Window',
    content: 'The email servers will undergo maintenance on January 15th from 2:00 AM to 4:00 AM. Users may experience brief interruptions.',
    author: 'Jane Smith',
    createdAt: new Date('2025-01-07T10:00:00'),
    priority: 'high',
    category: 'maintenance',
    isActive: true
  },
  {
    id: 'A-002',
    title: 'New Security Policy Update',
    content: 'Please review the updated security policy document. All staff must complete the security training by January 20th.',
    author: 'Admin Team',
    createdAt: new Date('2025-01-06T14:30:00'),
    priority: 'medium',
    category: 'policy',
    isActive: true
  },
  {
    id: 'A-003',
    title: 'Microsoft Teams Integration Live',
    content: 'The new Microsoft Teams integration is now live! You can now create and manage tickets directly from Teams.',
    author: 'IT Support',
    createdAt: new Date('2025-01-05T09:15:00'),
    priority: 'medium',
    category: 'system_update',
    isActive: true
  }
];

export const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: 'S-001',
    title: 'Server Maintenance',
    description: 'Routine maintenance on production servers',
    startTime: new Date('2025-01-15T02:00:00'),
    endTime: new Date('2025-01-15T04:00:00'),
    type: 'maintenance',
    assignee: 'John Doe',
    location: 'Data Center'
  },
  {
    id: 'S-002',
    title: 'Security Training',
    description: 'Mandatory security awareness training session',
    startTime: new Date('2025-01-10T10:00:00'),
    endTime: new Date('2025-01-10T12:00:00'),
    type: 'training',
    assignee: 'All Staff',
    location: 'Conference Room A'
  },
  {
    id: 'S-003',
    title: 'On-Call Shift',
    description: 'Weekend on-call support coverage',
    startTime: new Date('2025-01-11T18:00:00'),
    endTime: new Date('2025-01-12T08:00:00'),
    type: 'on_call',
    assignee: 'Sarah Wilson'
  }
];

export const mockMajorIncidents: MajorIncident[] = [
  {
    id: 'MAJ-001',
    title: 'Email Server Outage - Exchange Online',
    description: 'Complete email service disruption affecting all users across the organization',
    severity: 'critical',
    status: 'investigating',
    affectedServices: ['Exchange Online', 'Outlook Web App', 'Mobile Email'],
    impactedUsers: 1250,
    startTime: new Date('2025-01-08T09:15:00'),
    estimatedResolution: new Date('2025-01-08T14:00:00'),
    incidentCommander: 'Jane Smith',
    communicationChannel: 'Teams: Major Incidents',
    updates: [
      {
        id: 'UPD-001',
        ticketId: 'MAJ-001',
        author: 'Jane Smith',
        content: 'Initial investigation shows potential DNS resolution issues. Escalating to Microsoft support.',
        timestamp: new Date('2025-01-08T09:30:00'),
        type: 'escalation',
        visibility: 'public'
      },
      {
        id: 'UPD-002',
        ticketId: 'MAJ-001',
        author: 'John Doe',
        content: 'Workaround identified: Users can access email via mobile apps using cellular data.',
        timestamp: new Date('2025-01-08T10:15:00'),
        type: 'comment',
        visibility: 'public'
      }
    ],
    workarounds: [
      'Use mobile email apps with cellular data connection',
      'Access Outlook Web App via VPN if available',
      'Use Teams chat for urgent communications'
    ],
    relatedTickets: ['INC-001', 'INC-006', 'INC-007']
  },
  {
    id: 'MAJ-002',
    title: 'Network Connectivity Issues - Building A',
    description: 'Intermittent network connectivity affecting Building A users',
    severity: 'high',
    status: 'identified',
    affectedServices: ['WiFi Network', 'Ethernet Connections', 'VPN Access'],
    impactedUsers: 350,
    startTime: new Date('2025-01-08T08:00:00'),
    estimatedResolution: new Date('2025-01-08T12:00:00'),
    incidentCommander: 'Sarah Wilson',
    communicationChannel: 'Teams: Network Issues',
    updates: [
      {
        id: 'UPD-003',
        ticketId: 'MAJ-002',
        author: 'Sarah Wilson',
        content: 'Root cause identified: Faulty network switch in Building A server room. Replacement in progress.',
        timestamp: new Date('2025-01-08T10:45:00'),
        type: 'status_change',
        visibility: 'public'
      }
    ],
    workarounds: [
      'Use mobile hotspot for critical work',
      'Relocate to Building B conference rooms temporarily',
      'Use cellular data for Teams calls'
    ],
    relatedTickets: ['INC-003', 'INC-008']
  }
];