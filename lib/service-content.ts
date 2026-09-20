import type { Locale } from '@/i18n';

export const serviceSlugs = [
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
};

const fr: Record<ServiceSlug, ServicePage> = {
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
    promise: 'J’accompagne le cadrage, la conception et le développement d’applications web, API, bases de données et outils métiers depuis Bamako.',
    audience: 'Porteurs de projet, PME, cabinets, agences et organisations ayant un besoin applicatif précis.',
    pains: ['Idée utile mais périmètre encore flou', 'Projet commencé puis bloqué', 'Bugs ou dette technique empêchant la livraison', 'Budget difficile à estimer sans spécifications'],
    deliverables: ['Entretien de découverte de 20 minutes', 'Cadrage écrit : utilisateurs, fonctions, contraintes et étapes', 'Devis après validation du périmètre', 'Livraison par lots, recette et maintenance optionnelle'],
    proof: 'Les réalisations et prototypes visibles sur ce portfolio montrent des architectures web, API, bases de données et interfaces métier. Chaque nouveau projet reste chiffré après cadrage.',
    firstStep: 'Le cadrage applicatif est proposé avant tout engagement de développement important.',
    cta: 'Présenter mon projet d’application',
    seoTitle: 'Développement d’application web à Bamako | SHAMSI Digital',
    seoDescription: 'Cadrage et développement d’applications web, API et logiciels métiers à Bamako par Chamsoudine THIENTA.'
  },
  'consultant-si-ong': {
    eyebrow: 'ONG et programmes de développement',
    title: 'Transformer un processus dispersé en système contrôlable et documenté.',
    promise: 'J’interviens sur le diagnostic SI, les cahiers des charges, la qualité des données, l’automatisation, le reporting et la formation des utilisateurs.',
    audience: 'Directions de programme, opérations, MEAL, administration, finance et responsables informatiques.',
    pains: ['Collectes et reportings dépendants de fichiers fragiles', 'Règles de validation peu documentées', 'Données difficiles à consolider ou auditer', 'Outil choisi avant d’avoir cadré le processus'],
    deliverables: ['Diagnostic court et note de recommandations', 'Cartographie du processus et des responsabilités', 'Cahier des charges ou prototype ciblé', 'Nettoyage, tableau de bord, automatisation ou formation selon le besoin'],
    proof: 'Le positionnement repose sur l’ingénierie SI, le développement, SQL/data et l’enseignement. Aucune expérience ONG spécifique n’est inventée.',
    firstStep: 'Décrire un seul processus encore géré par appels, papier ou fichiers dispersés ; je confirme sous 24 heures si un diagnostic est pertinent.',
    cta: 'Demander un diagnostic SI court',
    seoTitle: 'Consultant SI pour ONG au Mali | Chamsoudine THIENTA',
    seoDescription: 'Diagnostic SI, cahier des charges, automatisation, reporting et formation pour ONG au Mali et à distance.'
  }
};

const en: Record<ServiceSlug, ServicePage> = {
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
    promise: 'From Bamako, I support the scoping, design and development of web applications, APIs, databases and business tools.',
    audience: 'Project owners, SMEs, consultancies, agencies and organizations with a specific application need.',
    pains: ['A useful idea with an unclear scope', 'A project that started and stalled', 'Bugs or technical debt blocking delivery', 'A budget that cannot be estimated without specifications'],
    deliverables: ['20-minute discovery call', 'Written scope: users, features, constraints and milestones', 'Quote after scope validation', 'Staged delivery, acceptance and optional maintenance'],
    proof: 'The portfolio shows web, API, database and business-interface work. Every new project is priced only after scoping.',
    firstStep: 'Application scoping comes before any major development commitment.',
    cta: 'Present my application project',
    seoTitle: 'Web application development in Bamako | SHAMSI Digital',
    seoDescription: 'Web application, API and business software scoping and development in Bamako by Chamsoudine THIENTA.'
  },
  'consultant-si-ong': {
    eyebrow: 'NGOs and development programmes',
    title: 'Turn a fragmented process into a controlled, documented system.',
    promise: 'I support IT diagnosis, requirements, data quality, automation, reporting and user training.',
    audience: 'Programme, operations, MEAL, administration, finance and IT teams.',
    pains: ['Data collection and reporting dependent on fragile files', 'Poorly documented validation rules', 'Data that is difficult to consolidate or audit', 'Tools selected before the process is scoped'],
    deliverables: ['Short diagnosis and recommendation note', 'Process and responsibility map', 'Requirements document or focused prototype', 'Cleaning, dashboard, automation or training as needed'],
    proof: 'The positioning is grounded in information systems, software, SQL/data and teaching. No NGO-specific experience is fabricated.',
    firstStep: 'Describe one process still managed through calls, paper or scattered files; I will confirm within 24 hours whether a diagnosis is relevant.',
    cta: 'Request a short IT diagnosis',
    seoTitle: 'IT consultant for NGOs in Mali | Chamsoudine THIENTA',
    seoDescription: 'IT diagnosis, requirements, automation, reporting and training for NGOs in Mali and remotely.'
  }
};

export const serviceContent: Record<Locale, Record<ServiceSlug, ServicePage>> = { fr, en };

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug);
}
