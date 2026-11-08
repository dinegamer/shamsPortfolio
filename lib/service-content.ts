import type { Locale } from '@/i18n';

export const serviceSlugs = [
  'consultant-informatique-bamako',
  'kalansup-universites',
  'kalanplus-ecoles',
  'smartcare-cliniques',
  'developpement-application-mali',
  'consultant-si-ong'
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

type ServicePage = {
  eyebrow: string;
  title: string;
  promise: string;
  audience: string;
  pains: string[];
  deliverables: string[];
  proof: string;
  firstStep: string;
  cta: string;
  seoTitle: string;
  seoDescription: string;
  starterPackage?: {
    title: string;
    scope: string;
    deliverables: string[];
    limits: string;
    preparation: string;
  };
};

const fr: Record<ServiceSlug, ServicePage> = {
  'consultant-informatique-bamako': {
    eyebrow: 'Missions de conseil et d’exécution',
    title: 'Un consultant informatique à Bamako capable de cadrer, construire et transmettre.',
    promise: 'J’interviens comme ingénieur systèmes d’information, développeur logiciel/web, Data Analyst et formateur : diagnostic, cahier des charges, automatisation, application, données, formation et support.',
    audience: 'PME, ONG, banques, assurances, mines, télécoms, cabinets, établissements, administrations et porteurs de projets au Mali ou à distance.',
    pains: ['Besoin métier difficile à traduire en solution technique', 'Application ou projet bloqué avant livraison', 'Données dispersées et reporting peu fiable', 'Équipe ayant besoin de formation ou de renfort ponctuel'],
    deliverables: ['Diagnostic SI court et recommandations priorisées', 'Cahier des charges, architecture, backlog et plan de recette', 'Développement ou reprise d’application, API et base de données', 'Nettoyage de données, SQL, tableau de bord et automatisation', 'Formation pratique et accompagnement des utilisateurs'],
    proof: 'Le portfolio documente des produits et prototypes logiciels, une réalisation web publique, des systèmes de données et une expérience d’enseignement universitaire depuis 2019. Chaque mission reste cadrée selon les compétences et preuves disponibles.',
    firstStep: 'Présentez le problème, les utilisateurs, le délai et le résultat attendu. Je propose ensuite un diagnostic, un lot pilote ou un devis adapté.',
    cta: 'Discuter d’une mission de conseil',
    seoTitle: 'Consultant informatique à Bamako | Chamsoudine THIENTA',
    seoDescription: 'Consultant informatique, ingénieur SI, développeur, Data Analyst et formateur à Bamako : audit, logiciel, automatisation, data et accompagnement.'
  },
  'kalansup-universites': {
    eyebrow: 'Universités et instituts supérieurs',
    title: 'Rendre la gestion universitaire traçable, du paiement au diplôme.',
    promise: 'KalanSUP relie inscriptions, paiements, séances, absences, notes, réclamations, documents et tableaux de direction dans une instance adaptée à chaque établissement.',
    audience: 'Directions générales, directions des études, scolarités, services financiers et responsables SI au Mali et en Afrique francophone.',
    pains: ['Informations dispersées entre papier, WhatsApp et fichiers Excel', 'Réclamations étudiantes difficiles à suivre jusqu’à la décision', 'Absences, notes, reliquats et documents sans historique partagé', 'Indicateurs de direction longs à consolider'],
    deliverables: ['Démonstration de 20 minutes sur données fictives', 'Diagnostic d’un processus académique précis', 'Pilote encadré avec périmètre, recette et formation', 'Déploiement et maintenance selon les besoins validés'],
    proof: 'Un parcours de démonstration a été testé de bout en bout : étudiant → scolarité → direction → décision et notification. Cette preuve n’est pas présentée comme un déploiement client.',
    firstStep: 'Commencer par une démonstration, puis sélectionner un seul processus mesurable pour un pilote payé.',
    cta: 'Demander la démonstration KalanSUP',
    seoTitle: 'Logiciel de gestion universitaire Mali & Guinée | KalanSUP',
    seoDescription: 'KalanSUP structure inscriptions, paiements, absences, notes, réclamations et documents des universités. Démonstration sur données fictives.'
  },
  'kalanplus-ecoles': {
    eyebrow: 'Écoles privées',
    title: 'Un suivi scolaire plus clair pour l’administration, les enseignants et les familles.',
    promise: 'Kalan+ vise à organiser le suivi pédagogique, l’assiduité, les devoirs et la communication autour de l’élève sans multiplier les fichiers et messages isolés.',
    audience: 'Fondateurs, promoteurs, directions, responsables pédagogiques et responsables informatiques d’écoles privées.',
    pains: ['Absences signalées tardivement', 'Suivi pédagogique réparti entre plusieurs canaux', 'Parents informés de manière irrégulière', 'Reporting difficile entre classes et niveaux'],
    deliverables: ['Entretien de diagnostic avec la direction', 'Cartographie du parcours élève–enseignant–administration–parent', 'Prototype ou pilote sur un périmètre validé', 'Formation et support après recette'],
    proof: 'L’offre est présentée comme un produit à cadrer et piloter, sans revendiquer d’établissement utilisateur ni de résultat chiffré non vérifié.',
    firstStep: 'Identifier le point de friction prioritaire avant toute proposition de déploiement.',
    cta: 'Décrire le processus scolaire à améliorer',
    seoTitle: 'Logiciel de gestion pour école privée au Mali | Kalan+',
    seoDescription: 'Kalan+ aide les écoles privées à structurer assiduité, suivi pédagogique et communication avec les familles.'
  },
  'smartcare-cliniques': {
    eyebrow: 'Cliniques et centres de santé',
    title: 'Organiser l’accueil et le parcours patient sans promesse médicale.',
    promise: 'SmartCare explore la gestion de l’accueil, des files et des étapes de service afin de rendre les parcours plus lisibles pour les équipes.',
    audience: 'Directions de cliniques, responsables d’accueil, responsables qualité et responsables SI.',
    pains: ['Temps d’attente peu visibles', 'Parcours entre services difficile à suivre', 'Informations opérationnelles dispersées', 'Manque d’indicateurs simples pour l’accueil'],
    deliverables: ['Observation et cartographie du parcours', 'Prototype sur données fictives', 'Pilote limité à l’accueil ou à la file', 'Indicateurs opérationnels définis avec la direction'],
    proof: 'Un prototype de file numérique existe. Aucune clinique utilisatrice, conformité médicale ou amélioration chiffrée n’est revendiquée.',
    firstStep: 'Un diagnostic court permet de décider si un outil est pertinent avant tout développement.',
    cta: 'Demander un diagnostic du parcours d’accueil',
    seoTitle: 'Gestion de file et parcours patient pour clinique | SmartCare Mali',
    seoDescription: 'SmartCare aide à étudier et prototyper l’accueil, les files et les parcours de service des cliniques au Mali.'
  },
  'developpement-application-mali': {
    eyebrow: 'Entreprises, startups et organisations',
    title: 'Passer d’une idée d’application à un périmètre livrable et chiffrable.',
    promise: 'Depuis Bamako, j’accompagne à distance le cadrage, la conception et le développement d’applications web, API, bases de données et outils métiers au Mali et à l’international.',
    audience: 'Porteurs de projet, PME, cabinets, agences et organisations au Mali ou ailleurs dans le monde, avec un besoin applicatif précis.',
    pains: ['Idée utile mais périmètre encore flou', 'Projet commencé puis bloqué', 'Bugs ou dette technique empêchant la livraison', 'Budget difficile à estimer sans spécifications'],
    deliverables: ['Entretien de découverte de 20 minutes', 'Cadrage écrit : utilisateurs, fonctions, contraintes et étapes', 'Devis après validation du périmètre', 'Livraison par lots, recette et maintenance optionnelle'],
    proof: 'Les réalisations et prototypes visibles sur ce portfolio montrent des architectures web, API, bases de données et interfaces métier. Chaque nouveau projet reste chiffré après cadrage.',
    firstStep: 'Le cadrage applicatif est proposé avant tout engagement de développement important.',
    cta: 'Présenter mon projet d’application',
    seoTitle: 'Développement web au Mali et à distance | SHAMSI Digital',
    seoDescription: 'Applications web, API et logiciels métiers pour des clients au Mali et à l’international. Cadrage et développement à distance depuis Bamako.'
  },
  'consultant-si-ong': {
    eyebrow: 'ONG et programmes de développement',
    title: 'Transformer un processus dispersé en système contrôlable et documenté.',
    promise: 'J’interviens sur le diagnostic SI, les cahiers des charges, la qualité des données, l’automatisation, le reporting et la formation des utilisateurs.',
    audience: 'Directions de programme, opérations, MEAL, administration, finance et responsables informatiques.',
    pains: ['Collectes et reportings dépendants de fichiers fragiles', 'Règles de validation peu documentées', 'Données difficiles à consolider ou auditer', 'Outil choisi avant d’avoir cadré le processus'],
    deliverables: ['Diagnostic court et note de recommandations', 'Cartographie du processus et des responsabilités', 'Cahier des charges ou prototype ciblé', 'Nettoyage, tableau de bord, automatisation ou formation selon le besoin'],
    proof: 'Le positionnement repose sur l’ingénierie SI, le développement, SQL/data et l’enseignement. Aucune expérience ONG spécifique n’est inventée.',
    firstStep: 'Décrivez un reporting à améliorer, ses sources et les décisions qu’il doit éclairer. Nous définissons un premier lot avant tout devis.',
    cta: 'Cadrer un premier lot de reporting',
    seoTitle: 'Consultant SI pour ONG au Mali | Chamsoudine THIENTA',
    seoDescription: 'Un premier lot de reporting pour ONG : qualité des données, indicateurs convenus, tableau de bord et transmission. Au Mali et à distance.',
    starterPackage: {
      title: 'Un premier tableau de bord de reporting',
      scope: 'Un seul processus de reporting, à partir d’un jeu de données existant. Les sources, les indicateurs, la période couverte et les critères de validation sont convenus avec votre équipe.',
      deliverables: ['État des données et règles de nettoyage documentées', 'Tableau de bord limité aux indicateurs convenus', 'Guide de mise à jour et prise en main avec un référent'],
      limits: 'La collecte terrain, la refonte complète du SI, les intégrations supplémentaires et la maintenance continue font l’objet d’un cadrage séparé. Budget, calendrier et modalités d’accès aux données sont validés avant de commencer.',
      preparation: 'Pour le premier échange, décrivez les fichiers disponibles et le résultat attendu. Utilisez des exemples fictifs ou anonymisés ; ne transmettez pas de données personnelles de bénéficiaires ni de fichiers confidentiels via le formulaire public.'
    }
  }
};

const en: Record<ServiceSlug, ServicePage> = {
  'consultant-informatique-bamako': {
    eyebrow: 'Consulting and delivery assignments',
    title: 'A Bamako-based IT consultant who can scope, build and train.',
    promise: 'I work as an information-systems engineer, software/web developer, Data Analyst and trainer across diagnosis, requirements, automation, applications, data, training and support.',
    audience: 'SMEs, NGOs, banks, insurers, mining and telecom companies, consultancies, schools, public bodies and project owners in Mali or remotely.',
    pains: ['Business needs that are hard to translate into a technical solution', 'Applications or projects blocked before delivery', 'Scattered data and unreliable reporting', 'Teams needing practical training or temporary technical reinforcement'],
    deliverables: ['Short IT diagnosis and prioritized recommendations', 'Requirements, architecture, backlog and acceptance plan', 'Application, API and database development or takeover', 'Data cleaning, SQL, dashboards and automation', 'Practical training and user enablement'],
    proof: 'The portfolio documents software products and prototypes, a public web delivery, data systems and university teaching experience since 2019. Every assignment is scoped against available skills and evidence.',
    firstStep: 'Share the problem, users, timeline and expected result. I will propose a diagnosis, pilot package or appropriate quote.',
    cta: 'Discuss a consulting assignment',
    seoTitle: 'IT Consultant in Bamako | Chamsoudine THIENTA',
    seoDescription: 'IT consultant, information-systems engineer, developer, Data Analyst and trainer in Bamako: audit, software, automation, data and support.'
  },
  'kalansup-universites': {
    eyebrow: 'Universities and higher-education institutes',
    title: 'Make university operations traceable, from payment to graduation.',
    promise: 'KalanSUP connects enrolment, payments, classes, attendance, grades, appeals, documents and management dashboards in one institution-specific instance.',
    audience: 'Executive teams, academic affairs, registrars, finance teams and IT leaders in Mali and Francophone Africa.',
    pains: ['Information split between paper, WhatsApp and spreadsheets', 'Student appeals that are difficult to track to a decision', 'Attendance, balances, grades and documents without a shared history', 'Management indicators that take too long to consolidate'],
    deliverables: ['20-minute demo using fictional data', 'Diagnosis of one academic process', 'Scoped pilot with acceptance criteria and training', 'Deployment and maintenance based on validated needs'],
    proof: 'A complete demo flow was tested: student → registrar → management → decision and notification. This is not presented as a client deployment.',
    firstStep: 'Start with a demo, then select one measurable process for a paid pilot.',
    cta: 'Request a KalanSUP demo',
    seoTitle: 'University management software for Mali & Guinea | KalanSUP',
    seoDescription: 'KalanSUP structures enrolment, payments, attendance, grades, appeals and university documents. Demo on fictional data.'
  },
  'kalanplus-ecoles': {
    eyebrow: 'Private schools',
    title: 'Clearer school monitoring for administrators, teachers and families.',
    promise: 'Kalan+ is designed to organize attendance, learning follow-up, assignments and family communication without multiplying disconnected files and messages.',
    audience: 'School founders, directors, academic leaders and IT managers.',
    pains: ['Late absence reporting', 'Learning follow-up split across several channels', 'Irregular family communication', 'Difficult reporting across classes and levels'],
    deliverables: ['Management discovery session', 'Student–teacher–administration–family workflow map', 'Validated prototype or pilot', 'Training and post-acceptance support'],
    proof: 'The offer is presented as a product to scope and pilot, without claiming existing users or unverified outcomes.',
    firstStep: 'Identify the priority operational friction before proposing a deployment.',
    cta: 'Describe the school process to improve',
    seoTitle: 'Private school management software in Mali | Kalan+',
    seoDescription: 'Kalan+ helps private schools structure attendance, learning follow-up and family communication.'
  },
  'smartcare-cliniques': {
    eyebrow: 'Clinics and health centres',
    title: 'Organize reception and patient flow without making medical claims.',
    promise: 'SmartCare explores reception, queue and service-stage management to make operational journeys clearer for staff.',
    audience: 'Clinic directors, reception managers, quality teams and IT leaders.',
    pains: ['Waiting times lack visibility', 'Service journeys are hard to follow', 'Operational information is fragmented', 'Reception teams lack simple indicators'],
    deliverables: ['Journey observation and mapping', 'Prototype using fictional data', 'Reception or queue pilot', 'Indicators defined with management'],
    proof: 'A digital queue prototype exists. No clinic adoption, medical compliance or quantified improvement is claimed.',
    firstStep: 'A short diagnosis determines whether software is relevant before development begins.',
    cta: 'Request a reception-flow diagnosis',
    seoTitle: 'Clinic queue and service-flow management | SmartCare Mali',
    seoDescription: 'SmartCare helps study and prototype reception, queues and service flows for clinics in Mali.'
  },
  'developpement-application-mali': {
    eyebrow: 'Companies, startups and organizations',
    title: 'Turn an application idea into a deliverable, estimable scope.',
    promise: 'From Bamako, I remotely scope, design and develop web applications, APIs, databases and business tools for clients in Mali and internationally.',
    audience: 'Project owners, SMEs, consultancies, agencies and organizations in Mali or anywhere else in the world with a specific application need.',
    pains: ['A useful idea with an unclear scope', 'A project that started and stalled', 'Bugs or technical debt blocking delivery', 'A budget that cannot be estimated without specifications'],
    deliverables: ['20-minute discovery call', 'Written scope: users, features, constraints and milestones', 'Quote after scope validation', 'Staged delivery, acceptance and optional maintenance'],
    proof: 'The portfolio shows web, API, database and business-interface work. Every new project is priced only after scoping.',
    firstStep: 'Application scoping comes before any major development commitment.',
    cta: 'Present my application project',
    seoTitle: 'Web development in Mali and remotely | SHAMSI Digital',
    seoDescription: 'Web applications, APIs and business software for clients in Mali and internationally. Remote scoping and development from Bamako.'
  },
  'consultant-si-ong': {
    eyebrow: 'NGOs and development programmes',
    title: 'Turn a fragmented process into a controlled, documented system.',
    promise: 'I support IT diagnosis, requirements, data quality, automation, reporting and user training.',
    audience: 'Programme, operations, MEAL, administration, finance and IT teams.',
    pains: ['Data collection and reporting dependent on fragile files', 'Poorly documented validation rules', 'Data that is difficult to consolidate or audit', 'Tools selected before the process is scoped'],
    deliverables: ['Short diagnosis and recommendation note', 'Process and responsibility map', 'Requirements document or focused prototype', 'Cleaning, dashboard, automation or training as needed'],
    proof: 'The positioning is grounded in information systems, software, SQL/data and teaching. No NGO-specific experience is fabricated.',
    firstStep: 'Describe one report to improve, its sources and the decisions it should support. We define a first package before a quote.',
    cta: 'Scope a first reporting package',
    seoTitle: 'IT consultant for NGOs in Mali | Chamsoudine THIENTA',
    seoDescription: 'A first reporting package for NGOs: data quality, agreed indicators, a dashboard and handover. Available in Mali and remotely.',
    starterPackage: {
      title: 'A first reporting dashboard',
      scope: 'One reporting process, using an existing dataset. Sources, indicators, reporting period and acceptance criteria are agreed with your team.',
      deliverables: ['Data assessment and documented cleaning rules', 'A dashboard limited to the agreed indicators', 'An update guide and handover with a designated team member'],
      limits: 'Field data collection, a full information-system rebuild, additional integrations and ongoing maintenance require separate scoping. Budget, schedule and data access arrangements are agreed before work starts.',
      preparation: 'For the first conversation, describe the available files and expected result. Use fictional or anonymized examples; do not send beneficiaries’ personal data or confidential files through the public form.'
    }
  }
};

export const serviceContent: Record<Locale, Record<ServiceSlug, ServicePage>> = { fr, en };

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug);
}
