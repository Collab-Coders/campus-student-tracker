export interface Campus {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
  description: string;
}
export interface CampusDetailProps {
  campus: Campus;
  isDarkMode: boolean;
  styles: any;
  students: Student[];
  onBack: () => void;
  onSave?: (updatedCampus: Campus) => void;
}
export interface CampusFormProps {
  mode: 'add' | 'edit';
  initialData?: Campus | null;
  styles: any; 
  onClose: () => void;
  onSave: (campusData: Omit<Campus, 'id'> & { id?: string }) => void;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gpa: number;
  imageUrl: string;
  campusId: string | null; // referring to Campus.id
  status: 'Enrolled' | 'Not Enrolled' | 'Graduated';
}
export interface StudentDetailProps {
  student: Student;
  isDarkMode: boolean;
  styles: any;
  onBack: () => void;
  onSave?: (updatedStudent: Student) => void;
}

export interface StudentFormProps {
  mode: 'add' | 'edit';
  initialData?: Student | null;
  campuses: Campus[];
  styles: any;
  onClose: () => void;
  onSave: (studentData: Omit<Student, 'id'> & { id?: string }) => void;
}

// dummy data
export const mockCampuses: Campus[] = [
  { id: '1', name: 'Satellite Manhattan Center', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop', address: '123 Enterprise Way, New York, NY 10001', description: 'A bustling urban high-rise campus specializing in technology, finance, and professional networking.' },
  { id: '2', name: 'Brooklyn Tech Hub', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop', address: '456 Innovation Blvd, Brooklyn, NY 11201', description: 'Our creative flagship campus featuring state-of-the-art engineering labs, maker spaces, and modern design studios.' },
  { id: '3', name: 'Queens Global Campus', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop', address: '789 Diversity Dr, Queens, NY 11101', description: 'A sprawling campus featuring beautiful green spaces and specialized centers for international business and language arts.' },
  { id: '4', name: 'Bronx Medical Academy', imageUrl: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=400&auto=format&fit=crop', address: '101 Healthcare Plaza, Bronx, NY 10461', description: 'Focused entirely on nursing, pre-med track specialties, and biological research sciences with direct hospital partnerships.' },
  { id: '5', name: 'Staten Island Environmental Lab', imageUrl: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=400&auto=format&fit=crop', address: '202 Eco Reserve Rd, Staten Island, NY 10301', description: 'A dedicated coastal facility focusing on ecological sustainability, marine biology operations, and renewable energy studies.' },
  { id: '6', name: 'Jersey City Executive Quad', imageUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=400&auto=format&fit=crop', address: '55 Exchange Pl, Jersey City, NJ 07302', description: 'An extension center centered around executive business programs, accelerated evening training, and data science bootcamps.' },
  { id: '7', name: 'Long Island Research Complex', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop', address: '333 Discovery Way, Stony Brook, NY 11790', description: 'Advanced laboratories optimized for computer infrastructure configurations, AI deep-learning arrays, and material sciences.' },
  { id: '8', name: 'Hoboken Arts Pavilion', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop', address: '88 River View Ter, Hoboken, NJ 07030', description: 'A creative space tailored to digital animation production, musical compositions, UI design workshops, and architecture streams.' },
  { id: '9', name: 'Newark Logistics Hub', imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=400&auto=format&fit=crop', address: '40 Commerce Ct, Newark, NJ 07102', description: 'Specialized programs tackling supply chain optimization, global trade management systems, and commercial engineering frameworks.' },
  { id: '10', name: 'Yonkers Community Commons', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop', address: '12 Gateway Ln, Yonkers, NY 10701', description: 'An inclusive accessible learning core featuring vocational training programs, foundational academic tracks, and public policy rows.' },
  { id: '11', name: 'White Plains Legal Institute', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop', address: '70 Justice Blvd, White Plains, NY 10601', description: 'Home to our criminal law preparations, paralegal certificate modules, and intensive conflict mediation workshops.' },
  { id: '12', name: 'Princeton Innovation Core', imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400&auto=format&fit=crop', address: '500 Quantum Meadows, Princeton, NJ 08540', description: 'Advanced partnerships addressing cybersecurity protocols, quantum processing algorithms, and deep physics modeling paradigms.' },
  { id: '13', name: 'Harlem Cultural Annex', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop', address: '250 Malcolm X Blvd, New York, NY 10027', description: 'Dedicated to journalism initiatives, sociological historical documentation studies, and non-profit organization programs.' },
  { id: '14', name: 'Stamford Corporate Nexus', imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&auto=format&fit=crop', address: '600 Atlantic St, Stamford, CT 06901', description: 'Bridging financial risk engineering systems, corporate advisory operations, and data analytics certification matrices.' },
  { id: '15', name: 'Astoria Culinary Arts Center', imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop', address: '31-10 Broadway, Queens, NY 11106', description: 'State of the art development kitchens mapping restaurant administration models, hospitality guidelines, and food science lines.' }
];
export const mockStudents: Student[] = [
  {
    id: '101',
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'arivera@student.edu',
    gpa: 3.85,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    campusId: 'd77b3597-4e1a-4aee-95ef-01c947adc040',
    status: 'Enrolled'
  },
  {
    id: '102',
    firstName: 'Jordan',
    lastName: 'Chen',
    email: 'jchen@student.edu',
    gpa: 3.92,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    campusId: 'd77b3597-4e1a-4aee-95ef-01c947adc040',
    status: 'Enrolled'
  },
  {
    id: '103',
    firstName: 'Taylor',
    lastName: 'Brooks',
    email: 'tbrooks@student.edu',
    gpa: 3.40,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    campusId: "d77b3597-4e1a-4aee-95ef-01c947adc040",
    status: 'Enrolled'
  },
  {
    id: '104',
    firstName: 'Morgan',
    lastName: 'Patel',
    email: 'mpatel@student.edu',
    gpa: 3.15,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    campusId: "d77b3597-4e1a-4aee-95ef-01c947adc040",
    status: 'Enrolled'
  },
  {
    id: '105',
    firstName: 'Sarah',
    lastName: 'Kaufman',
    email: 'skaufman@student.edu',
    gpa: 3.72,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    campusId: "892c6415-cf76-4f1a-9536-3ebb26f15556",
    status: 'Enrolled'
  },
  {
    id: '106',
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'mvance@student.edu',
    gpa: 2.98,
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
    campusId: "892c6415-cf76-4f1a-9536-3ebb26f15556",
    status: 'Not Enrolled'
  },
  {
    id: '107',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'erostova@student.edu',
    gpa: 4.00,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    campusId: "892c6415-cf76-4f1a-9536-3ebb26f15556",
    status: 'Enrolled'
  },
  {
    id: '108',
    firstName: 'Riley',
    lastName: 'O\'Connor',
    email: 'roconnor@student.edu',
    gpa: 3.65,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    campusId: "892c6415-cf76-4f1a-9536-3ebb26f15556",
    status: 'Graduated'
  }
];