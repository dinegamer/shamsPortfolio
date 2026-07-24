import type { Locale } from '@/i18n';

export const siteUrl = 'https://shamsi-dev.vercel.app';
export const linkedInUrl =
  'https://www.linkedin.com/in/chamsoudine-thienta-146b21183';
export const githubUrl = 'https://github.com/dinegamer';

export const projectSlugs = [
  'kalansup',
  'digital-queue',
  'agritech-mali',
  'storesup'
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

type ProjectContent = {
  name: string;
  eyebrow: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  features: string[];
  technologies: string[];
  constraints?: string[];
  status: string;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  github?: string;
  seoTitle: string;
  seoDescription: string;
};

type LocaleContent = {
  navigation: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    backToProjects: string;
    otherProjects: string;
    github: string;
    linkedIn: string;
    email: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: Array<{ title: string; body: string }>;
    trajectoryTitle: string;
    trajectory: string[];
    seoTitle: string;
    seoDescription: string;
  };
  projectLabels: {
    problem: string;
    solution: string;
    role: string;
    features: string;
    technologies: string;
    constraints: string;
    status: string;
    image: string;
    ctaTitle: string;
    ctaBody: string;
  };
  projects: Record<ProjectSlug, ProjectContent>;
};

export const portfolioContent: Record<Locale, LocaleContent> = {
  fr: {
    navigation: {
      home: 'Accueil',
      projects: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      backToProjects: 'Retour aux projets',
      otherProjects: 'Découvrir les autres projets',
      github: 'Voir GitHub',
      linkedIn: 'Échanger sur LinkedIn',
      email: 'Me contacter'
    },
    about: {
      eyebrow: 'À propos',
      title: 'Chamsoudine THIENTA, aussi appelé Shams.',
      intro:
        'Software Engineer & Data Analyst basé à Bamako, je conçois des logiciels, des systèmes backend, des API, des bases de données et des outils d’analyse adaptés à des contextes opérationnels concrets.',
      sections: [
        {
          title: 'Construire pour le terrain',
          body:
            'Je m’intéresse aux solutions utiles dans des environnements où les connexions peuvent être instables, les équipements modestes et les processus encore largement manuels. Mon travail cherche à relier qualité technique, simplicité d’usage et compréhension du métier.'
        },
        {
          title: 'SH☀MSI Digital',
          body:
            'SH☀MSI Digital est ma marque et mon studio pour les activités liées au logiciel, aux données et à l’intelligence artificielle. J’y développe des projets personnels, des prototypes et des solutions numériques sans présenter KalanSUP comme une entreprise distincte.'
        },
        {
          title: 'Transmission',
          body:
            'J’enseigne également le développement logiciel, les bases de données, MERISE et l’architecture informatique. Cette pratique pédagogique nourrit une approche structurée de la conception et de la documentation.'
        }
      ],
      trajectoryTitle: 'Une trajectoire vers le Data Engineering',
      trajectory: [
        'Consolider les fondations en modélisation, SQL et systèmes de données.',
        'Approfondir progressivement les pipelines, l’automatisation et la qualité des données.',
        'Rester ancré dans la livraison logicielle et l’analyse de données pendant cette évolution.'
      ],
      seoTitle:
        'À propos de Chamsoudine THIENTA — Shams | Ingénieur logiciel & Data Analyst',
      seoDescription:
        'Découvrez Chamsoudine THIENTA, Shams, Software Engineer & Data Analyst à Bamako et fondateur de Shamsi Digital.'
    },
    projectLabels: {
      problem: 'Problème traité',
      solution: 'Solution développée',
      role: 'Rôle de Chamsoudine',
      features: 'Fonctionnalités principales',
      technologies: 'Architecture et technologies',
      constraints: 'Contraintes prises en compte',
      status: 'Statut réel',
      image: 'Capture existante',
      ctaTitle: 'Parlons de votre contexte',
      ctaBody:
        'Vous travaillez sur un logiciel métier, une API ou un système de données ? Échangeons sur le besoin réel.'
    },
    projects: {
      kalansup: {
        name: 'KalanSUP',
        eyebrow: 'Gestion académique',
        summary:
          'Un projet de logiciel de gestion scolaire et universitaire qui rassemble les opérations académiques dans un même système.',
        problem:
          'Les inscriptions, paiements, emplois du temps, notes et documents sont souvent répartis entre plusieurs outils ou traitements manuels.',
        solution:
          'KalanSUP structure ces flux dans une application métier avec un backend, une base de données et des interfaces adaptées au suivi académique.',
        role:
          'Conception du produit, modélisation des données et développement des modules applicatifs.',
        features: [
          'Inscriptions et dossiers étudiants',
          'Suivi des scolarités et des paiements',
          'Notes, résultats, relevés et bulletins',
          'Emplois du temps et documents académiques',
          'Tableaux de bord et portails par profil'
        ],
        technologies: ['React', 'Spring Boot', 'PostgreSQL'],
        constraints: [
          'Réunir des processus académiques interdépendants sans complexifier les parcours.',
          'Garder une structure de données cohérente entre les différents modules.'
        ],
        status:
          'Produit en développement. Aucun établissement client ni déploiement public n’est revendiqué.',
        seoTitle: 'KalanSUP — ERP de gestion scolaire | Chamsoudine THIENTA',
        seoDescription:
          'KalanSUP est le projet de gestion scolaire et universitaire conçu par Chamsoudine THIENTA avec React, Spring Boot et PostgreSQL.'
      },
      'digital-queue': {
        name: 'File d’attente numérique',
        eyebrow: 'Prototype de gestion de file',
        summary:
          'Un prototype web pour suivre les files, les agences, les agents et les indicateurs de service en temps réel.',
        problem:
          'L’attente physique manque souvent de visibilité pour les visiteurs comme pour les équipes chargées de l’accueil.',
        solution:
          'Le prototype explore un pilotage centralisé des files avec des vues d’attente, des agences actives et des indicateurs opérationnels.',
        role:
          'Conception du prototype, architecture applicative et développement des interfaces de suivi.',
        features: [
          'Suivi des files en temps réel',
          'Vue des agences et des agents',
          'Indicateurs de temps d’attente et de service',
          'Interface accessible depuis un navigateur'
        ],
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.IO'],
        constraints: [
          'Rendre l’état de la file lisible rapidement pour les équipes.',
          'Prévoir des interactions temps réel sans présenter le prototype comme un service déployé.'
        ],
        status:
          'Prototype fonctionnel de démonstration. Aucune banque, clinique ou organisation utilisatrice n’est revendiquée.',
        image: {
          src: '/projects/bnda-queue.png',
          alt: 'Tableau de bord du prototype de file d’attente numérique',
          caption:
            'Capture existante du tableau de bord de suivi des files, agences et agents.'
        },
        seoTitle:
          'File d’attente numérique | Projet de Chamsoudine THIENTA',
        seoDescription:
          'Découvrez le prototype de file d’attente numérique conçu par Chamsoudine THIENTA pour visualiser files, agences et indicateurs de service.'
      },
      'agritech-mali': {
        name: 'AgritechMali',
        eyebrow: 'Agriculture et intelligence artificielle',
        summary:
          'Une expérimentation qui explore l’usage de l’intelligence artificielle pour accompagner certaines décisions agricoles.',
        problem:
          'Le choix des cultures et l’identification de maladies végétales peuvent nécessiter des informations difficiles à mobiliser rapidement.',
        solution:
          'AgritechMali expérimente des parcours de recommandation de cultures et de reconnaissance de maladies des plantes dans une interface orientée agriculture.',
        role:
          'Conception de l’expérience, intégration des parcours assistés par IA et développement de l’interface.',
        features: [
          'Recommandation de cultures',
          'Analyse de paramètres agricoles',
          'Reconnaissance de maladies des plantes',
          'Interface orientée vers les usages agricoles'
        ],
        technologies: ['Python', 'Intelligence artificielle', 'React'],
        constraints: [
          'Ne pas présenter les recommandations comme un diagnostic scientifique garanti.',
          'Rendre les résultats compréhensibles sans annoncer de précision non mesurée.'
        ],
        status:
          'Projet expérimental. Aucun niveau de précision scientifique ni déploiement opérationnel n’est revendiqué.',
        image: {
          src: '/projects/agritech.png',
          alt: 'Capture existante de l’interface AgritechMali',
          caption: 'Capture existante du parcours AgritechMali.'
        },
        seoTitle:
          'AgritechMali — IA appliquée à l’agriculture | Chamsoudine THIENTA',
        seoDescription:
          'AgritechMali est une expérimentation de Chamsoudine THIENTA autour de la recommandation de cultures et des maladies des plantes.'
      },
      storesup: {
        name: 'StoreSup',
        eyebrow: 'Stock et opérations',
        summary:
          'Une application full-stack MERN pour organiser les stocks, matériels, catégories, commandes et utilisateurs.',
        problem:
          'Le suivi quotidien des stocks et opérations devient difficile lorsque les données sont dispersées entre documents et traitements manuels.',
        solution:
          'StoreSup relie une interface React à une API REST Express et à des modèles MongoDB pour centraliser les opérations.',
        role:
          'Développement full-stack de l’application, de ses modèles de données, API et interfaces.',
        features: [
          'Gestion des stocks, matériels et catégories',
          'Commandes et opérations',
          'Gestion des utilisateurs',
          'Authentification JWT',
          'Statistiques et génération de documents'
        ],
        technologies: [
          'MongoDB',
          'Express',
          'React',
          'Node.js',
          'Socket.IO',
          'JWT'
        ],
        constraints: [
          'Structurer plusieurs familles d’opérations dans une même application.',
          'Protéger les accès authentifiés et garder les secrets hors du dépôt.'
        ],
        status:
          'Projet applicatif avec dépôt public. Aucune utilisation commerciale ou organisation cliente n’est revendiquée.',
        github: 'https://github.com/dinegamer/hackhaton_dev_frontEnd2',
        seoTitle:
          'StoreSup — Application MERN de gestion de stock | Chamsoudine THIENTA',
        seoDescription:
          'StoreSup est une application MERN de gestion de stock et d’opérations développée par Chamsoudine THIENTA.'
      }
    }
  },
  en: {
    navigation: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      backToProjects: 'Back to projects',
      otherProjects: 'Explore other projects',
      github: 'View on GitHub',
      linkedIn: 'Connect on LinkedIn',
      email: 'Contact me'
    },
    about: {
      eyebrow: 'About',
      title: 'Chamsoudine THIENTA, also known as Shams.',
      intro:
        'I am a Software Engineer & Data Analyst based in Bamako, designing software, backend systems, APIs, databases and analytics tools for practical operating environments.',
      sections: [
        {
          title: 'Building for real conditions',
          body:
            'I am interested in useful systems for environments where connectivity can be unstable, devices modest and processes still largely manual. My work connects engineering quality, usability and a clear understanding of operations.'
        },
        {
          title: 'SH☀MSI Digital',
          body:
            'SH☀MSI Digital is my brand and studio for software, data and artificial intelligence work. It is where I develop personal projects, prototypes and digital solutions; KalanSUP remains one of my projects, not a separate company.'
        },
        {
          title: 'Teaching',
          body:
            'I also teach software development, databases, MERISE and computer architecture. Teaching reinforces a structured approach to system design and documentation.'
        }
      ],
      trajectoryTitle: 'A gradual path toward Data Engineering',
      trajectory: [
        'Strengthen foundations in data modeling, SQL and data systems.',
        'Progressively deepen pipeline, automation and data-quality skills.',
        'Stay grounded in software delivery and data analytics throughout that progression.'
      ],
      seoTitle:
        'About Chamsoudine THIENTA — Shams | Software Engineer & Data Analyst',
      seoDescription:
        'Learn about Chamsoudine THIENTA, Shams, a Software Engineer & Data Analyst in Bamako and founder of Shamsi Digital.'
    },
    projectLabels: {
      problem: 'Problem',
      solution: 'Solution',
      role: "Chamsoudine's role",
      features: 'Main features',
      technologies: 'Architecture and technologies',
      constraints: 'Constraints considered',
      status: 'Current status',
      image: 'Existing screenshot',
      ctaTitle: 'Let’s discuss your operating context',
      ctaBody:
        'Working on business software, an API or a data system? Let’s start with the actual need.'
    },
    projects: {
      kalansup: {
        name: 'KalanSUP',
        eyebrow: 'Academic management',
        summary:
          'A school and university management software project that brings academic operations into one system.',
        problem:
          'Admissions, payments, timetables, grades and documents are often spread across disconnected tools or manual processes.',
        solution:
          'KalanSUP structures these workflows in a business application with a backend, database and interfaces for academic operations.',
        role:
          'Product design, data modeling and development of the application modules.',
        features: [
          'Student admissions and records',
          'Tuition and payment tracking',
          'Grades, results, transcripts and report cards',
          'Timetables and academic documents',
          'Dashboards and role-based portals'
        ],
        technologies: ['React', 'Spring Boot', 'PostgreSQL'],
        constraints: [
          'Connect interdependent academic processes without making user journeys harder.',
          'Keep data consistent across the different modules.'
        ],
        status:
          'Product in development. No client institution or public deployment is claimed.',
        seoTitle: 'KalanSUP — School Management ERP | Chamsoudine THIENTA',
        seoDescription:
          'KalanSUP is a school and university management project designed by Chamsoudine THIENTA with React, Spring Boot and PostgreSQL.'
      },
      'digital-queue': {
        name: 'Digital Queue Management',
        eyebrow: 'Queue-management prototype',
        summary:
          'A web prototype for monitoring queues, branches, agents and service indicators in real time.',
        problem:
          'Physical waiting often lacks visibility for both visitors and the teams managing reception and service.',
        solution:
          'The prototype explores centralized queue monitoring with waiting views, active branches and operational indicators.',
        role:
          'Prototype design, application architecture and development of the monitoring interfaces.',
        features: [
          'Real-time queue monitoring',
          'Branch and agent views',
          'Waiting-time and service indicators',
          'Browser-based interface'
        ],
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.IO'],
        constraints: [
          'Make queue status easy for service teams to scan.',
          'Explore real-time interaction without presenting the prototype as a deployed service.'
        ],
        status:
          'Functional demonstration prototype. No bank, clinic or organization is claimed as a user.',
        image: {
          src: '/projects/bnda-queue.png',
          alt: 'Digital queue management prototype dashboard',
          caption:
            'Existing screenshot of the dashboard for monitoring queues, branches and agents.'
        },
        seoTitle: 'Digital Queue Management | Chamsoudine THIENTA',
        seoDescription:
          'Explore the digital queue-management prototype designed by Chamsoudine THIENTA for queue, branch and service monitoring.'
      },
      'agritech-mali': {
        name: 'AgritechMali',
        eyebrow: 'Agriculture and artificial intelligence',
        summary:
          'An experiment exploring how artificial intelligence can support selected agricultural decisions.',
        problem:
          'Crop selection and plant-disease identification can depend on information that is difficult to access quickly.',
        solution:
          'AgritechMali experiments with crop-recommendation and plant-disease recognition flows in an agriculture-focused interface.',
        role:
          'Experience design, integration of AI-assisted flows and interface development.',
        features: [
          'Crop recommendation',
          'Agricultural parameter analysis',
          'Plant-disease recognition',
          'Agriculture-focused interface'
        ],
        technologies: ['Python', 'Artificial intelligence', 'React'],
        constraints: [
          'Avoid presenting recommendations as guaranteed scientific diagnoses.',
          'Make results understandable without claiming unmeasured accuracy.'
        ],
        status:
          'Experimental project. No scientific accuracy level or operational deployment is claimed.',
        image: {
          src: '/projects/agritech.png',
          alt: 'Existing AgritechMali interface screenshot',
          caption: 'Existing screenshot of the AgritechMali experience.'
        },
        seoTitle:
          'AgritechMali — AI for Agriculture | Chamsoudine THIENTA',
        seoDescription:
          'AgritechMali is an experiment by Chamsoudine THIENTA around crop recommendation and plant-disease recognition.'
      },
      storesup: {
        name: 'StoreSup',
        eyebrow: 'Inventory and operations',
        summary:
          'A full-stack MERN application for organizing inventory, materials, categories, orders and users.',
        problem:
          'Daily inventory and operations become hard to track when data is scattered across documents and manual processes.',
        solution:
          'StoreSup connects a React interface to an Express REST API and MongoDB models to centralize operations.',
        role:
          'Full-stack development of the application, including its data models, APIs and interfaces.',
        features: [
          'Inventory, material and category management',
          'Orders and operations',
          'User management',
          'JWT authentication',
          'Statistics and document generation'
        ],
        technologies: [
          'MongoDB',
          'Express',
          'React',
          'Node.js',
          'Socket.IO',
          'JWT'
        ],
        constraints: [
          'Structure several operational areas in a single application.',
          'Protect authenticated access and keep secrets out of the repository.'
        ],
        status:
          'Application project with a public repository. No commercial use or client organization is claimed.',
        github: 'https://github.com/dinegamer/hackhaton_dev_frontEnd2',
        seoTitle:
          'StoreSup — MERN Inventory Management | Chamsoudine THIENTA',
        seoDescription:
          'StoreSup is a MERN inventory and operations management application developed by Chamsoudine THIENTA.'
      }
    }
  }
};

export function isProjectSlug(value: string): value is ProjectSlug {
  return projectSlugs.includes(value as ProjectSlug);
}
