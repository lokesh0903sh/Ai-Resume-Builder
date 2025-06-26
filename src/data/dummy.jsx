export default {
  firstName: "James",
  lastName: "Carter",
  jobTitle: "Full Stack Developer",
  address: "525 N Tryon Street, NC 28117",
  phone: "1234567890",
  email: "example@gmail.com",
  themeColor: "#ff6666",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sitamet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY",
      startDate: "Jan 2021",
      endDate: "",
      currentlyWorking: true,
      workSummary: `Designed, developed, and maintained full-stack web applications.\n
        Implemented responsive user interfaces with React, ensuring cross-platform compatibility.\n
        Maintaining the React Native in-house organization apps.\n
        Created RESTful APIs with Node.js and Express, facilitating integration between front-end and back-end systems.`,
    },
    {
      id: 2,
      title: "Software Engineer Intern",
      companyName: "Google",
      city: "Mountain View",
      state: "CA",
      startDate: "Jun 2020",
      endDate: "Dec 2020",
      currentlyWorking: false,
      workSummary: `Collaborated on a team project to enhance internal tools using Angular and Firebase.\n
        Wrote unit tests and performed code reviews.\n
        Worked on cloud functions for real-time database synchronization.`,
    },
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology",
      major: "Computer Science",
      universityName: "Indian Institute of Technology, Delhi",
      startYear: "2016",
      endYear: "2020",
      grade: "8.5 CGPA",
      description:
        "Studied core computer science subjects including data structures, algorithms, web development, and databases. Participated in various coding competitions and tech fests.",
    },
    {
      id: 2,
      degree: "Master of Science",
      major: "Software Engineering",
      universityName: "Massachusetts Institute of Technology (MIT)",
      startYear: "2021",
      endYear: "2023",
      grade: "9.1 CGPA",
      description:
        "Focused on software design, cloud computing, and scalable systems. Completed a thesis on microservices architecture and contributed to open-source backend projects.",
    },
  ],
  skills: [
    {
      id: 1,
      name: "Angular",
      rating: 80,
    },
    {
      id: 2,
      name: "React",
      rating: 100,
    },
    {
      id: 3,
      name: "Node.js",
      rating: 90,
    },
  ],
};
