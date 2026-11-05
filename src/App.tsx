import React, { useState } from 'react';
import { 
  INITIAL_EQUIPMENT, 
  INITIAL_BOOKINGS, 
  INITIAL_FAULTS, 
  INITIAL_ACTIVITIES 
} from './mockData';
import { 
  EquipmentItem, 
  BookingItem, 
  FaultItem, 
  ActivityItem, 
  UserRole, 
  TabType 
} from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { EquipmentCatalog } from './components/EquipmentCatalog';
import { BookingsView } from './components/BookingsView';
import { FaultsView } from './components/FaultsView';
import { AssistantView } from './components/AssistantView';
import { Modals } from './components/Modals';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [role, setRole] = useState<UserRole>('Lab Assistant');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core mutable state
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);
  const [faults, setFaults] = useState<FaultItem[]>(INITIAL_FAULTS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  // Modal dialog states
  const [inspectItem, setInspectItem] = useState<EquipmentItem | null>(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isReportFaultOpen, setIsReportFaultOpen] = useState(false);
  const [preselectedEquipmentId, setPreselectedEquipmentId] = useState<string | null>(null);

  // Status counters
  const openFaultCount = faults.filter((f) => f.status !== 'Resolved').length;
  const activeBookingsCount = bookings.filter((b) => b.status === 'Issued' || b.status === 'Confirmed').length;

  // Title dictionary
  const pageTitles: Record<TabType, { t: string; s: string }> = {
    dashboard: {
      t: 'Dashboard Overview',
      s: 'Real-time telemetry, campus equipment load, component states and alert center'
    },
    equipment: {
      t: 'Smart Equipment Inventory',
      s: 'Filterable instrument catalog with live thermal telemetry, health metrics & SOPs'
    },
    bookings: {
      t: 'Equipment Reservations',
      s: 'Manage check-outs, safety sign-offs, and student passes'
    },
    faults: {
      t: 'Maintenance & QA Work Orders',
      s: 'Report equipment damage and track engineering work orders'
    },
    assistant: {
      t: 'AI Lab Copilot',
      s: 'Autonomous copilot for equipment manuals, troubleshooting & safety protocols'
    }
  };

  // Handlers
  const handleInspect = (id: string) => {
    const found = equipment.find((e) => e.id === id);
    if (found) setInspectItem(found);
  };

  const handleOpenBookingModal = (id?: string) => {
    setPreselectedEquipmentId(id || null);
    setIsNewBookingOpen(true);
  };

  const handleOpenFaultModal = (id?: string) => {
    setPreselectedEquipmentId(id || null);
    setIsReportFaultOpen(true);
  };

  const handleCreateBooking = (data: {
    equipmentId: string;
    userName: string;
    lab: string;
    date: string;
    slot: string;
  }) => {
    const targetEq = equipment.find((eq) => eq.id === data.equipmentId);
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingItem = {
      id: newId,
      equipmentId: data.equipmentId,
      equipmentName: targetEq ? targetEq.name : 'Laboratory Equipment',
      user: `${data.userName} (${role})`,
      lab: data.lab,
      time: `${data.date} (${data.slot})`,
      status: 'Confirmed',
      slot: data.slot,
      date: data.date
    };

    setBookings((prev) => [newBooking, ...prev]);

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'New Reservation',
        desc: `${targetEq?.name || 'Instrument'} scheduled for ${data.userName}`,
        time: 'Just now',
        icon: 'calendar-plus',
        color: 'text-cyan-400'
      },
      ...prev
    ]);

    setIsNewBookingOpen(false);
    setCurrentTab('bookings');
  };

  const handleUpdateBookingStatus = (
    bookingId: string,
    newStatus: 'Confirmed' | 'Issued' | 'Returned'
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );

    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    if (newStatus === 'Issued') {
      setEquipment((prev) =>
        prev.map((e) => (e.id === booking.equipmentId ? { ...e, status: 'In Use' } : e))
      );
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: 'Equipment Issued',
          desc: `${booking.equipmentName} checked out to ${booking.user}`,
          time: 'Just now',
          icon: 'log-out',
          color: 'text-amber-400'
        },
        ...prev
      ]);
    } else if (newStatus === 'Returned') {
      setEquipment((prev) =>
        prev.map((e) => (e.id === booking.equipmentId ? { ...e, status: 'Available' } : e))
      );
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: 'Equipment Returned',
          desc: `${booking.equipmentName} returned to inventory shelf`,
          time: 'Just now',
          icon: 'check-circle',
          color: 'text-emerald-400'
        },
        ...prev
      ]);
    }
  };

  const handleCreateFault = (data: {
    equipmentId: string;
    severity: 'High' | 'Medium' | 'Low';
    title: string;
    desc: string;
  }) => {
    const targetEq = equipment.find((eq) => eq.id === data.equipmentId);
    const newId = `FLT-${Math.floor(400 + Math.random() * 500)}`;

    const newFault: FaultItem = {
      id: newId,
      equipmentId: data.equipmentId,
      equipmentName: targetEq ? targetEq.name : 'Lab Hardware',
      severity: data.severity,
      title: data.title,
      description: data.desc,
      status: 'Reported',
      reportedBy: `${role}`,
      date: new Date().toISOString().split('T')[0]
    };

    setFaults((prev) => [newFault, ...prev]);

    if (targetEq) {
      setEquipment((prev) =>
        prev.map((e) =>
          e.id === data.equipmentId
            ? { ...e, status: 'Maintenance', health: Math.min(e.health, 65) }
            : e
        )
      );
    }

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'Incident Dispatched',
        desc: `${data.severity} priority fault ticket on ${targetEq?.name || 'Instrument'}`,
        time: 'Just now',
        icon: 'alert-triangle',
        color: 'text-rose-400'
      },
      ...prev
    ]);

    setIsReportFaultOpen(false);
    setCurrentTab('faults');
  };

  const handleUpdateFaultStatus = (
    faultId: string,
    newStatus: 'Reported' | 'In Progress' | 'Resolved'
  ) => {
    setFaults((prev) =>
      prev.map((f) => (f.id === faultId ? { ...f, status: newStatus } : f))
    );

    const f = faults.find((item) => item.id === faultId);
    if (!f) return;

    if (newStatus === 'Resolved') {
      setEquipment((prev) =>
        prev.map((e) =>
          e.id === f.equipmentId ? { ...e, status: 'Available', health: 98 } : e
        )
      );
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: 'Fault Ticket Closed',
          desc: `${f.equipmentName} certified and restored to service`,
          time: 'Just now',
          icon: 'check-circle',
          color: 'text-emerald-400'
        },
        ...prev
      ]);
    } else {
      setEquipment((prev) =>
        prev.map((e) => (e.id === f.equipmentId ? { ...e, status: 'Maintenance' } : e))
      );
    }
  };

  return (
    <div className="w-full h-screen text-slate-100 font-sans antialiased flex overflow-hidden lab-ambient-bg selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. Full-Height Docked Sidebar (Fixed on Desktop, Drawer on Mobile) */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        openFaultCount={openFaultCount}
      />

      {/* 2. Main Viewport (Expands across 100% of remaining horizontal space) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden relative">
        {/* Full-width Header */}
        <Header
          pageTitle={pageTitles[currentTab].t}
          pageSubtitle={pageTitles[currentTab].s}
          role={role}
          onRoleChange={setRole}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
          {currentTab === 'dashboard' && (
            <DashboardOverview
              equipment={equipment}
              bookingsCount={activeBookingsCount}
              openFaultCount={openFaultCount}
              activities={activities}
              onNavigateTab={setCurrentTab}
              onInspectEquipment={handleInspect}
              onQuickBook={handleOpenBookingModal}
            />
          )}

          {currentTab === 'equipment' && (
            <EquipmentCatalog
              equipment={equipment}
              onInspectEquipment={handleInspect}
              onQuickBook={handleOpenBookingModal}
            />
          )}

          {currentTab === 'bookings' && (
            <BookingsView
              bookings={bookings}
              onOpenNewBooking={() => handleOpenBookingModal()}
              onUpdateStatus={handleUpdateBookingStatus}
            />
          )}

          {currentTab === 'faults' && (
            <FaultsView
              faults={faults}
              onOpenReportModal={() => handleOpenFaultModal()}
              onUpdateStatus={handleUpdateFaultStatus}
            />
          )}

          {currentTab === 'assistant' && <AssistantView />}
        </main>
      </div>

      {/* Modals: Inspect, New Booking, Report Fault */}
      <Modals
        inspectItem={inspectItem}
        onCloseInspect={() => setInspectItem(null)}
        isNewBookingOpen={isNewBookingOpen}
        onCloseNewBooking={() => setIsNewBookingOpen(false)}
        isReportFaultOpen={isReportFaultOpen}
        onCloseReportFault={() => setIsReportFaultOpen(false)}
        equipment={equipment}
        preselectedEquipmentId={preselectedEquipmentId}
        role={role}
        onCreateBooking={handleCreateBooking}
        onCreateFault={handleCreateFault}
        onQuickBookFromInspect={(id) => {
          setInspectItem(null);
          handleOpenBookingModal(id);
        }}
        onReportFaultFromInspect={(id) => {
          setInspectItem(null);
          handleOpenFaultModal(id);
        }}
      />
    </div>
  );
}
