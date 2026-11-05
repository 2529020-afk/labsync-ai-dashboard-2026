import { EquipmentItem, BookingItem, FaultItem, ActivityItem } from './types';

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  { 
    id: 'EQ-101', 
    name: 'Digital Storage Oscilloscope', 
    model: 'Rigol DS1054Z 50MHz', 
    category: 'Electronics', 
    zone: 'Zone A',
    lab: 'Lab 101 - RF & Circuits', 
    status: 'Available', 
    health: 98,
    temp: '28.4°C',
    power: '45W',
    fw: 'v00.04.04',
    specs: '50 MHz, 4 Analog Channels, 1 GSa/s real-time sample rate, 24 Mpts memory depth.', 
    lastCal: '2026-09-12',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    serialNumber: 'SN-RIG-99482-Z'
  },
  { 
    id: 'EQ-102', 
    name: 'Precision Arbitrary Wave Generator', 
    model: 'Siglent SDG1032X Dual-CH', 
    category: 'Electronics', 
    zone: 'Zone A',
    lab: 'Lab 101 - RF & Circuits', 
    status: 'In Use', 
    health: 94,
    temp: '32.1°C',
    power: '30W',
    fw: 'v1.01.28',
    specs: '30 MHz bandwidth, 150 MSa/s sampling rate, 14-bit vertical resolution, low-jitter square wave.', 
    lastCal: '2026-10-01',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    serialNumber: 'SN-SIG-44019-B',
    activeOperator: 'Dr. Sarah Chen'
  },
  { 
    id: 'EQ-103', 
    name: 'Carbon Multi-Material 3D Printer', 
    model: 'Bambu Lab X1-Carbon AMS', 
    category: 'Robotics', 
    zone: 'Zone C',
    lab: 'Lab 204 - Prototyping', 
    status: 'Available', 
    health: 99,
    temp: '55.0°C (Chamber)',
    power: '350W',
    fw: 'v01.07.02',
    specs: 'Dual auto bed leveling, AI lidar first layer inspection, 20000 mm/s acceleration, 300°C nozzle.', 
    lastCal: '2026-10-18',
    image: 'https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=800&q=80',
    serialNumber: 'SN-BAM-88120-X'
  },
  { 
    id: 'EQ-104', 
    name: 'Thermal Cycler (PCR Engine)', 
    model: 'Bio-Rad T100 Gradient', 
    category: 'Biotech', 
    zone: 'Zone B',
    lab: 'Lab 305 - Molecular Bio', 
    status: 'Maintenance', 
    health: 72,
    temp: 'Sensor Jitter (44°C)',
    power: '670W',
    fw: 'v2.10.00',
    specs: '96-well 0.2 ml block, thermal gradient range 30-100°C, touchscreen interface, Peltier heaters.', 
    lastCal: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    serialNumber: 'SN-BIO-11904-T'
  },
  { 
    id: 'EQ-105', 
    name: 'Edge AI Supercomputing Rig', 
    model: 'NVIDIA Jetson AGX Orin 64GB', 
    category: 'Computing', 
    zone: 'Zone D',
    lab: 'Lab 402 - Machine Vision', 
    status: 'Available', 
    health: 100,
    temp: '41.5°C',
    power: '50W (Max)',
    fw: 'JetPack 6.0',
    specs: '275 TOPS AI performance, 2048-core NVIDIA Ampere architecture GPU with 64 Tensor Cores.', 
    lastCal: '2026-10-25',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    serialNumber: 'SN-NV-77291-O'
  },
  { 
    id: 'EQ-106', 
    name: 'Industrial 6-DOF Collaborative Arm', 
    model: 'Universal Robots UR3e Cobot', 
    category: 'Robotics', 
    zone: 'Zone C',
    lab: 'Lab 204 - Prototyping', 
    status: 'In Use', 
    health: 96,
    temp: '34.8°C',
    power: '120W',
    fw: 'Polyscope 5.12',
    specs: '3 kg payload, 500 mm reach radius, 0.03mm repeatability, embedded force/torque sensor.', 
    lastCal: '2026-08-30',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    serialNumber: 'SN-UR3-33918-E',
    activeOperator: 'Liam Torres'
  },
  { 
    id: 'EQ-107', 
    name: 'UV-Vis Double Beam Spectrophotometer', 
    model: 'Shimadzu UV-1900i Ultra', 
    category: 'Biotech', 
    zone: 'Zone B',
    lab: 'Lab 305 - Molecular Bio', 
    status: 'Available', 
    health: 97,
    temp: '22.0°C',
    power: '140W',
    fw: 'v1.44',
    specs: 'Wavelength range 190 to 1100 nm, ultrafast spectral scan (29,000 nm/min), low stray light.', 
    lastCal: '2026-09-04',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
    serialNumber: 'SN-SHI-66120-U'
  },
  { 
    id: 'EQ-108', 
    name: 'FPGA Hardware Acceleration Kit', 
    model: 'AMD Xilinx Zynq UltraScale+ MPSoC', 
    category: 'Computing', 
    zone: 'Zone D',
    lab: 'Lab 402 - Machine Vision', 
    status: 'Available', 
    health: 100,
    temp: '38.2°C',
    power: '22W',
    fw: 'Vivado 2024.1',
    specs: 'Quad-core ARM Cortex-A53, dual-core Cortex-R5F, high-bandwidth transceiver logic cells.', 
    lastCal: '2026-10-10',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    serialNumber: 'SN-XLX-55280-Z'
  }
];

export const INITIAL_BOOKINGS: BookingItem[] = [
  { 
    id: 'BK-8901', 
    equipmentId: 'EQ-102', 
    equipmentName: 'Precision Arbitrary Wave Generator', 
    user: 'Dr. Sarah Chen (Faculty)', 
    lab: 'Lab 101 - RF & Circuits', 
    time: 'Today 14:00 - 16:00', 
    status: 'Issued',
    slot: '2 Hours (Standard Lab)',
    date: '2026-11-05'
  },
  { 
    id: 'BK-8902', 
    equipmentId: 'EQ-106', 
    equipmentName: 'Industrial 6-DOF Collaborative Arm', 
    user: 'Liam Torres (Student #819)', 
    lab: 'Lab 204 - Prototyping', 
    time: 'Today 15:30 - 17:30', 
    status: 'Issued',
    slot: '2 Hours (Standard Lab)',
    date: '2026-11-05'
  },
  { 
    id: 'BK-8903', 
    equipmentId: 'EQ-105', 
    equipmentName: 'Edge AI Supercomputing Rig', 
    user: 'Autonomous Robotics Team', 
    lab: 'Lab 402 - Machine Vision', 
    time: 'Tomorrow 09:00 - 12:00', 
    status: 'Confirmed',
    slot: '4 Hours (Extended Run)',
    date: '2026-11-06'
  }
];

export const INITIAL_FAULTS: FaultItem[] = [
  { 
    id: 'FLT-401', 
    equipmentId: 'EQ-104', 
    equipmentName: 'Thermal Cycler (PCR Engine)', 
    severity: 'High', 
    title: 'Lid heating coil intermittent breakdown', 
    description: 'Thermal sensor flashes error #33 during Stage 2 ramp-up. Peltier cycle aborted by safety circuit.', 
    status: 'In Progress', 
    reportedBy: 'Lab Technician Ross', 
    date: '2026-11-04',
    assignedTechnician: 'Ross Kowalski (Senior Lab Tech)'
  },
  { 
    id: 'FLT-402', 
    equipmentId: 'EQ-103', 
    equipmentName: 'Carbon Multi-Material 3D Printer', 
    severity: 'Low', 
    title: '0.4mm Hardened Nozzle filament friction', 
    description: 'Extruder stepper motor clicks when feeding carbon-fiber nylon composite filament.', 
    status: 'Reported', 
    reportedBy: 'Student Marcus', 
    date: '2026-11-05'
  },
  { 
    id: 'FLT-403', 
    equipmentId: 'EQ-101', 
    equipmentName: 'Digital Storage Oscilloscope', 
    severity: 'Medium', 
    title: 'Channel 3 probe BNC ground connector loose', 
    description: 'Connector feels loose; probe picks up 50Hz environmental RF noise under 10mV/div scaling.', 
    status: 'Resolved', 
    reportedBy: 'Prof. Miller', 
    date: '2026-11-02',
    assignedTechnician: 'Elena Rostova (Hardware Engineer)'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  { 
    id: 'act-1',
    title: 'Cobot Checked Out', 
    desc: 'Liam Torres logged out UR3e Cobot for kinematics test run', 
    time: '12 min ago', 
    icon: 'log-out', 
    color: 'text-amber-400' 
  },
  { 
    id: 'act-2',
    title: 'Autonomous QA Passed', 
    desc: 'Shimadzu Spectrophotometer auto-zero routine verified', 
    time: '45 min ago', 
    icon: 'check-circle', 
    color: 'text-emerald-400' 
  },
  { 
    id: 'act-3',
    title: 'Thermal Fault Flagged', 
    desc: 'PCR Engine placed in quarantine maintenance mode', 
    time: '2 hrs ago', 
    icon: 'alert-triangle', 
    color: 'text-rose-400' 
  },
  { 
    id: 'act-4',
    title: 'Firmware Synced', 
    desc: 'Bambu Lab X1-Carbon updated to v01.07.02', 
    time: '4 hrs ago', 
    icon: 'refresh-cw', 
    color: 'text-cyan-400' 
  }
];

export const COPILOT_KNOWLEDGE_BASE = [
  {
    triggers: ['calibrate', 'oscilloscope', 'rigol', 'ds1054z'],
    reply: `**Standard Calibration Procedure for Rigol DS1054Z (50MHz DSO):**

1. Ensure the instrument has warmed up at normal cleanroom temperature (21°C) for at least **20 minutes**.
2. Disconnect all BNC probes, coaxial leads, and input cables from channels **CH1 through CH4**.
3. Press the front-panel **[Utility]** button.
4. Navigate to softkey **Auto Calibration** -> **Start**.
5. The zero-offset internal DAC calibration takes ~2-3 minutes. Keep ambient temperature steady.
6. After completion, reboot and verify that baseline drift is < ±1.2mV.`
  },
  {
    triggers: ['safety', 'protocol', 'chemical', 'spill', 'lab 2', 'cleanroom', 'emergency'],
    reply: `**Emergency Incident SOP (Cleanroom Standard ISO 14644 & EN-61010):**

- **Evacuation Protocol:** If chemical vapors or lithium-battery runaway occurs, trip the manual **Emergency Power Off (EPO)** located beside Door B.
- **Spill Containment:** Neutralizing silica granules and Class-D extinguishers are mounted on Pillar 3.
- **Emergency Air Scrubbers:** Switch the HVAC duct override to full exhaust mode at panel Station 4.
- **Campus Dispatch:** Internal Emergency Line **#4499** or direct radio on Channel 7.`
  },
  {
    triggers: ['3d printer', 'bambu', 'x1', 'available', 'printers', 'filament'],
    reply: `**3D Prototyping Laboratory Status:**

- **Bambu Lab X1-Carbon (EQ-103):** Currently **Available** in Zone C (Lab 204). Chamber temperature 55°C, AMS loaded with Black PLA and Carbon-Fiber PETG.
- **SOP Reminder:** Use textured PEI plate with liquid glue application for high-temperature nylon runs. Maximum slot duration is 4 hours without instructor sign-off.`
  },
  {
    triggers: ['pcr', 'thermal', 'sensor', 'error 33', 'bio-rad'],
    reply: `**Diagnostic Guide for Bio-Rad T100 Error #33 (Thermal Sensor Jitter):**

1. Disconnect AC power plug immediately; the lid heating block may remain at >105°C.
2. Allow a 15-minute cool-down period.
3. Inspect the rubber gasket around the 96-well block for micro-condensation or foreign particles.
4. Clean contact pins using 99% electronic-grade Isopropanol.
5. If Error 33 persists, the internal thermistor bridge has failed and requires board-level replacement (Ticket **FLT-401** is currently tracking this).`
  },
  {
    triggers: ['booking', 'reserve', 'how to book', 'checkout', 'schedule'],
    reply: `**How to Reserve Equipment via LABSYNC AI:**

1. Navigate to the **Smart Inventory** tab or inspect any component directly from the **Dashboard Overview**.
2. Click **Reserve Instrument Now** (or use **Reservations -> New Demo Booking**).
3. Select your desired time slot, enter student/faculty identification, and specify the workstation.
4. The Lab Assistant can then issue a digital NFC/QR pass and mark the instrument as **Issued**.`
  }
];
