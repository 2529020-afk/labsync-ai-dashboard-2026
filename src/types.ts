export interface EquipmentItem {
  id: string;
  name: string;
  model: string;
  category: 'Electronics' | 'Biotech' | 'Robotics' | 'Computing';
  zone: 'Zone A' | 'Zone B' | 'Zone C' | 'Zone D';
  lab: string;
  status: 'Available' | 'In Use' | 'Maintenance';
  health: number; // 0-100
  temp: string;
  power: string;
  fw: string;
  specs: string;
  lastCal: string;
  image: string;
  serialNumber: string;
  activeOperator?: string;
}

export interface BookingItem {
  id: string;
  equipmentId: string;
  equipmentName: string;
  user: string;
  lab: string;
  time: string;
  status: 'Confirmed' | 'Issued' | 'Returned';
  slot: string;
  date: string;
}

export interface FaultItem {
  id: string;
  equipmentId: string;
  equipmentName: string;
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  status: 'Reported' | 'In Progress' | 'Resolved';
  reportedBy: string;
  date: string;
  assignedTechnician?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: 'log-out' | 'check-circle' | 'alert-triangle' | 'refresh-cw' | 'calendar-plus' | 'wrench';
  color: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type UserRole = 'Admin' | 'Faculty' | 'Lab Assistant' | 'Student';

export type TabType = 'dashboard' | 'equipment' | 'bookings' | 'faults' | 'assistant';
