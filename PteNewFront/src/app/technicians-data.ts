interface Technician {
    _id: string;
    image: string;
    fullname: string;
    email: string;
    phone: string;
    specialization: string;
    experienceLevel: string;
    certification: string[];
  }

  export const data: Technician[] = [
    {
      _id: '645b9a2f765c6d485d165290',
      image: "1663081239761--avatar3.png",
      fullname: "Jihed Medini",
      email: "jihed.medini@gmail.com",
      phone: "98215736",
      specialization: "Electrician",
      experienceLevel: "Senior",
      certification: ["Certified Electrician", "Safety Training"]
    },
    {
      _id: '6462165e4fb5fc1af7da9f43',
      image: "1664286226996--ayoub1.png",
      fullname: "Wael Yahyaoui",
      email: "wael.yahyaoui@gmail.com",
      phone: "56281274",
      specialization: "IT Support",
      experienceLevel: "Intermediate",
      certification: ["Apple Certified Support Professional (ACSP)"]
    },
    {
        _id: '646747d65478aa18f76244f5',
        image: "1663082985450--avatar4.jpg",
        fullname: "Anis Farah",
        email: "Anis.Farah@gmail.com",
        phone: "97123569",
        specialization: "Network Engineer",
        experienceLevel: "Junior",
        certification: ["Cisco Certified Network Associate (CCNA)"]
      },
      {
        _id: '64674b66bd8d3d937b6e8374',
        image: "1661047323160--avatar.jpg",
        fullname: "Chokri Snoussi",
        email: "Chokri.Snoussi@gmail.com",
        phone: "56781420",
        specialization: "IT Support",
        experienceLevel: "Intermediate",
        certification: ["IT License"]
      },
      
  ];
  