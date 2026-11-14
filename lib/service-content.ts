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
  whatsappMessage?: string;
  contactSafety?: string;
  example?: {
    title: string;
    context: string;
    change: string;
    verification: string;
    limits: string;
    sourceUrl: string;
    sourceLabel: string;
  };
  questions?: Array<{ question: string; answer: string }>;
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
    eyebrow: 'Reprise d’application · Mali et à distance',
    title: 'On reprend votre application bloquée et on vous montre ce qui peut être remis en service.',
    promise: 'SHAMSI Digital, à Bamako, commence par examiner le parcours qui ne fonctionne plus, le code disponible et les contraintes de votre application web. Vous obtenez un diagnostic et un premier lot de corrections à valider avant toute intervention en production.',
    audience: 'PME, agences et porteurs de projet au Mali et à l’international dont une application web, une API ou un outil métier existe déjà, mais reste bloqué avant livraison ou après une panne.',
    pains: ['Un parcours essentiel ne fonctionne plus : connexion, formulaire ou opération métier', 'Une application commencée sans documentation suffisante pour la reprendre', 'Des erreurs entre interface, API et base de données', 'Une livraison bloquée sans savoir quoi corriger en premier'],
    deliverables: ['Diagnostic écrit : blocages reproduits, limites et priorités', 'Premier lot défini : parcours concerné, corrections proposées et critères de validation', 'Devis et calendrier après examen de l’existant', 'Corrections testées dans un environnement séparé, puis transmission des changements'],
    proof: 'Le cas ci-dessous documente une correction sur le propre site de SHAMSI Digital, avec du code et des tests publics. Il montre une démarche de maintenance, pas le sauvetage d’une application cliente ni un résultat commercial.',
    firstStep: 'Décrivez le parcours bloqué et ce qui devrait se passer.',
    cta: 'Décrire mon blocage sur WhatsApp',
    whatsappMessage: 'Bonjour SHAMSI Digital, je vous contacte depuis la page Reprise d’application. Le parcours bloqué est : ',
    contactSafety: 'Pour ce premier échange, ne transmettez ni mot de passe, ni clé API, ni données personnelles de vos utilisateurs.',
    seoTitle: 'Reprise d’application bloquée au Mali | SHAMSI Digital',
    seoDescription: 'Application web bloquée ? Diagnostic, corrections ciblées et tests avec SHAMSI Digital à Bamako, au Mali et à l’international. Échange sur WhatsApp.',
    starterPackage: {
      title: 'Commencer par un seul parcours bloqué',
      scope: 'Nous choisissons une fonction précise et le résultat attendu. Le diagnostic distingue ce qui a pu être vérifié, les informations manquantes et les corrections possibles, sans présumer qu’une réécriture complète est nécessaire.',
      deliverables: ['Compte rendu du blocage et des vérifications effectuées', 'Plan de correction priorisé avec périmètre et critères de recette', 'Si le lot est accepté : changements documentés et tests du parcours convenu'],
      limits: 'La récupération de données, les services tiers, les nouvelles fonctionnalités et la maintenance continue sont évalués séparément. Aucun délai, prix ou rétablissement complet n’est garanti avant examen. Une mise en production nécessite votre validation et un plan de sauvegarde et de retour arrière.',
      preparation: 'Indiquez ce qui bloque, depuis quand, les technologies si vous les connaissez et si vous disposez du code. Une capture anonymisée ou le texte d’une erreur suffit pour commencer. Les accès nécessaires seront définis ensuite par un canal adapté ; pas de secrets ni de données clients sur WhatsApp ou le formulaire public.'
    },
    example: {
      title: 'Cas réel : préserver une demande lors du changement de langue',
      context: 'Sur ce site SHAMSI Digital, le parcours concerné est le formulaire de contact lorsque le visiteur passe du français à l’anglais ou revient au français.',
      change: 'Le code public conserve temporairement la saisie pendant cette navigation et empêche un changement de langue d’interrompre un envoi en cours.',
      verification: 'Les tests publics couvrent les changements de langue répétés, la conservation des champs et l’absence de double envoi. Ils simulent le service d’envoi : aucun message client n’est nécessaire pour ce contrôle.',
      limits: 'Exemple de maintenance de notre propre site, sans client externe ni gain chiffré revendiqué. La saisie n’est pas conservée après un rechargement de page. Ces tests ne prouvent pas la réception d’un e-mail réel.',
      sourceUrl: 'https://github.com/dinegamer/shamsPortfolio/commit/1e3c898ccafc9c61e6796e7ffcc37880360fadb8',
      sourceLabel: 'Voir la correction et les tests publics'
    },
    questions: [
      { question: 'Faut-il refaire toute l’application ?', answer: 'Pas nécessairement. Le diagnostic commence par un parcours précis et les éléments disponibles. Il sert à comparer une correction ciblée, une reprise progressive ou une refonte, avec leurs limites.' },
      { question: 'Quel budget et quel délai prévoir ?', answer: 'Le prix et le calendrier dépendent du code, des accès, des dépendances et du blocage constaté. Le diagnostic et les corrections font l’objet d’un périmètre et de conditions convenus avant de commencer.' },
      { question: 'Peut-on travailler à distance depuis un autre pays ?', answer: 'Oui. SHAMSI Digital est basé à Bamako et propose cette intervention à distance au Mali et à l’international. Les échanges, l’environnement de test et les modalités d’accès sont définis avant la mission.' },
      { question: 'Et si je n’ai pas le code source ?', answer: 'Précisez-le dès le premier échange. Nous identifions les éléments disponibles et les accès que vous pouvez légitimement obtenir. Certaines corrections restent impossibles sans code ou sans accès autorisé ; aucun contournement d’accès n’est proposé.' }
    ]
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
    eyebrow: 'Application recovery · Mali and remote',
    title: 'We take over your stalled application and show you what can be restored.',
    promise: 'SHAMSI Digital, based in Bamako, starts by examining the broken workflow, available code and constraints of your web application. You receive an assessment and a first set of proposed fixes to approve before any production changes.',
    audience: 'SMEs, agencies and project owners in Mali and internationally with an existing web application, API or business tool stalled before delivery or after a failure.',
    pains: ['An essential workflow fails: sign-in, a form or a business operation', 'An application started without enough documentation to take it over', 'Errors between the interface, API and database', 'A blocked release with no clear order for fixing issues'],
    deliverables: ['Written assessment: reproduced issues, limitations and priorities', 'A defined first package: affected workflow, proposed fixes and acceptance criteria', 'A quote and timeline after reviewing the existing application', 'Fixes tested in a separate environment, followed by a documented handover'],
    proof: 'The example below documents a fix on SHAMSI Digital’s own website, with public code and tests. It demonstrates maintenance work, not a rescued client application or a commercial outcome.',
    firstStep: 'Describe the broken workflow and what should happen instead.',
    cta: 'Describe my issue on WhatsApp',
    whatsappMessage: 'Hello SHAMSI Digital, I found your Application recovery page. The broken workflow is: ',
    contactSafety: 'For this first conversation, do not send passwords, API keys or your users’ personal data.',
    seoTitle: 'Stalled application recovery in Mali | SHAMSI Digital',
    seoDescription: 'Stalled web application? Assessment, focused fixes and tests with SHAMSI Digital in Bamako, Mali and internationally. Start a WhatsApp conversation.',
    starterPackage: {
      title: 'Start with one broken workflow',
      scope: 'We choose one specific function and the expected result. The assessment separates verified findings, missing information and possible fixes without assuming a complete rewrite is needed.',
      deliverables: ['A report on the issue and checks performed', 'A prioritized correction plan with scope and acceptance criteria', 'If the package is approved: documented changes and tests for the agreed workflow'],
      limits: 'Data recovery, third-party services, new features and ongoing maintenance are assessed separately. No price, deadline or full recovery is guaranteed before review. Production changes require your approval and a backup and rollback plan.',
      preparation: 'Describe what fails, when it started, the technologies if known and whether you have the code. An anonymized screenshot or an error message is enough to start. Required access will be arranged later through an appropriate channel; do not send secrets or client data on WhatsApp or the public form.'
    },
    example: {
      title: 'Real example: keeping an enquiry during a language change',
      context: 'On this SHAMSI Digital website, the affected workflow is the contact form when a visitor switches from French to English or back again.',
      change: 'The public code temporarily preserves entered details during this navigation and prevents a language switch from interrupting a pending submission.',
      verification: 'The public tests cover repeated language changes, retained fields and the absence of duplicate submissions. They simulate the sending service: no client message is needed for this check.',
      limits: 'Maintenance of our own website, with no external client or quantified gain claimed. Entered details are not retained after a page reload. These tests do not prove delivery of a real email.',
      sourceUrl: 'https://github.com/dinegamer/shamsPortfolio/commit/1e3c898ccafc9c61e6796e7ffcc37880360fadb8',
      sourceLabel: 'View the public fix and tests'
    },
    questions: [
      { question: 'Does the whole application need to be rebuilt?', answer: 'Not necessarily. The assessment starts with one workflow and the available materials. It helps compare a targeted fix, a gradual takeover or a rebuild, including their limitations.' },
      { question: 'What budget and timeline should I expect?', answer: 'Price and timing depend on the code, access, dependencies and the issue found. The assessment and fixes have an agreed scope and terms before work starts.' },
      { question: 'Can we work remotely from another country?', answer: 'Yes. SHAMSI Digital is based in Bamako and offers this service remotely in Mali and internationally. Communication, the test environment and access arrangements are defined before the assignment.' },
      { question: 'What if I do not have the source code?', answer: 'Mention this in the first conversation. We identify the available materials and access you can legitimately obtain. Some fixes are impossible without code or authorized access; bypassing access controls is not offered.' }
    ]
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
