import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  User,
  Send,
  Phone,
  MessageSquare,
  Home,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
// import useMailtoFallback from "./hooks/useMailtoFallback";
import FormspreeContactForm from "./components/FormspreeContactForm";
// import ParticlesBackground from "./components/ParticlesBackground";
import AnimateOnScroll from "./components/AnimateOnScroll";
// import AnimatedText from "./components/AnimatedText";
import TiltCard from "./components/TiltCard";

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-blue-400 font-medium"
        >
          Loading Portfolio...
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <TiltCard
      className="overflow-hidden rounded-lg shadow-lg h-full"
      tiltAmount={5}
      glareOpacity={0.1}
      perspective={1200}
    >
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/30 transition-all duration-500 border border-gray-700 hover:border-blue-500/50 h-full flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
      >
        <div className="relative overflow-hidden group">
          <div className="bg-blue-500/20 h-16 flex items-center justify-center">
            <div className="h-1 w-36 bg-blue-500/40 rounded-full mb-2"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
          <motion.div
            className="absolute bottom-0 left-0 p-4 w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
          </motion.div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-gray-300 flex-grow">{description}</p>
          <div className="mt-6 flex justify-end">
            <motion.button
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Details</span>
              <ExternalLink size={16} className="ml-2" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

// Skill category component
interface SkillCategory {
  category: string;
  skills: Array<{ name: string; icon: string }>;
  icon: string;
  color: string;
}

function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimateOnScroll animation="slideUp" delay={index * 0.1} className="h-full">
      <motion.div
        className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-500 h-full shadow-lg hover:shadow-blue-500/10"
        whileHover={{
          y: -8,
          boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.2)",
          borderColor: "rgba(59, 130, 246, 0.5)",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex items-start mb-5">
          <motion.div
            className={`w-12 h-12 mr-4 ${category.color} rounded-lg p-2 flex items-center justify-center flex-shrink-0`}
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1,
              boxShadow: isHovered
                ? "0 0 15px rgba(59, 130, 246, 0.5)"
                : "none",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src={category.icon}
              alt={`${category.category} icon`}
              className="max-w-full max-h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://ui-avatars.com/api/?name=${
                  category.category.split(" ")[0]
                }&background=3B82F6&color=fff&size=128`;
              }}
            />
          </motion.div>
          <div>
            <motion.h3
              className="text-xl font-bold text-white mb-1"
              animate={{
                color: isHovered ? "#93c5fd" : "#ffffff",
              }}
              transition={{ duration: 0.3 }}
            >
              {category.category}
            </motion.h3>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{
                width: isHovered ? "80px" : "50px",
              }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {category.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center bg-gray-900/50 rounded-lg p-3 hover:bg-gray-900 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i + index * 0.05 }}
                whileHover={{
                  y: -3,
                  scale: 1.05,
                  backgroundColor: "rgba(30, 41, 59, 0.9)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  <img
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${skill.name}&background=3B82F6&color=fff&size=128`;
                    }}
                  />
                </div>
                <span className="text-gray-300 text-xs font-medium text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimateOnScroll>
  );
}

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
      <div className="absolute w-full h-full">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full"
            style={{
              width: Math.random() * 6 + 1,
              height: Math.random() * 6 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 8 + 7,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface CertificationProps {
  title: string;
  issuer: string;
  bgColor: string;
  icon?: string;
  delay?: number;
}

function CertificationCard({
  title,
  issuer,
  bgColor,
  icon,
  delay = 0,
}: CertificationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard className="h-full" tiltAmount={8}>
      <motion.div
        className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-500 border border-gray-700 hover:border-blue-500/50 relative h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className={`h-2 w-full ${bgColor.replace("/20", "")}`}></div>
        <div className="p-6 text-center">
          <motion.div
            className={`${bgColor} rounded-xl w-20 h-20 p-4 flex items-center justify-center mx-auto mb-6 shadow-lg`}
            animate={{
              y: isHovered ? -8 : 0,
              scale: isHovered ? 1.1 : 1,
              boxShadow: isHovered
                ? "0 10px 25px rgba(59, 130, 246, 0.3)"
                : "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {icon ? (
              <img
                src={icon}
                alt={`${issuer} icon`}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://ui-avatars.com/api/?name=${issuer}&background=3B82F6&color=fff&size=128`;
                }}
              />
            ) : (
              <div className="w-10 h-10 bg-blue-500/40 rounded-md"></div>
            )}
          </motion.div>
          <motion.h3
            className="text-lg font-bold text-white"
            animate={{
              y: isHovered ? -3 : 0,
              color: isHovered ? "#93c5fd" : "#ffffff",
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-blue-400 text-sm mt-2"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {issuer}
          </motion.p>

          <motion.div
            className="mt-6 w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-3"></div>
            <div className="flex justify-center space-x-2">
              <motion.button
                className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-1 px-3 rounded-full flex items-center"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View</span>
                <ExternalLink size={12} className="ml-1" />
              </motion.button>
              <motion.button
                className="text-xs bg-gray-700/80 hover:bg-gray-700 text-gray-300 py-1 px-3 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Verify
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize EmailJS
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const certifications = [
    {
      title: "AWS Cloud Essentials",
      issuer: "Amazon Web Services",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-yellow-500/20",
      icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
    },
    {
      title: "Oracle Cloud Foundations Associate",
      issuer: "Oracle",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      icon: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
    },
    {
      title: "Oracle Integration Cloud Professional",
      issuer: "Oracle",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      icon: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
    },
    {
      title: "LangChain Academy",
      issuer: "LangChain",
      bgColor: "bg-gradient-to-br from-green-500/20 to-blue-500/20",
      icon: "https://python.langchain.com/img/brand/wordmark.png",
    },
  ];

  const projects = [
    {
      title: "Real-Time Workout Tracker",
      description:
        "JavaScript, MongoDB, React, Express, Node.js | Engineered a MERN stack workout tracker with real-time activity logging and CRUD operations, delivering 98% API uptime and supporting concurrent user sessions without latency degradation. Optimized MongoDB queries, boosting database performance by 25%.",
    },
    {
      title: "Student Registration App",
      description:
        "Java, SpringBoot, Oracle DB, React, JDBC | Co-developed a full-stack Student Registration System with Spring Boot and React, improving application scalability and UI/UX efficiency by 85%. Increased API throughput by 26.7% using Spring Data JPA with Hibernate and HikariCP.",
    },
    {
      title: "LMS Quiz Generator",
      description:
        "Python, Django, PostgreSQL, HTML, CSS | Built a Django-based quiz management platform with PostgreSQL, enabling real-time quiz generation, auto-grading, and role-based access control. Achieved 95% test coverage with robust validation and error handling across the platform.",
    },
  ];

  const skills = [
    {
      category: "Programming Languages",
      skills: [
        {
          name: "Java",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
        {
          name: "Kotlin",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        },
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
        {
          name: "C",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        },
        {
          name: "C++",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "SQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "HTML",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
        {
          name: "CSS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "bg-blue-500/20",
    },
    {
      category: "Development Tools & Software",
      skills: [
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "VS Code",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        },
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        },
        {
          name: "Postman",
          icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        },
        {
          name: "Spring MVC",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
        {
          name: "Apache Camel",
          icon: "https://www.vectorlogo.zone/logos/apache_camel/apache_camel-icon.svg",
        },
        {
          name: "Kubernetes",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        },
        {
          name: "Jenkins",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        },
        {
          name: "Android Studio",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "bg-green-500/20",
    },
    {
      category: "Frameworks & Technologies",
      skills: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        },
        {
          name: "Django",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        },
        {
          name: "Flask",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
        },
        {
          name: "Spring Boot",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
        {
          name: "Hibernate",
          icon: "https://www.vectorlogo.zone/logos/hibernate/hibernate-icon.svg",
        },
        {
          name: "J2EE",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "bg-purple-500/20",
    },
    {
      category: "Databases",
      skills: [
        {
          name: "PostgreSQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MongoDB",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Oracle DB",
          icon: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
        },
        {
          name: "MySQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "Firebase",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        },
        {
          name: "DynamoDB",
          icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "bg-red-500/20",
    },
    {
      category: "Cloud Platforms",
      skills: [
        {
          name: "AWS",
          icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        },
        {
          name: "Azure",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        },
        {
          name: "Oracle Cloud",
          icon: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
        },
        {
          name: "Google Cloud",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        },
        {
          name: "AWS Lambda",
          icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        },
        {
          name: "AWS RDS",
          icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        },
      ],
      icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
      color: "bg-yellow-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Hero Section */}
      <motion.header
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 animate-gradient-x"></div>
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-500 opacity-50"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 30 - 15],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 5 + 5,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Varada Jethreswar
          </motion.h1>
          <motion.h2
            className="text-2xl text-blue-400 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Software Development Engineer | Full-Stack & Cloud Expert | AI/ML &
            Data Science
          </motion.h2>
          <motion.p
            className="text-xl mb-6 text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Software Development Engineer with 3+ years of professional
            experience at DXC Technology and expertise in building scalable,
            secure, and cloud-native applications. Proven track record of
            enhancing backend performance by 76%, improving CI/CD efficiency by
            65%, and optimizing database operations by 35%.
          </motion.p>
          <motion.div
            className="flex space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="https://github.com/Jethreswar"
              className="text-gray-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/jethreswar-varada-878281370/"
              className="text-gray-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:jvarada@binghamton.edu"
              className="text-gray-400 hover:text-white transition-colors"
              title="Email"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
      </motion.header>

      {/* Projects Section */}
      <section className="py-20 bg-gray-800 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} delay={0.2 * index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-900 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 max-w-2xl mx-auto">
              Proficient in full-stack development with Java, Kotlin, Python,
              and JavaScript. Expert in frameworks like Spring Boot, React,
              Django, and Flask. Experienced with cloud platforms (AWS, Azure,
              Oracle Cloud), databases (PostgreSQL, MongoDB, Oracle), and modern
              DevOps practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((category, index) => (
              <SkillCategoryCard
                key={category.category}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-800 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional Experience
          </motion.h2>
          <div className="space-y-10">
            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    DXC Technology
                  </h3>
                  <p className="text-blue-400">
                    Associate Professional Software Engineer
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">January 2020 – June 2023</p>
                  <p className="text-gray-400">Bangalore, India</p>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Scaled the UAE Ministry of Finance's e-Dirham platform to 50K+
                  monthly transactions, improving backend performance by 76.8%
                  through service orchestration.
                </li>
                <li>
                  Developed e-Dirham PoS microservices with Oracle SOA Suite,
                  boosting CI/CD efficiency by 65.4% using Git, Jenkins, and
                  Docker.
                </li>
                <li>
                  Integrated UAE MoF's payment APIs with six national banks via
                  Oracle ESB, enabling real-time monitoring with ELK and Grafana
                  and boosting uptime by 82.5%.
                </li>
                <li>
                  Strengthened the 2K+ UAE's federal PoS payments API gateway
                  security with OAuth2/JWT authentication, OWASP input
                  validation, and API encryption, eliminating prior
                  vulnerabilities.
                </li>
                <li>
                  Architected Maruti Suzuki's DMS 2.0 with SpringBoot MVC and
                  Apache Camel, enabling real-time inventory and sales
                  management across 1,200+ dealerships and reducing stored
                  procedure query latency by 35%.
                </li>
                <li>
                  Designed VersaFleet systems integration with SAP and Oracle
                  EBS via Oracle Integration Cloud using REST/SOAP APIs,
                  enabling real-time data exchange and reducing manual
                  processing time by 70%.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Smart Cookie Rewards Pvt. Ltd
                  </h3>
                  <p className="text-blue-400">Data Scientist Intern</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">
                    September 2024 – December 2024
                  </p>
                  <p className="text-gray-400">Livingston, NJ, USA</p>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Engineered a multi-format resume parsing pipeline with spaCy,
                  NLTK, and Gemini API, achieving 95% parsing accuracy across
                  PDFs, DOCX, and TXT files.
                </li>
                <li>
                  Developed custom NER models for skill and entity extraction,
                  improving classification accuracy by 30% and enabling
                  automated profiling of 500+ resumes weekly.
                </li>
                <li>
                  Enhanced job-matching and experience scoring algorithms,
                  reducing runtime by 40% while improving match precision for
                  candidate-role alignment.
                </li>
                <li>
                  Deployed a secure AWS RDS–backed data pipeline with
                  interactive Streamlit dashboards, scaling analytics to 5,000+
                  resumes/month with role-based access control.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Binghamton University
                  </h3>
                  <p className="text-blue-400">Research Intern</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">August 2025 – October 2025</p>
                  <p className="text-gray-400">Binghamton, NY, USA</p>
                </div>
              </div>
              <p className="text-sm text-blue-300 mb-3">
                Tech Stack: Android Studio, Java, Kotlin, Firebase, GCP
              </p>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Engineered a Jetpack Compose Android app in Kotlin with
                  Firebase backend, enabling habit tracking, craving management,
                  and AI-powered support while maintaining a 92% crash-free rate
                  across 1,000+ sessions.
                </li>
                <li>
                  Integrated Firebase Auth, Firestore, Storage, and Cloud
                  Functions to deliver real-time sync, notifications, and secure
                  data handling, boosting daily active usage by 63%.
                </li>
                <li>
                  Modularized app architecture using MVVM + Repository pattern,
                  optimizing lifecycle management and reducing cold start time
                  by 35%, which improved user retention by 28%.
                </li>
                <li>
                  Designed data visualization dashboards with charts for
                  progress tracking and implemented leaderboards & community
                  chat, driving a 40% increase in engagement.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gray-900 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>
          <div className="space-y-10">
            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Binghamton University, State University of New York
                  </h3>
                  <p className="text-blue-400">
                    Master of Science in Information Systems
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Graduated May 2025</p>
                  <p className="text-gray-400">Binghamton, NY, USA</p>
                </div>
              </div>
              <p className="text-white font-medium">
                Thomas J. Watson College of Engineering and Applied Science
              </p>
              <p className="text-blue-300 font-medium mt-1">
                Cumulative GPA: 3.58/4.00
              </p>
              <p className="text-gray-400 mt-2">
                Relevant Coursework: Database Systems, Web and Database
                Security, LLM Foundations & Applications, Applied Machine
                Learning, Tools for Data Science, Web Information Retrieval and
                Search, Software Project Management.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    GITAM University
                  </h3>
                  <p className="text-blue-400">
                    Bachelor of Technology in Electronics and Communication
                    Engineering
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">June 2016 – July 2020</p>
                  <p className="text-gray-400">Visakhapatnam, AP, India</p>
                </div>
              </div>
              <p className="text-blue-300 font-medium mt-1">
                Cumulative GPA: 3.45/4.00
              </p>
              <p className="text-gray-400 mt-2">
                Relevant Coursework: Programming with C, Object-Oriented
                Programming with C++, Database Management Systems, Data
                Structures and Algorithms, Computer Networks, Microprocessors
                and Interfaces.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Experience Section */}
      <section className="py-20 bg-gray-800 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Leadership Experience
          </motion.h2>
          <div className="space-y-10">
            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Binghamton University Dining Services (BUDS)
                  </h3>
                  <p className="text-blue-400">Student Lead</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">August 2024 – May 2025</p>
                  <p className="text-gray-400">Binghamton, NY, USA</p>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Coordinated daily operations with a team of 15+ student
                  employees, assigning roles and ensuring smooth collaboration
                  during high-volume service hours.
                </li>
                <li>
                  Mentored and trained new student staff on service protocols,
                  boosting onboarding efficiency and reducing training time by
                  20%.
                </li>
                <li>
                  Supported event planning for university functions by managing
                  student schedules, monitoring task completion, and maintaining
                  consistent service quality.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-800 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Certifications
          </motion.h2>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 max-w-2xl mx-auto">
              Professional Oracle cloud certifications demonstrating expertise
              in cloud infrastructure and integration services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.title}
                title={cert.title}
                issuer={cert.issuer}
                bgColor={cert.bgColor}
                icon={cert.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section className="py-20 bg-gray-900 relative" id="contact">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact Me
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-gray-800 rounded-lg p-5 md:p-7 shadow-lg border border-gray-700 h-full flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-5">
                  Get In Touch
                </h3>

                <div className="space-y-5 flex-grow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                      <Mail className="text-blue-400" size={20} />
                    </div>
                    <div className="ml-4 max-w-full overflow-hidden">
                      <h4 className="text-sm font-medium text-gray-300">
                        Email
                      </h4>
                      <a
                        href="mailto:jvarada@binghamton.edu"
                        className="text-white hover:text-blue-400 transition-colors break-all text-sm md:text-base"
                      >
                        jvarada@binghamton.edu
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                      <Phone className="text-blue-400" size={20} />
                    </div>
                    <div className="ml-4 max-w-full overflow-hidden">
                      <h4 className="text-sm font-medium text-gray-300">
                        Phone
                      </h4>
                      <p className="text-white text-sm md:text-base">
                        +1 (607) 595-8513
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                      <User className="text-blue-400" size={20} />
                    </div>
                    <div className="ml-4 max-w-full overflow-hidden">
                      <h4 className="text-sm font-medium text-gray-300">
                        Location
                      </h4>
                      <p className="text-white text-sm md:text-base">
                        Binghamton, NY
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-4">
                    Connect With Me
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/Jethreswar"
                      className="bg-gray-700 hover:bg-blue-600 transition-colors p-2 rounded-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jethreswar-varada-878281370/"
                      className="bg-gray-700 hover:bg-blue-600 transition-colors p-2 rounded-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <FormspreeContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Varada Jethreswar. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with React, TypeScript & Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
