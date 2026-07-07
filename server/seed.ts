import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Campus = {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  description: string;
};

async function seed() {
  await prisma.student.deleteMany({});
  await prisma.campus.deleteMany({});

  const createdCampuses = await prisma.campus.createManyAndReturn({
    data: [
      {
        name: "Satellite Manhattan Center",
        address: "123 Enterprise Way, New York, NY 10001",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop",
        description:
          "A bustling urban high-rise campus specializing in technology, finance, and professional networking.",
      },
      {
        name: "Brooklyn Tech Hub",
        address: "456 Innovation Blvd, Brooklyn, NY 11201",
        imageUrl:
          "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop",
        description:
          "Our creative flagship campus featuring state-of-the-art engineering labs, maker spaces, and modern design studios.",
      },
      {
        name: "Queens Global Campus",
        address: "789 Diversity Dr, Queens, NY 11101",
        imageUrl:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop",
        description:
          "A sprawling campus featuring beautiful green spaces and specialized centers for international business and language arts.",
      },
      {
        name: "Bronx Medical Academy",
        address: "101 Healthcare Plaza, Bronx, NY 10461",
        imageUrl:
          "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=400&auto=format&fit=crop",
        description:
          "Focused entirely on nursing, pre-med track specialties, and biological research sciences with direct hospital partnerships.",
      },
      {
        name: "Staten Island Environmental Lab",
        address: "202 Eco Reserve Rd, Staten Island, NY 10301",
        imageUrl:
          "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=400&auto=format&fit=crop",
        description:
          "A dedicated coastal facility focusing on ecological sustainability, marine biology operations, and renewable energy studies.",
      },
      {
        name: "Jersey City Executive Quad",
        address: "55 Exchange Pl, Jersey City, NJ 07302",
        imageUrl:
          "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=400&auto=format&fit=crop",
        description:
          "An extension center centered around executive business programs, accelerated evening training, and data science bootcamps.",
      },
      {
        name: "Long Island Research Complex",
        address: "333 Discovery Way, Stony Brook, NY 11790",
        imageUrl:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop",
        description:
          "Advanced laboratories optimized for computer infrastructure configurations, AI deep-learning arrays, and material sciences.",
      },
      {
        name: "Hoboken Arts Pavilion",
        address: "88 River View Ter, Hoboken, NJ 07030",
        imageUrl:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop",
        description:
          "A creative space tailored to digital animation production, musical compositions, UI design workshops, and architecture streams.",
      },
      {
        name: "Newark Logistics Hub",
        address: "40 Commerce Ct, Newark, NJ 07102",
        imageUrl:
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=400&auto=format&fit=crop",
        description:
          "Specialized programs tackling supply chain optimization, global trade management systems, and commercial engineering frameworks.",
      },
      {
        name: "Yonkers Community Commons",
        address: "12 Gateway Ln, Yonkers, NY 10701",
        imageUrl:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop",
        description:
          "An inclusive accessible learning core featuring vocational training programs, foundational academic tracks, and public policy rows.",
      },
      {
        name: "White Plains Legal Institute",
        address: "70 Justice Blvd, White Plains, NY 10601",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop",
        description:
          "Home to our criminal law preparations, paralegal certificate modules, and intensive conflict mediation workshops.",
      },
      {
        name: "Princeton Innovation Core",
        address: "500 Quantum Meadows, Princeton, NJ 08540",
        imageUrl:
          "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400&auto=format&fit=crop",
        description:
          "Advanced partnerships addressing cybersecurity protocols, quantum processing algorithms, and deep physics modeling paradigms.",
      },
      {
        name: "Harlem Cultural Annex",
        address: "250 Malcolm X Blvd, New York, NY 10027",
        imageUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
        description:
          "Dedicated to journalism initiatives, sociological historical documentation studies, and non-profit organization programs.",
      },
      {
        name: "Stamford Corporate Nexus",
        address: "600 Atlantic St, Stamford, CT 06901",
        imageUrl:
          "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&auto=format&fit=crop",
        description:
          "Bridging financial risk engineering systems, corporate advisory operations, and data analytics certification matrices.",
      },
      {
        name: "Astoria Culinary Arts Center",
        address: "31-10 Broadway, Queens, NY 11106",
        imageUrl:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop",
        description:
          "State of the art development kitchens mapping restaurant administration models, hospitality guidelines, and food science lines.",
      },
    ],
  });

  const getCampusId = (name: string): string => {
    const campus = createdCampuses.find((c) => c.name === name);
    if (!campus) {
      throw new Error(`Campus with name "${name}" not found!`);
    }
    return campus.id;
  };

  await prisma.student.createMany({
    data: [
      {
        firstName: "Alex",
        lastName: "Rivera",
        email: "arivera@student.edu",
        gpa: 3.85,
        imageUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        campusId: getCampusId("Satellite Manhattan Center"),
        status: "Enrolled",
      },
      {
        firstName: "Jordan",
        lastName: "Chen",
        email: "jchen@student.edu",
        gpa: 3.92,
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        campusId: getCampusId("Satellite Manhattan Center"),
        status: "Enrolled",
      },
      {
        firstName: "Taylor",
        lastName: "Brooks",
        email: "tbrooks@student.edu",
        gpa: 3.4,
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        campusId: getCampusId("Satellite Manhattan Center"),
        status: "Enrolled",
      },
      {
        firstName: "Morgan",
        lastName: "Patel",
        email: "mpatel@student.edu",
        gpa: 3.15,
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        campusId: getCampusId("Satellite Manhattan Center"),
        status: "Enrolled",
      },
      {
        firstName: "Sarah",
        lastName: "Kaufman",
        email: "skaufman@student.edu",
        gpa: 3.72,
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        campusId: getCampusId("Brooklyn Tech Hub"),
        status: "Enrolled",
      },
      {
        firstName: "Marcus",
        lastName: "Vance",
        email: "mvance@student.edu",
        gpa: 2.98,
        imageUrl:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
        campusId: null,
        status: "Not Enrolled",
      },
      {
        firstName: "Elena",
        lastName: "Rostova",
        email: "erostova@student.edu",
        gpa: 4.0,
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        campusId: getCampusId("Brooklyn Tech Hub"),
        status: "Enrolled",
      },
      {
        firstName: "Riley",
        lastName: "O'Connor",
        email: "roconnor@student.edu",
        gpa: 3.65,
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
        campusId: getCampusId("Brooklyn Tech Hub"),
        status: "Graduated",
      },
    ],
  });

  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
