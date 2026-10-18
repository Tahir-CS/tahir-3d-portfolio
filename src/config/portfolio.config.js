// Portfolio Configuration - Editorial & Systems Architecture Portfolio

export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Muhammad Tahir",
    fullName: "Muhammad Tahir",
    title: "Software & Backend Engineer",
    roleSubtitle: "Backend Development • Databases • Web Applications",
    status: "Available for Software Roles",
    location: "Lahore, Pakistan (UTC+5)",
    tagline: "Building reliable backend services, clean databases, and modern web applications.",
    bio: "Computer Science student at UET Lahore building reliable backend services, database schemas, and modern web applications.",
    email: "mtahirbutt1005@gmail.com",
    phone: "+92 329 9712924",
    
    // Social Links
    social: {
      github: "https://github.com/Tahir-CS",
      linkedin: "https://linkedin.com/in/tahir-butt-8345a5329",
      twitter: "",
    }
  },

  // About Section & Engineering Highlights
  about: {
    statement: "I build software that stays fast, handles high traffic, and never loses data.",
    overview: `Focused on reliable backend systems using Node.js and TypeScript, relational databases with PostgreSQL, and message queues with BullMQ and Redis. I build web applications with clean structure, automated workflows, and fast responses.`,
    
    education: {
      degree: "B.S. in Computer Science",
      institution: "University of Engineering and Technology (UET), Lahore",
      cgpa: "CGPA 3.3 / 4.0",
      graduationDate: "Expected 2028",
      coursework: [
        "Distributed Computing",
        "Data Structures & Algorithms",
        "Database Systems",
        "Systems Programming (C++)",
        "Operating Systems"
      ]
    },

    milestones: [
      {
        index: "01",
        metric: "<50ms",
        label: "Queue Response",
        detail: "Background job execution with BullMQ & Redis"
      },
      {
        index: "02",
        metric: "pgvector",
        label: "Similarity Search",
        detail: "Fast cosine distance search in PostgreSQL"
      },
      {
        index: "03",
        metric: "Timescale",
        label: "Time-Series Data",
        detail: "Partitioned tables for video & metrics tracking"
      },
      {
        index: "04",
        metric: "Docker",
        label: "Containerized",
        detail: "Reliable service boundaries and local setup"
      }
    ]
  },

  // Skills Matrix
  skills: {
    "Distributed & Queues": [
      "BullMQ",
      "Redis",
      "Event-Driven Architecture",
      "Token-Bucket Rate Limiting",
      "Job Worker Pools"
    ],
    "Backend Core": [
      "Node.js",
      "TypeScript",
      "Express.js",
      "C++",
      "RESTful API Design",
      "Microservices"
    ],
    "Databases & Vectors": [
      "PostgreSQL",
      "pgvector",
      "TimescaleDB",
      "MongoDB",
      "Supabase (RLS)",
      "SQL Optimization"
    ],
    "Infrastructure": [
      "Docker",
      "Docker Compose",
      "AWS EC2",
      "CI/CD Workflows",
      "Linux / Bash",
      "Git Architecture"
    ],
    "Client & Extensions": [
      "React.js",
      "Chrome MV3 APIs",
      "Modern CSS / Tailwind",
      "Vite",
      "Framer Motion"
    ]
  },

  // Featured Engineering Projects
  projects: [
    {
      index: "01",
      title: "CareerOS",
      badge: "DEPLOYED REFERENCE BUILD",
      category: "CAREER WORKSPACE",
      thumbnail: "/assets/careeros.png",
      description: "A career workspace with resume parsing, live job matching, and candidate profile tracking designed to find matching roles in seconds.",
      features: "RESUME PARSER • LIVE JOB SEARCH • QUEUE PIPELINE • PROFILE MATCHING",
      architecture: [
        "Fast job queue processing using Redis and BullMQ worker threads",
        "Semantic candidate matching using PostgreSQL vector indexing",
        "Docker container setup separating worker, API, and database services"
      ],
      techStack: ["React.js", "Node.js", "Redis", "BullMQ", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/Tahir-CS/CAREER-OS-",
      liveUrl: null,
      featured: true
    },
    {
      index: "02",
      title: "CreatorIQ",
      badge: "DEPLOYED REFERENCE BUILD",
      category: "CREATOR ANALYTICS",
      thumbnail: "/assets/yt-analysis.png",
      description: "A YouTube channel analytics and sponsorship valuation platform built to project 48-hour video views and calculate fair sponsorship rates.",
      features: "CHANNEL ANALYTICS • SPONSORSHIP CALCULATOR • HOOK ANALYZER • METRICS INGESTION",
      architecture: [
        "Distributed Redis rate-limiting to manage external API quotas",
        "TimescaleDB hypertable storage for fast time-series analytics queries",
        "Content categorization and sentiment grouping for creator videos"
      ],
      techStack: ["React.js", "Node.js", "TimescaleDB", "PostgreSQL", "Redis", "Docker"],
      githubUrl: "https://github.com/Tahir-CS/Yt-Analysis-Engine",
      liveUrl: null,
      featured: true
    },
    {
      index: "03",
      title: "Subscription Guardian",
      badge: "DEPLOYED REFERENCE BUILD",
      category: "BROWSER EXTENSION",
      thumbnail: "/assets/subscription-guardian.png",
      description: "A private browser extension that tracks recurring charges, alerts you before free trials renew, and flags hidden fees directly during checkout.",
      features: "TRIAL ALERTS • RENEWAL REMINDERS • ZERO DATA TELEMETRY • DOM INSPECTOR",
      architecture: [
        "DOM mutation observers detecting deceptive recurring checkout patterns",
        "100% client-side privacy architecture with zero external data collection",
        "Manifest V3 background worker running renewal schedule alarms"
      ],
      techStack: ["TypeScript", "Chrome MV3 API", "React.js", "Chrome Alarms", "Webpack"],
      githubUrl: "https://github.com/Tahir-CS/Subscription-manager",
      liveUrl: "https://tahir-cs.github.io/Subscription-manager/",
      featured: true
    },
    {
      index: "04",
      title: "Modern E-Commerce Store",
      badge: "DEPLOYED REFERENCE BUILD",
      category: "COMMERCE PLATFORM",
      thumbnail: "/assets/ecommerce-store.png",
      description: "A modern online storefront with real-time cart state, secure user authentication, product search, and verified Stripe checkout payments.",
      features: "PRODUCT CATALOG • REALTIME CART • STRIPE PAYMENTS • ROW-LEVEL SECURITY",
      architecture: [
        "Supabase Row-Level Security ensuring strict database access rules",
        "Stripe checkout flow with signed webhook payment confirmation",
        "Optimistic UI updates for immediate cart and checkout feedback"
      ],
      techStack: ["React.js", "Supabase", "Stripe API", "PostgreSQL", "Vite"],
      githubUrl: "https://github.com/Tahir-CS/E-commerse-store",
      liveUrl: "https://e-commerse-store-eta.vercel.app/",
      featured: true
    },
    {
      index: "05",
      title: "TrendVision Analytics",
      badge: "ENGINEERING BUILD",
      category: "PREDICTIVE ANALYTICS",
      thumbnail: "/assets/trendvision.png",
      description: "Algorithmic market trend forecasting engine processing social signals and time-series trade patterns.",
      features: "TIME-SERIES ML • REALTIME WEBSOCKETS • HEATMAP VIZ • DRIFT DETECTION",
      architecture: [
        "Event-driven architecture streaming tick data over WebSocket multiplexers",
        "In-memory Redis pipeline computing moving averages with sub-millisecond latency"
      ],
      techStack: ["React.js", "Python", "FastAPI", "Redis", "TimescaleDB"],
      githubUrl: "https://github.com/Tahir-CS",
      liveUrl: null,
      featured: false
    },
    {
      index: "06",
      title: "AI Resume Analyzer",
      badge: "ENGINEERING BUILD",
      category: "LLM WORKSPACE",
      thumbnail: "/assets/ai-resume-analyzer.png",
      description: "Automated ATS resume parser scoring keyword density and semantic match against job descriptions using vector embeddings.",
      features: "VECTOR SEARCH • ATS SCORING • PDF EXTRACTION • LATENCY < 400MS",
      architecture: [
        "LangChain pipeline with PGVector similarity search for candidate ranking",
        "Zero-copy PDF byte parsing in worker threads"
      ],
      techStack: ["Next.js", "Node.js", "PGVector", "OpenAI API", "Tailwind CSS"],
      githubUrl: "https://github.com/Tahir-CS",
      liveUrl: null,
      featured: false
    },
    {
      index: "07",
      title: "UET OpenCourseWare",
      badge: "INSTITUTIONAL PLATFORM",
      category: "ACADEMIC PORTAL",
      thumbnail: "/assets/uet-ocw.png",
      description: "University courseware distribution portal engineered during KICS internship with tiered role-based access for students and faculty.",
      features: "ROLE RBAC • MEDIA STREAMING • COURSE REGISTRY • AUDIT LOGS",
      architecture: [
        "Next.js frontend connected with Laravel REST backend services",
        "S3 presigned URLs for secure streaming of academic lecture materials"
      ],
      techStack: ["Next.js", "Laravel", "PostgreSQL", "AWS S3", "Docker"],
      githubUrl: "https://github.com/Tahir-CS",
      liveUrl: null,
      featured: false
    }
  ],

  // Experience Section
  experience: [
    {
      index: "01",
      title: "Full Stack Engineering Intern",
      company: "KICS (Al-Khwarizmi Institute of Computer Science)",
      location: "UET Lahore, Pakistan",
      duration: "June 28, 2026 — September 4, 2026",
      type: "Full-Stack Internship (2 Months)",
      description: "Completed an intensive 2-month full-stack internship at KICS, building university web portals, conversational products, and backend integrations across 4 major production projects:",
      highlights: [
        "Built the UET OCW (OpenCourseWare) portal with role-based access for Super Admins, Instructors, and Students to distribute courseware and lectures.",
        "Engineered an AI Chatbot product featuring Super Admin, Admin, and User tiers, live token usage metering, and custom API key configuration.",
        "Developed an end-to-end University Admission Management System automating applicant intake, document verification, and status tracking.",
        "Integrated the UET Health Sciences platform connecting a Next.js frontend with Laravel REST backend services."
      ],
      skills: ["Next.js", "React.js", "Laravel", "Node.js", "PostgreSQL", "REST APIs", "Docker", "Git"]
    },
    {
      index: "02",
      title: "Web Development Intern",
      company: "Bano Qabil",
      location: "Remote",
      duration: "2025",
      type: "Web Engineering Internship",
      description: "Built responsive single-page web applications, reusable UI components, and API integrations using React and modern JavaScript.",
      highlights: [
        "Developed responsive user interfaces with React.js and modern CSS.",
        "Implemented client-side routing, state management, and asynchronous data fetching.",
        "Participated in code reviews and built modular, accessible components."
      ],
      skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3", "Git"]
    }
  ],

  // Certifications
  certifications: [
    {
      title: "IBM Backend Development Specialization",
      issuer: "IBM",
      date: "2024",
      image: "/assets/certificates/ibm-backend.png",
      verifyUrl: "#"
    },
    {
      title: "Advanced React & Frontend Architecture",
      issuer: "Meta",
      date: "2024",
      image: "/assets/certificates/meta-react.png",
      verifyUrl: "#"
    },
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "/assets/certificates/aws.png",
      verifyUrl: "#"
    },
    {
      title: "IBM Applied DevOps Engineering",
      issuer: "IBM",
      date: "2024",
      image: "/assets/certificates/ibm-devops.png",
      verifyUrl: "#"
    },
    {
      title: "Full Stack MERN Developer Certificate",
      issuer: "Certificate",
      date: "2024",
      image: "/assets/certificates/mern.png",
      verifyUrl: "#"
    }
  ]
};

export default portfolioConfig;
