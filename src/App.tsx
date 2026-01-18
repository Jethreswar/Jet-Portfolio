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
  link?: string;
}

function CertificationCard({
  title,
  issuer,
  bgColor,
  icon,
  delay = 0,
  link,
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
              {link && (
                <motion.a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-1 px-3 rounded-full flex items-center"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View</span>
                  <ExternalLink size={12} className="ml-1" />
                </motion.a>
              )}
              {link && (
                <motion.a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-gray-700/80 hover:bg-gray-700 text-gray-300 py-1 px-3 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Verify
                </motion.a>
              )}
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
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-yellow-500/20",
      icon: "https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
      link: "https://www.credly.com/badges/391ae2c1-e25e-41e2-a71e-597d4f8a83f9",
    },
    {
      title:
        "Oracle Cloud Platform Application Integration 2022 Certified Professional",
      issuer: "Oracle",
      bgColor: "bg-gradient-to-br from-red-500/20 to-orange-500/20",
      icon: "https://brm-workforce.oracle.com/pdf/certview/images/OCPAI2022CP.png",
      link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C43E1BF4E898BE5D2DB1E736CD03BA558DFBC7234B8AADA8972EAB8E8AD246D8",
    },
  ];

  const projects = [
    {
      title: "Cloud Banking Modernization Platform",
      description:
        "ReactJS, TypeScript, Spring Boot, Kafka, Azure | Engineered a cloud banking platform supporting high-volume deposit and payment processing with event-driven microservices, API gateways, and real-time dashboards. Implemented PCI-DSS compliant architectures with OAuth2/JWT security and zero-trust principles.",
    },
    {
      title: "Content Streaming & Billing Platform",
      description:
        "Angular, RxJS, NgRx, Spring Boot, AWS | Built secure, scalable platforms for content streaming, billing, and customer account services. Developed reusable UI components with state management, optimized MongoDB layers with Redis caching, and automated CI/CD pipelines with blue/green deployments.",
    },
    {
      title: "Global Retail & E-Commerce Platform",
      description:
        "ReactJS, Redux, Spring Boot, AWS, Kubernetes | Contributed to scalable digital retail platforms with real-time inventory synchronization and order-tracking workflows. Enhanced performance with code-splitting, lazy-loading, and Redis caching across global storefronts.",
    },
    {
      title: "Healthcare Clinical Workflow System",
      description:
        "Java, Spring MVC, PostgreSQL, Docker | Developed healthcare application modules with SOAP/REST APIs for patient engagement, appointment scheduling, and billing. Ensured HIPAA compliance with secure data layers and automated CI/CD pipelines.",
    },
  ];

  const skills = [
    {
      category: "Languages & Core Technologies",
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
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "HTML5",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
        {
          name: "CSS3/SCSS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
        {
          name: "SQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "GraphQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "bg-blue-500/20",
    },
    {
      category: "Frontend Frameworks & Libraries",
      skills: [
        {
          name: "ReactJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "Angular",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        },
        {
          name: "Redux",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        },
        {
          name: "Tailwind CSS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        },
        {
          name: "Bootstrap",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        },
        {
          name: "Vite",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
        },
        {
          name: "Webpack",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
        },
        {
          name: "RxJS/NgRx",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "bg-cyan-500/20",
    },
    {
      category: "Backend & Java Frameworks",
      skills: [
        {
          name: "Spring Boot",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
        {
          name: "Spring MVC",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
        {
          name: "Spring Security",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
        {
          name: "Hibernate ORM",
          icon: "https://www.vectorlogo.zone/logos/hibernate/hibernate-icon.svg",
        },
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        },
        {
          name: "NestJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
        },
        {
          name: "Project Reactor",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      color: "bg-green-500/20",
    },
    {
      category: "Databases & Caching",
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
          name: "MySQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "Redis",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        },
        {
          name: "Azure Cosmos DB",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        },
        {
          name: "DynamoDB",
          icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "bg-orange-500/20",
    },
    {
      category: "Cloud & DevOps",
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
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        },
        {
          name: "Kubernetes",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        },
        {
          name: "Terraform",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
        },
        {
          name: "OpenShift",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg",
        },
        {
          name: "Istio",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        },
        {
          name: "GCP",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        },
      ],
      icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
      color: "bg-yellow-500/20",
    },
    {
      category: "CI/CD & Messaging",
      skills: [
        {
          name: "Jenkins",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        },
        {
          name: "GitHub Actions",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        },
        {
          name: "Azure DevOps",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        },
        {
          name: "Kafka",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
        },
        {
          name: "RabbitMQ",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg",
        },
        {
          name: "SonarQube",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg",
        },
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "Maven/Gradle",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      color: "bg-purple-500/20",
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
            V. Jethreswar
          </motion.h1>
          <motion.h2
            className="text-2xl text-blue-400 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Lead Software Engineer | Full-Stack & Cloud Expert | Enterprise
            Solutions Architect
          </motion.h2>
          <motion.p
            className="text-xl mb-6 text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            7+ years of progressive experience designing, developing, and
            deploying secure, scalable enterprise-grade applications across
            Banking & Financial Services, Media Streaming, Retail, and
            Healthcare domains. Proven track record leading mission-critical
            initiatives with CI/CD automation and multi-cloud deployments on AWS
            and Microsoft Azure.
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
              href="mailto:varadajet78@gmail.com"
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
              Expert in full-stack development with Java, Kotlin, TypeScript,
              and JavaScript. Proficient in ReactJS, Angular, Spring Boot, and
              microservices architecture. Extensive experience with AWS, Azure,
              Kubernetes, and modern DevOps practices including CI/CD
              automation, event-driven systems, and cloud-native deployments.
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
                  <h3 className="text-xl font-bold text-white">Fiserv</h3>
                  <p className="text-blue-400">Lead Software Engineer</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">January 2025 – Present</p>
                  <p className="text-gray-400">Dallas, TX, USA</p>
                </div>
              </div>
              <p className="text-sm text-blue-300 mb-3">
                Cloud banking modernization platform for high-volume deposit and
                payment processing
              </p>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Designed and developed modern, data-driven front-end
                  dashboards using ReactJS and TypeScript for financial
                  operations, enabling analysts to track KPIs, alerts, and live
                  transaction insights.
                </li>
                <li>
                  Built reusable, modular UI components with Tailwind CSS, Radix
                  UI, and responsive design practices, ensuring consistent
                  rendering across browsers and devices.
                </li>
                <li>
                  Integrated real-time transaction data streams using WebSocket
                  connections with GraphQL Subscriptions for continuous
                  visualization of account activities and operational metrics.
                </li>
                <li>
                  Engineered high-performance backend microservices using
                  Kotlin, Java (Spring Boot, Spring Cloud), and Node.js
                  (Express.js, NestJS) for payment processing and event-driven
                  pipelines.
                </li>
                <li>
                  Implemented Spring Security, OAuth2, OpenID Connect, JWT, and
                  PASETO tokenization with zero-trust principles, ensuring
                  PCI-DSS v4 compliance.
                </li>
                <li>
                  Integrated Apache Kafka with Azure Event Hubs for high-volume,
                  low-latency event streams and fault-tolerant real-time data
                  ingestion across distributed microservices.
                </li>
                <li>
                  Managed scalable cloud-native deployments on Microsoft Azure
                  leveraging AKS, App Services, Azure SQL Database, Blob
                  Storage, and Application Insights.
                </li>
                <li>
                  Automated CI/CD pipelines using Azure DevOps, Jenkins, and
                  GitHub Actions with SonarQube, Checkmarx, and NexusIQ for
                  code-quality enforcement.
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
                  <h3 className="text-xl font-bold text-white">EchoStar</h3>
                  <p className="text-blue-400">Sr. Software Engineer</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">July 2024 – December 2024</p>
                  <p className="text-gray-400">Englewood, CO, USA</p>
                </div>
              </div>
              <p className="text-sm text-blue-300 mb-3">
                Secure, scalable platforms for content streaming, billing, and
                customer account services
              </p>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Designed and developed reusable Angular UI components with
                  RxJS and NgRx for state management, improving rendering speed
                  and delivering seamless viewing experiences.
                </li>
                <li>
                  Applied expertise in TypeScript, JavaScript, HTML5, and SCSS
                  to enforce modular architecture and improve maintainability of
                  enterprise-grade single-page applications.
                </li>
                <li>
                  Enhanced front-end performance with Angular CLI and Vite for
                  faster builds, implementing lazy-loading modules and OnPush
                  change-detection strategy.
                </li>
                <li>
                  Developed backend services with Spring Boot, implementing
                  Singleton, Factory, and DAO design patterns for clean
                  architecture across distributed microservices.
                </li>
                <li>
                  Optimized MongoDB data layers using Spring Data MongoDB and
                  Redis-based caching to increase query throughput and reduce
                  latency.
                </li>
                <li>
                  Deployed and managed cloud-native applications on AWS (EKS,
                  ECS Fargate, RDS, MongoDB Atlas, ElastiCache, SQS, SNS, API
                  Gateway, Lambda).
                </li>
                <li>
                  Mentored junior developers in Angular, Spring Boot, and DevOps
                  practices to improve coding standards and build stronger
                  engineering culture.
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
                  <h3 className="text-xl font-bold text-white">Decathlon</h3>
                  <p className="text-blue-400">Software Engineer</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">January 2021 – June 2023</p>
                  <p className="text-gray-400">Bangalore, KA, India</p>
                </div>
              </div>
              <p className="text-sm text-blue-300 mb-3">
                Scalable digital retail and e-commerce platforms with real-time
                inventory synchronization
              </p>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Developed responsive and modular ReactJS interfaces with
                  Redux-style state management for store operations, product
                  management, and customer order tracking.
                </li>
                <li>
                  Enhanced front-end performance with asynchronous rendering,
                  code-splitting, and lazy-loading techniques, reducing page
                  load times during high-traffic events.
                </li>
                <li>
                  Integrated real-time inventory tracking and order
                  synchronization modules ensuring instant updates on stock
                  availability and order fulfillment timelines.
                </li>
                <li>
                  Optimized MySQL database performance using Hibernate ORM,
                  refining schema design and applying batch processing for large
                  retail datasets.
                </li>
                <li>
                  Automated CI/CD pipelines using GitHub Actions and AWS
                  CodePipeline with continuous integration and standardized
                  deployments.
                </li>
                <li>
                  Deployed and maintained cloud-native services on AWS using
                  Elastic Beanstalk, EC2, RDS, S3, and SQS with fault-tolerant
                  architecture.
                </li>
                <li>
                  Containerized microservices using Docker and Kubernetes,
                  configuring autoscaling, rolling updates, and self-healing
                  strategies.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">HealthAsyst</h3>
                  <p className="text-blue-400">Associate Software Engineer</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">June 2017 – December 2020</p>
                  <p className="text-gray-400">Bangalore, KA, India</p>
                </div>
              </div>
              <p className="text-sm text-blue-300 mb-3">
                Healthcare application modules with clinical dashboards and
                backend systems for patient engagement
              </p>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Developed responsive JSP-based web forms with client-side
                  validations for patient intake, appointment scheduling, and
                  billing information.
                </li>
                <li>
                  Built reusable UI components using HTML, CSS, JavaScript, and
                  Bootstrap for consistent, cross-browser-compatible patient
                  portals.
                </li>
                <li>
                  Implemented backend workflows using Java with Spring MVC to
                  automate appointment scheduling, billing processing, and
                  medical record updates.
                </li>
                <li>
                  Developed SOAP-based web services using JAX-WS and JAXB for
                  secure communication with legacy hospital information and
                  insurance partners.
                </li>
                <li>
                  Built RESTful APIs for integration between patient portals,
                  EHR systems, and diagnostic modules enabling real-time
                  synchronization.
                </li>
                <li>
                  Optimized PostgreSQL operations with Hibernate ORM,
                  implementing indexing strategies to enhance retrieval speeds
                  for electronic health records.
                </li>
                <li>
                  Automated build and deployment pipelines using GitLab CI/CD
                  integrated with Nexus Repository and Sonatype IQ Server.
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
              className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-700"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Bachelor's / Master's Degree in Computer Science or Related
                    Field
                  </h3>
                  <p className="text-blue-400">
                    Software Engineering & Information Systems
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mt-2">
                Strong academic foundation in computer science, software
                engineering, and information systems with focus on enterprise
                application development, distributed systems, and cloud
                computing technologies.
              </p>
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
              Professional certifications demonstrating expertise in AWS cloud
              architecture and Oracle cloud application integration
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
                link={cert.link}
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
                        href="mailto:varadajet78@gmail.com"
                        className="text-white hover:text-blue-400 transition-colors break-all text-sm md:text-base"
                      >
                        varadajet78@gmail.com
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
                        +1 (607) 323-1064
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
                        Dallas, TX, USA
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
            © {new Date().getFullYear()} V. Jethreswar. All rights reserved.
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
