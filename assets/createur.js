/* ==========================================================
   LE DATASHARD — Créateur de personnage (méthode Complete Package)
   ========================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------ Données */
  const STATS = [
    ['INT', 'INT', 'Intelligence'], ['REF', 'REF', 'Réflexes'], ['DEX', 'DEX', 'Dextérité'],
    ['TECH', 'TECH', 'Technique'], ['COOL', 'PRES', 'Présence'], ['WILL', 'VOL', 'Volonté'],
    ['LUCK', 'CHA', 'Chance'], ['MOVE', 'MOUV', 'Mouvement'], ['BODY', 'COR', 'Corps'], ['EMP', 'EMP', 'Empathie'],
  ];
  const STAT_POINTS = 62, STAT_MIN = 2, STAT_MAX = 8;
  const SKILL_POINTS = 86, SKILL_MAX = 6;
  const BUDGET = 2550, FASHION = 800;

  const ROLES = [
    { id: 'rockerboy', name: 'Rockerboy', vf: 'Rockeur', ab: 'Impact charismatique', color: 'var(--magenta)',
      pitch: "Artiste rebelle qui soulève les foules.", stats: ['COOL', 'EMP', 'TECH', 'REF'],
      skills: ['Instrument', 'Persuasion', 'Perception humaine', 'Composition', 'Connaissance de la rue', 'Habillement et style', 'Pistolet', 'Bagarre'] },
    { id: 'solo', name: 'Solo', vf: 'Solo', ab: 'Conscience tactique', color: 'var(--red)',
      pitch: "Professionnel du combat, arme humaine à louer.", stats: ['REF', 'DEX', 'BODY', 'WILL'],
      skills: ['Pistolet', "Armes d'épaule", 'Esquive', 'Bagarre', 'Tir automatique', 'Arme de mêlée', 'Tactique', 'Perception'] },
    { id: 'netrunner', name: 'Netrunner', vf: 'Netrunner', ab: 'Interface', color: 'var(--magenta)',
      pitch: "Pirate qui plonge dans les architectures NET.", stats: ['INT', 'TECH', 'REF', 'WILL'],
      skills: ['Électronique / Sécurité', 'Cryptographie', 'Technique de base', 'Recherche en bibliothèque', 'Discrétion', 'Pistolet', 'Esquive', 'Contrefaçon'] },
    { id: 'tech', name: 'Tech', vf: 'Techie', ab: 'Bricoleur', color: 'var(--cyan)',
      pitch: "Génie qui répare, améliore et invente.", stats: ['TECH', 'INT', 'REF', 'DEX'],
      skills: ['Technique de base', 'Cybertech', 'Électronique / Sécurité', 'Armurerie', 'Terratech', 'Science', "Armes d'épaule", 'Explosifs'] },
    { id: 'medtech', name: 'Medtech', vf: 'Medtech', ab: 'Médecine', color: 'var(--green)',
      pitch: "Médecin de rue qui garde l'équipe en vie.", stats: ['TECH', 'INT', 'COOL', 'REF'],
      skills: ['Assistance médicale (Paramédic)', 'Premiers secours', 'Cybertech', 'Science', 'Perception humaine', 'Pistolet', 'Esquive', 'Déduction'] },
    { id: 'media', name: 'Media', vf: 'Média', ab: 'Crédibilité', color: 'var(--amber)',
      pitch: "Journaliste qui fait éclater la vérité.", stats: ['INT', 'COOL', 'EMP', 'REF'],
      skills: ['Composition', 'Persuasion', 'Recherche en bibliothèque', 'Perception humaine', 'Photos et films', 'Déduction', 'Connaissance de la rue', 'Pistolet'] },
    { id: 'exec', name: 'Exec', vf: 'Corpo', ab: "Travail d'équipe", color: '#9aa8ff',
      pitch: "Cadre qui bâtit son empire avec son équipe.", stats: ['INT', 'COOL', 'EMP', 'WILL'],
      skills: ['Bureaucratie', "Gestion d'affaires", 'Persuasion', 'Corruption', 'Perception humaine', 'Comptabilité', 'Habillement et style', 'Pistolet'] },
    { id: 'lawman', name: 'Lawman', vf: 'Justicier', ab: 'Renforts', color: '#5fa8ff',
      pitch: "Flic, shérif ou chasseur de primes.", stats: ['REF', 'COOL', 'WILL', 'BODY'],
      skills: ["Armes d'épaule", 'Pistolet', 'Interrogatoire', 'Criminologie', 'Pistage', 'Conduite de véhicule terrestre', 'Esquive', 'Déduction'] },
    { id: 'fixer', name: 'Fixer', vf: 'Fixer', ab: 'Intermédiaire', color: 'var(--cyan)',
      pitch: "Négociant qui connaît tout le monde.", stats: ['COOL', 'INT', 'EMP', 'REF'],
      skills: ['Négoce', 'Connaissance de la rue', 'Persuasion', 'Corruption', 'Perception humaine', "Gestion d'affaires", 'Pistolet', 'Esquive'] },
    { id: 'nomad', name: 'Nomad', vf: 'Nomade', ab: 'Moto', color: 'var(--amber)',
      pitch: "Membre d'un clan itinérant, as du volant.", stats: ['REF', 'DEX', 'TECH', 'BODY'],
      skills: ['Conduite de véhicule terrestre', 'Terratech', 'Survie en milieu hostile', "Armes d'épaule", 'Bagarre', 'Pistage', 'Esquive', 'Pilotage de véhicule aérien'] },
  ];

  // [catégorie, nom, caractéristique, base, ×2]
  const SKILLS = [
    ['Vigilance', 'Concentration', 'WILL', 1, 0], ['Vigilance', "Dissimulation / Révélation d'objet", 'INT', 0, 0],
    ['Vigilance', 'Lecture sur les lèvres', 'INT', 0, 0], ['Vigilance', 'Perception', 'INT', 1, 0], ['Vigilance', 'Pistage', 'INT', 0, 0],
    ['Corps', 'Athlétisme', 'DEX', 1, 0], ['Corps', 'Contorsion', 'DEX', 0, 0], ['Corps', 'Danse', 'DEX', 0, 0],
    ['Corps', 'Endurance', 'WILL', 0, 0], ['Corps', 'Résistance torture / drogues', 'WILL', 0, 0], ['Corps', 'Discrétion', 'DEX', 1, 0],
    ['Pilotage', 'Conduite de véhicule terrestre', 'REF', 0, 0], ['Pilotage', 'Pilotage de véhicule aérien', 'REF', 0, 1],
    ['Pilotage', 'Pilotage de véhicule marin', 'REF', 0, 0], ['Pilotage', 'Équitation', 'REF', 0, 0],
    ['Éducation', 'Comptabilité', 'INT', 0, 0], ['Éducation', 'Dressage', 'INT', 0, 0], ['Éducation', 'Bureaucratie', 'INT', 0, 0],
    ['Éducation', "Gestion d'affaires", 'INT', 0, 0], ['Éducation', 'Composition', 'INT', 0, 0], ['Éducation', 'Criminologie', 'INT', 0, 0],
    ['Éducation', 'Cryptographie', 'INT', 0, 0], ['Éducation', 'Déduction', 'INT', 0, 0], ['Éducation', 'Éducation', 'INT', 1, 0],
    ['Éducation', 'Jeux de hasard', 'INT', 0, 0], ['Éducation', 'Langue (argot de la rue)', 'INT', 1, 0],
    ['Éducation', 'Recherche en bibliothèque', 'INT', 0, 0], ['Éducation', 'Guide local (votre quartier)', 'INT', 1, 0],
    ['Éducation', 'Science', 'INT', 0, 0], ['Éducation', 'Tactique', 'INT', 0, 0], ['Éducation', 'Survie en milieu hostile', 'INT', 0, 0],
    ['Combat', 'Bagarre', 'DEX', 1, 0], ['Combat', 'Esquive', 'DEX', 1, 0], ['Combat', 'Arts martiaux', 'DEX', 0, 1], ['Combat', 'Arme de mêlée', 'DEX', 0, 0],
    ['Spectacle', "Jeu d'acteur", 'COOL', 0, 0], ['Spectacle', 'Instrument', 'TECH', 0, 0],
    ['Distance', "Tir à l'arc", 'REF', 0, 0], ['Distance', 'Tir automatique', 'REF', 0, 1], ['Distance', 'Pistolet', 'REF', 0, 0],
    ['Distance', 'Armes lourdes', 'REF', 0, 1], ['Distance', "Armes d'épaule", 'REF', 0, 0],
    ['Social', 'Corruption', 'COOL', 0, 0], ['Social', 'Conversation', 'EMP', 1, 0], ['Social', 'Perception humaine', 'EMP', 1, 0],
    ['Social', 'Interrogatoire', 'COOL', 0, 0], ['Social', 'Persuasion', 'COOL', 1, 0], ['Social', 'Look', 'COOL', 0, 0],
    ['Social', 'Connaissance de la rue', 'COOL', 0, 0], ['Social', 'Négoce', 'COOL', 0, 0], ['Social', 'Habillement et style', 'COOL', 0, 0],
    ['Technique', 'Aérotech', 'TECH', 0, 0], ['Technique', 'Technique de base', 'TECH', 0, 0], ['Technique', 'Cybertech', 'TECH', 0, 0],
    ['Technique', 'Explosifs', 'TECH', 0, 1], ['Technique', 'Électronique / Sécurité', 'TECH', 0, 1], ['Technique', 'Premiers secours', 'TECH', 1, 0],
    ['Technique', 'Contrefaçon', 'TECH', 0, 0], ['Technique', 'Terratech', 'TECH', 0, 0], ['Technique', 'Arts plastiques', 'TECH', 0, 0],
    ['Technique', 'Assistance médicale (Paramédic)', 'TECH', 0, 1], ['Technique', 'Photos et films', 'TECH', 0, 0],
    ['Technique', 'Crochetage', 'TECH', 0, 0], ['Technique', 'Pickpocket', 'TECH', 0, 0], ['Technique', 'Maritech', 'TECH', 0, 0],
    ['Technique', 'Armurerie', 'TECH', 0, 0],
  ];
  const SK = Object.fromEntries(SKILLS.map(s => [s[1], { cat: s[0], stat: s[2], base: !!s[3], x2: !!s[4] }]));

  // Suggestions de Lifepath (idées libres, à réécrire à volonté)
  const LIFEPATH = [
    ['origine', 'Origines culturelles', ['Nord-américaine', 'Sud-américaine', 'Centre-américaine', 'Europe de l\'Ouest', 'Europe de l\'Est', 'Moyen-Orient / Afrique du Nord', 'Afrique subsaharienne', 'Asie du Sud', 'Asie du Sud-Est', 'Asie de l\'Est', 'Océanie / îles du Pacifique']],
    ['personnalite', 'Personnalité', ['Timide et secret·e', 'Rebelle, antisystème', 'Arrogant·e et distant·e', 'Lunatique, imprévisible', 'Ordonné·e et sérieux·se', 'Bavard·e et sociable', 'Calculateur·rice', 'Rêveur·se idéaliste', 'Bagarreur·se, à cran', 'Pince-sans-rire']],
    ['look', 'Style vestimentaire', ['Corpo impeccable', 'Cuir et chrome de motard', 'Mode urbaine décontractée', 'Tenue de combat militaire', 'Haute couture néon', 'Fripes de récup', 'Gothique', 'Années 80 rétro', 'Techwear fonctionnel', 'Bohème']],
    ['signe', 'Signe distinctif', ['Tatouages lumineux', 'Cicatrice bien visible', 'Lunettes miroir en permanence', 'Bijoux voyants', 'Cyberbras apparent', 'Coiffure impossible', 'Odeur de tabac', 'Toujours un chewing-gum', 'Voix très grave', 'Rire inoubliable']],
    ['valeur', 'Ce qui compte le plus', ['L\'argent', 'L\'honneur', 'La parole donnée', 'La famille', 'La connaissance', 'La liberté', 'Le pouvoir', 'L\'amitié', 'La vengeance', 'La célébrité']],
    ['gens', 'Ce que je pense des gens', ['Chacun peut être sauvé', 'Personne n\'est fiable', 'Ce sont des outils', 'Ils méritent mieux que ce monde', 'Je préfère les machines', 'Ça dépend de leur prix', 'Les faibles doivent être protégés', 'Que le meilleur gagne']],
    ['personne', 'La personne la plus chère', ['Un parent', 'Un frère ou une sœur', 'Un ancien amour', 'Un mentor', 'Un ami d\'enfance', 'Personne', 'Une idole inaccessible', 'Un enfant que je protège']],
    ['objet', "L'objet le plus précieux", ['Une arme héritée', 'Une photo abîmée', 'Une puce de mémoire', 'Un bijou de famille', 'Un instrument de musique', 'Un véhicule', 'Une veste fétiche', 'Un vieux livre papier']],
    ['famille', 'Milieu familial', ['Famille corpo aisée', 'Famille corpo déchue', 'Clan nomade', 'Gang de rue', 'Famille de flics', 'Commerçants de quartier', 'Enfant des rues, sans famille', 'Artistes bohèmes', 'Ouvriers de la reconstruction', 'Réfugiés de guerre']],
    ['enfance', "Environnement d'enfance", ['Une tour corpo', 'Un camp nomade', 'Une Combat Zone', 'Un quartier en reconstruction', 'Les Badlands', 'Une petite ville hors de Night City', 'Une mégatour surpeuplée', 'Les égouts et les ruines']],
    ['crise', 'Crise familiale', ['Ruinés par une corpo', 'Tués dans une guerre de gangs', 'Disparus sans laisser de trace', 'Emprisonnés', 'Dispersés par la guerre', 'Victimes de la cyberpsychose d\'un proche', 'Endettés auprès de la mafia', 'Aucune : ils vont bien… pour l\'instant']],
    ['objectif', 'Objectif de vie', ['Me venger', 'Devenir une légende de la rue', 'Faire tomber une corpo', 'Mettre ma famille à l\'abri', 'Devenir riche', 'Découvrir la vérité sur mon passé', 'Quitter Night City', 'Protéger mon quartier']],
    ['amis', 'Amis', []],
    ['ennemis', 'Ennemis', []],
    ['amour', 'Amours tragiques', []],
  ];

  const PRESETS = [
    ['Pistolet moyen', 'Arme', 50, 0], ['Pistolet lourd', 'Arme', 100, 0], ['Pistolet très lourd', 'Arme', 100, 0],
    ['Pistolet-mitrailleur', 'Arme', 100, 0], ['Fusil à pompe', 'Arme', 500, 0], ['Fusil d\'assaut', 'Arme', 500, 0],
    ['Fusil de précision', 'Arme', 500, 0], ['Arc', 'Arme', 100, 0], ['Arme de mêlée légère', 'Arme', 50, 0],
    ['Arme de mêlée lourde', 'Arme', 100, 0], ['Munitions de base (×50)', 'Arme', 50, 0],
    ['Cuir (tête + corps)', 'Armure', 40, 0], ['Kevlar (tête + corps)', 'Armure', 100, 0], ['Armorjack léger (tête + corps)', 'Armure', 200, 0],
    ['Agent', 'Matériel', 100, 0], ['Kit de premiers secours', 'Matériel', 50, 0], ['Trousse à outils', 'Matériel', 100, 0],
    ['Cyberdeck', 'Matériel', 500, 0], ['Lunettes de virtualité', 'Matériel', 100, 0],
    ['Tatouage lumineux', 'Mode', 100, 0], ['Veste', 'Mode', 50, 0], ['Haut', 'Mode', 50, 0], ['Bas', 'Mode', 50, 0], ['Chaussures', 'Mode', 50, 0],
  ];


  /* ------------------------------------------------ Catalogue cyberware (valeurs indicatives, modifiables) */
  // id, nom, famille, lieu de pose, prix, perte fixe, dés, zone, options : {base:{slots,max}} ou {req, size}
  const FAMS = ['Fashionware', 'Neuralware', 'Cyberoptique', 'Cyberaudio', 'Interne', 'Externe', 'Membres', 'Borgware'];
  const CY = [
    ['biomon', 'Biomoniteur', 'Fashionware', 'Boutique', 100, 0, '', 'skin', "Pouls, tension et glycémie affichés sur la peau ou l'Agent."],
    ['chemskin', 'Chemskin', 'Fashionware', 'Boutique', 100, 0, '', 'skin', 'Peau teintée : couleurs, motifs, dégradés.'],
    ['empthread', 'EMP Threading', 'Fashionware', 'Boutique', 10, 0, '', 'skin', 'Fils argentés décoratifs sous la peau.'],
    ['lighttat', 'Tatouage lumineux', 'Fashionware', 'Boutique', 100, 0, '', 'skin', 'Tatouage animé et lumineux.'],
    ['shift', 'Shift Tacts', 'Fashionware', 'Boutique', 100, 0, '', 'eyes', 'Lentilles qui changent la couleur des yeux.'],
    ['skinwatch', 'Skinwatch', 'Fashionware', 'Boutique', 100, 0, '', 'skin', "Montre affichée sous la peau du poignet."],
    ['techhair', 'Techhair', 'Fashionware', 'Boutique', 100, 0, '', 'head', 'Cheveux lumineux qui changent de couleur.'],

    ['neural', 'Neural link', 'Neuralware', 'Clinique', 500, 7, '2d6', 'head', "Le support de tout le neuralware. Indispensable aux Netrunners.", { base: { slots: 5, max: 1 } }],
    ['plugs', "Prises d'interface", 'Neuralware', 'Clinique', 500, 7, '2d6', 'head', 'Se brancher à un cyberdeck, une arme intelligente ou un véhicule.', { req: 'neural' }],
    ['chipsock', 'Prise de chipware', 'Neuralware', 'Clinique', 500, 7, '2d6', 'head', 'Accueille une puce de compétence ou un éditeur de douleur.', { req: 'neural' }],
    ['bdrec', 'Enregistreur de braindance', 'Neuralware', 'Clinique', 500, 7, '2d6', 'head', 'Enregistre vos expériences en braindance.', { req: 'neural' }],
    ['kerenz', 'Kerenzikov', 'Neuralware', 'Clinique', 500, 14, '4d6', 'head', "Booster de réflexes : bonus à l'initiative.", { req: 'neural' }],
    ['sande', 'Sandevistan', 'Neuralware', 'Clinique', 500, 7, '2d6', 'head', "Accélérateur activable : gros bonus d'initiative pour un temps.", { req: 'neural' }],

    ['eye', 'Cyberœil', 'Cyberoptique', 'Clinique', 100, 7, '2d6', 'eyes', 'Remplace un œil. Trois emplacements d\'options par œil.', { base: { slots: 3, max: 2 } }],
    ['antidaz', 'Anti-éblouissement', 'Cyberoptique', 'Clinique', 100, 3, '1d6', 'eyes', 'Protège des flashs et lumières vives.', { req: 'eye' }],
    ['lowlight', 'Vision nocturne / IR / UV', 'Cyberoptique', 'Clinique', 500, 3, '1d6', 'eyes', 'Voir dans le noir et à travers la fumée.', { req: 'eye' }],
    ['scope', 'Lunette de visée', 'Cyberoptique', 'Clinique', 500, 3, '1d6', 'eyes', 'Aide au tir visé.', { req: 'eye' }],
    ['tele', 'Téléoptique', 'Cyberoptique', 'Clinique', 500, 3, '1d6', 'eyes', 'Zoom longue distance.', { req: 'eye' }],
    ['cam', 'Caméra photo / vidéo', 'Cyberoptique', 'Clinique', 500, 3, '1d6', 'eyes', 'Enregistre tout ce que vous voyez.', { req: 'eye' }],
    ['imgenh', "Amélioration d'image", 'Cyberoptique', 'Clinique', 500, 3, '1d6', 'eyes', 'Bonus aux tests de perception visuelle.', { req: 'eye' }],
    ['raddet', 'Détecteur de radiations', 'Cyberoptique', 'Clinique', 1000, 3, '1d6', 'eyes', 'Signale les zones irradiées.', { req: 'eye' }],

    ['audio', 'Kit cyberaudio', 'Cyberaudio', 'Clinique', 500, 7, '2d6', 'ears', "Le support des options auditives. Trois emplacements.", { base: { slots: 3, max: 1 } }],
    ['agentint', 'Agent interne', 'Cyberaudio', 'Clinique', 100, 3, '1d6', 'ears', 'Un Agent dans la tête, commandé à la voix.', { req: 'audio' }],
    ['amphear', 'Audition amplifiée', 'Cyberaudio', 'Clinique', 100, 3, '1d6', 'ears', 'Bonus pour entendre ce qui se dit.', { req: 'audio' }],
    ['audrec', 'Enregistreur audio', 'Cyberaudio', 'Clinique', 100, 3, '1d6', 'ears', 'Enregistre tout ce que vous entendez.', { req: 'audio' }],
    ['bugdet', 'Détecteur de micros', 'Cyberaudio', 'Clinique', 100, 3, '1d6', 'ears', 'Repère les micros espions à proximité.', { req: 'audio' }],
    ['radio', 'Scanner radio', 'Cyberaudio', 'Clinique', 500, 3, '1d6', 'ears', 'Capte les fréquences radio.', { req: 'audio' }],
    ['stress', 'Analyseur de stress vocal', 'Cyberaudio', 'Clinique', 500, 3, '1d6', 'ears', 'Détecte le mensonge dans la voix.', { req: 'audio' }],
    ['tracer', 'Traceur de signal', 'Cyberaudio', 'Clinique', 500, 3, '1d6', 'ears', 'Suit une balise à distance.', { req: 'audio' }],

    ['contra', 'Implant contraceptif', 'Interne', 'Boutique', 10, 0, '', 'torso', 'Contraception de longue durée.'],
    ['nasal', 'Filtres nasaux', 'Interne', 'Clinique', 100, 3, '1d6', 'torso', 'Protègent des gaz et des fumées toxiques.'],
    ['toxin', 'Liants de toxines', 'Interne', 'Clinique', 100, 7, '2d6', 'torso', 'Bonus contre les poisons et drogues.'],
    ['antibod', 'Anticorps renforcés', 'Interne', 'Clinique', 500, 7, '2d6', 'torso', 'Guérison plus rapide.'],
    ['vamp', 'Vampyres', 'Interne', 'Clinique', 500, 14, '4d6', 'torso', 'Crocs implantés, chargeables en poison.'],
    ['gills', 'Branchies', 'Interne', 'Hôpital', 1000, 7, '2d6', 'torso', "Respirer sous l'eau."],
    ['air', "Réserve d'air autonome", 'Interne', 'Hôpital', 1000, 7, '2d6', 'torso', "Quelques minutes d'air en toutes circonstances."],
    ['musbone', 'Muscles et os renforcés', 'Interne', 'Hôpital', 1000, 14, '4d6', 'torso', 'Augmente le BODY.'],

    ['pocket', 'Poche sous-cutanée', 'Externe', 'Clinique', 100, 3, '1d6', 'skin', 'Cachette sous la peau pour un petit objet.'],
    ['skinweave', 'Peau tissée', 'Externe', 'Clinique', 500, 7, '2d6', 'skin', 'Armure légère sous la peau, sur tout le corps.'],
    ['holster', 'Étui dissimulé', 'Externe', 'Hôpital', 500, 7, '2d6', 'skin', 'Une arme de poing cachée dans le corps.'],
    ['subarmor', 'Armure sous-cutanée', 'Externe', 'Hôpital', 1000, 14, '4d6', 'skin', 'Plaques de protection sous la peau du torse.'],

    ['arm', 'Cyberbras', 'Membres', 'Hôpital', 500, 7, '2d6', 'arms', 'Remplace un bras. Quatre emplacements d\'options.', { base: { slots: 4, max: 2 } }],
    ['leg', 'Cyberjambe', 'Membres', 'Hôpital', 100, 3, '1d6', 'legs', 'Remplace une jambe. Trois emplacements d\'options.', { base: { slots: 3, max: 2 } }],
    ['knucks', 'Big Knucks', 'Membres', 'Clinique', 100, 3, '1d6', 'arms', 'Poings renforcés : frappes plus lourdes.', { req: 'arm' }],
    ['scratch', 'Scratchers', 'Membres', 'Clinique', 100, 3, '1d6', 'arms', 'Griffes courtes au bout des doigts.', { req: 'arm' }],
    ['rippers', 'Rippers', 'Membres', 'Clinique', 500, 3, '1d6', 'arms', 'Griffes rétractables tranchantes.', { req: 'arm' }],
    ['wolvers', 'Wolvers', 'Membres', 'Clinique', 500, 3, '1d6', 'arms', 'Longues lames qui sortent des phalanges.', { req: 'arm' }],
    ['popup', 'Arme escamotable', 'Membres', 'Clinique', 500, 7, '2d6', 'arms', "Une arme cachée dans l'avant-bras (2 emplacements).", { req: 'arm', size: 2 }],
    ['grapple', 'Main-grappin', 'Membres', 'Clinique', 100, 3, '1d6', 'arms', 'Grappin à câble tiré depuis la main.', { req: 'arm' }],
    ['toolhand', 'Main-outil', 'Membres', 'Clinique', 100, 3, '1d6', 'arms', 'Outils intégrés aux doigts : parfait pour un Tech.', { req: 'arm' }],
    ['jump', 'Propulseurs de saut', 'Membres', 'Clinique', 500, 3, '1d6', 'legs', 'Sauts bien plus hauts et plus longs.', { req: 'leg' }],
    ['talon', 'Pieds-griffes', 'Membres', 'Clinique', 100, 3, '1d6', 'legs', 'Griffes aux pieds pour grimper ou frapper.', { req: 'leg' }],
    ['skatefeet', 'Pieds-patins', 'Membres', 'Clinique', 500, 3, '1d6', 'legs', 'Rollers intégrés aux pieds.', { req: 'leg' }],

    ['multiopt', 'Support multi-optique', 'Borgware', 'Hôpital', 1000, 7, '2d6', 'back', 'Plusieurs cyberyeux en un seul support.'],
    ['shoulder', "Support d'épaule (bras supp.)", 'Borgware', 'Hôpital', 1000, 14, '4d6', 'back', 'Une paire de bras en plus.'],
    ['sensor', 'Réseau de capteurs', 'Borgware', 'Hôpital', 1000, 14, '4d6', 'back', 'Capteurs implantés sur tout le corps.'],
    ['frameS', 'Exosquelette implanté Sigma', 'Borgware', 'Hôpital', 1000, 14, '4d6', 'back', 'Squelette renforcé : BODY augmenté.'],
    ['frameB', 'Exosquelette implanté Beta', 'Borgware', 'Hôpital', 5000, 14, '4d6', 'back', 'La version lourde : BODY encore plus élevé.'],
  ].map(([id, n, fam, loc, price, hl, dice, zone, desc, o = {}]) => ({ id, n, fam, loc, price, hl, dice, zone, desc, ...o }));
  const CYB = Object.fromEntries(CY.map(c => [c.id, c]));
  const KITS = {
    rockerboy: ['techhair', 'lighttat', 'chemskin'], solo: ['neural', 'kerenz', 'eye', 'scope'],
    netrunner: ['neural', 'plugs'], tech: ['arm', 'toolhand'], medtech: ['biomon', 'nasal', 'toxin'],
    media: ['eye', 'cam', 'audio', 'audrec'], exec: ['biomon', 'audio', 'agentint'], lawman: ['eye', 'lowlight', 'audio', 'radio'],
    fixer: ['audio', 'agentint', 'stress'], nomad: ['neural', 'plugs', 'audio', 'radio'],
  };
  const rollDice = d => { const m = /(\d+)d(\d+)/.exec(d || ''); if (!m) return 0; let t = 0; for (let i = 0; i < +m[1]; i++) t += 1 + Math.floor(Math.random() * +m[2]); return t; };

  const NAMES1 = ['Neon', 'Static', 'Ghost', 'Razor', 'Chrome', 'Vex', 'Echo', 'Blitz', 'Jinx', 'Rook', 'Nova', 'Cipher', 'Hex', 'Saint', 'Rust', 'Kitsune', 'Volt', 'Sable'];
  const NAMES2 = ['', 'Kid', 'Queen', 'Jack', 'Wire', 'Fang', 'Doll', 'Dog', 'Zero', '-9', 'Byte', 'Heart'];

  /* ------------------------------------------------ État */
  const KEY = 'datashard-createur-v1';
  const blank = () => ({
    handle: '', name: '', pronoms: '', role: null,
    stats: Object.fromEntries(STATS.map(s => [s[0], 6])),
    skills: Object.fromEntries(SKILLS.map(s => [s[1], s[3] ? 2 : 0])),
    life: {}, gear: [], notes: '', hlMode: 'fixe',
  });
  let st = blank();
  try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.stats) st = Object.assign(blank(), saved); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  /* ------------------------------------------------ Calculs */
  const sum = o => Object.values(o).reduce((a, b) => a + b, 0);
  const statSpent = () => sum(st.stats);
  const skillCost = (n, lvl) => lvl * (SK[n].x2 ? 2 : 1);
  const skillSpent = () => Object.entries(st.skills).reduce((a, [n, l]) => a + skillCost(n, l), 0);
  const money = cat => st.gear.filter(g => (cat === 'Mode') === (g.cat === 'Mode')).reduce((a, g) => a + (+g.price || 0), 0);
  const humanityLoss = () => st.gear.reduce((a, g) => a + (+g.hl || 0), 0);
  function derived() {
    const s = st.stats;
    const hp = 10 + 5 * Math.ceil((s.BODY + s.WILL) / 2);
    const hum = Math.max(0, s.EMP * 10 - humanityLoss());
    return { hp, sw: Math.ceil(hp / 2), ds: s.BODY, humMax: s.EMP * 10, hum, empNow: Math.floor(hum / 10) };
  }
  const role = () => ROLES.find(r => r.id === st.role);
  const cyCount = id => st.gear.filter(g => g.cid === id).length;
  const cyCap = base => (CYB[base].base.slots) * cyCount(base);
  const cyUsed = base => st.gear.filter(g => g.cid && CYB[g.cid] && CYB[g.cid].req === base).reduce((a, g) => a + (CYB[g.cid].size || 1), 0);
  function cyBlock(c) {
    if (c.base) return cyCount(c.id) >= c.base.max ? (c.base.max > 1 ? 'Déjà installé deux fois' : 'Déjà installé') : '';
    if (c.req) {
      if (!cyCount(c.req)) return 'Nécessite : ' + CYB[c.req].n;
      if (cyUsed(c.req) + (c.size || 1) > cyCap(c.req)) return 'Plus d\'emplacement libre';
      return '';
    }
    return cyCount(c.id) ? 'Déjà installé' : '';
  }
  function cyAdd(id) {
    const c = CYB[id]; if (!c || cyBlock(c)) return false;
    st.gear.push({ name: c.n, cat: 'Cyberware', price: c.price, hl: st.hlMode === 'des' && c.dice ? rollDice(c.dice) : c.hl, cid: id, dice: c.dice, loc: c.loc });
    return true;
  }
  function cyPrune() {
    CY.filter(c => c.base).forEach(b => {
      while (cyUsed(b.id) > cyCap(b.id)) {
        const i = st.gear.map(g => g.cid && CYB[g.cid] && CYB[g.cid].req === b.id).lastIndexOf(true);
        if (i < 0) break; st.gear.splice(i, 1);
      }
    });
  }

  /* ------------------------------------------------ Utilitaires DOM */
  const $ = (s, el = document) => el.querySelector(s);
  const esc = v => String(v ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const root = $('#cc');
  let step = 0;

  const STEPS = [
    ['Identité', 'identite'], ['Rôle', 'role'], ['Caractéristiques', 'stats'], ['Compétences', 'skills'],
    ['Lifepath', 'life'], ['Équipement', 'gear'], ['Chrome', 'chrome'], ['Fiche', 'sheet'],
  ];
  function stepOk(i) {
    switch (STEPS[i][1]) {
      case 'identite': return !!st.handle.trim();
      case 'role': return !!st.role;
      case 'stats': return statSpent() === STAT_POINTS;
      case 'skills': return skillSpent() === SKILL_POINTS;
      case 'life': return LIFEPATH.slice(0, 12).filter(l => (st.life[l[0]] || '').trim()).length >= 6;
      case 'gear': return money('x') <= BUDGET && money('Mode') <= FASHION && st.gear.some(g => g.cat !== 'Cyberware');
      case 'chrome': return money('x') <= BUDGET && derived().hum > 0;
      default: return STEPS.slice(0, -1).every((_, j) => stepOk(j));
    }
  }

  /* ------------------------------------------------ Rendu */
  function render() {
    root.innerHTML = `
      <ol class="cc-steps" role="tablist">${STEPS.map((s, i) => `
        <li><button role="tab" aria-selected="${i === step}" class="${i === step ? 'on' : ''} ${stepOk(i) ? 'done' : ''}" data-go="${i}">
          <span class="n">${stepOk(i) ? '✓' : String(i + 1).padStart(2, '0')}</span><span class="l">${s[0]}</span></button></li>`).join('')}
      </ol>
      <div class="cc-body">
        <div class="cc-main">${views[STEPS[step][1]]()}
          <div class="cc-nav">
            ${step > 0 ? `<button class="btn ghost" data-go="${step - 1}">◂ ${STEPS[step - 1][0]}</button>` : '<span></span>'}
            ${step < STEPS.length - 1 ? `<button class="btn" data-go="${step + 1}">${STEPS[step + 1][0]} ▸</button>` : ''}
          </div>
        </div>
        <aside class="cc-side">${summary()}</aside>
      </div>`;
  }

  function bar(val, max, cls = '') {
    const p = Math.max(0, Math.min(100, (val / max) * 100));
    return `<div class="cc-bar ${cls}"><i style="width:${p}%"></i></div>`;
  }

  function summary() {
    const d = derived(), r = role();
    const top = Object.entries(st.skills).filter(([, l]) => l > 0)
      .map(([n, l]) => [n, l + st.stats[SK[n].stat]]).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return `
      <div class="cc-id" style="--rc:${r ? r.color : 'var(--muted)'}">
        <div class="cc-avatar">${esc((st.handle || '?').slice(0, 2).toUpperCase())}</div>
        <div><div class="cc-handle">${esc(st.handle || 'Sans nom')}</div>
        <div class="cc-role">${r ? `${r.name} · ${r.ab} 4` : 'Rôle à choisir'}</div></div>
      </div>
      <div class="cc-mini">${STATS.map(([k, vf]) => `<div><span>${vf}</span><b>${st.stats[k]}</b></div>`).join('')}</div>
      <div class="cc-der">
        <div><span>PV</span><b>${d.hp}</b></div><div><span>Grave</span><b>${d.sw}</b></div>
        <div><span>JdS</span><b>${d.ds}</b></div><div><span>Humanité</span><b>${d.hum}</b></div>
      </div>
      <div class="cc-meter"><label>Caractéristiques <b class="${statSpent() > STAT_POINTS ? 'ko' : statSpent() === STAT_POINTS ? 'ok' : ''}">${statSpent()}/${STAT_POINTS}</b></label>${bar(statSpent(), STAT_POINTS, statSpent() > STAT_POINTS ? 'over' : '')}</div>
      <div class="cc-meter"><label>Compétences <b class="${skillSpent() > SKILL_POINTS ? 'ko' : skillSpent() === SKILL_POINTS ? 'ok' : ''}">${skillSpent()}/${SKILL_POINTS}</b></label>${bar(skillSpent(), SKILL_POINTS, skillSpent() > SKILL_POINTS ? 'over' : '')}</div>
      <div class="cc-meter"><label>Équipement <b class="${money('x') > BUDGET ? 'ko' : ''}">${money('x')}/${BUDGET} eb</b></label>${bar(money('x'), BUDGET, money('x') > BUDGET ? 'over' : '')}</div>
      <div class="cc-meter"><label>Humanité <b class="${derived().hum <= 20 ? 'ko' : ''}">${derived().hum}/${derived().humMax}</b></label>${bar(derived().hum, Math.max(1, derived().humMax), 'hum ' + (derived().hum <= 20 ? 'over' : ''))}</div>
      <div class="cc-meter"><label>Mode <b class="${money('Mode') > FASHION ? 'ko' : ''}">${money('Mode')}/${FASHION} eb</b></label>${bar(money('Mode'), FASHION, money('Mode') > FASHION ? 'over' : '')}</div>
      ${top.length ? `<div class="cc-top"><div class="cc-k">// meilleurs jets</div>${top.map(([n, v]) => `<div><span>${esc(n)}</span><b>+${v}</b></div>`).join('')}</div>` : ''}
      <p class="cc-save">● sauvegarde automatique dans ce navigateur</p>`;
  }

  const views = {
    identite: () => `
      <h2 class="cc-h">Identité</h2>
      <p class="cc-p">Qui êtes-vous dans la rue ? Le <em>handle</em> est le nom sous lequel tout Night City vous connaît.</p>
      <div class="cc-form">
        <label>Handle <span class="req">*</span>
          <div class="cc-inline"><input data-f="handle" value="${esc(st.handle)}" placeholder="ex. Kitsune" maxlength="40">
          <button class="chip-btn" data-act="name">🎲 Au hasard</button></div></label>
        <label>Nom civil<input data-f="name" value="${esc(st.name)}" placeholder="facultatif"></label>
        <label>Pronoms<input data-f="pronoms" value="${esc(st.pronoms)}" placeholder="facultatif"></label>
        <label>Notes / apparence<textarea data-f="notes" rows="4" placeholder="Silhouette, voix, chrome visible…">${esc(st.notes)}</textarea></label>
      </div>
      <div class="callout cyan"><span class="label">// MÉTHODE</span>Ce créateur suit la méthode <strong>Complete Package</strong> : ${STAT_POINTS} points de caractéristiques, ${SKILL_POINTS} points de compétences, ${BUDGET} eb d'équipement et ${FASHION} eb de mode. Voir le <a href="creation.html">module Création</a> pour les autres méthodes.</div>`,

    role: () => `
      <h2 class="cc-h">Choisir un rôle</h2>
      <p class="cc-p">Votre rôle donne une capacité unique, au rang 4 à la création. Les compétences conseillées seront mises en avant à l'étape suivante.</p>
      <div class="cc-roles">${ROLES.map(r => `
        <button class="cc-rcard ${st.role === r.id ? 'on' : ''}" data-role="${r.id}" style="--rc:${r.color}">
          <span class="nm">${r.name}${r.vf !== r.name ? ` <small>VF : ${r.vf}</small>` : ''}</span>
          <span class="ab">${r.ab}</span>
          <span class="pt">${r.pitch}</span>
        </button>`).join('')}
      </div>
      <p class="cc-p"><a href="roles.html">▸ Détail des rôles</a></p>`,

    stats: () => {
      const r = role(), left = STAT_POINTS - statSpent();
      return `
      <h2 class="cc-h">Caractéristiques</h2>
      <p class="cc-p">Répartissez <strong>${STAT_POINTS} points</strong>, de ${STAT_MIN} à ${STAT_MAX} par caractéristique. Il reste <b class="${left < 0 ? 'ko' : left === 0 ? 'ok' : 'crit'}">${left}</b> point${Math.abs(left) > 1 ? 's' : ''}.</p>
      <div class="cc-tools">
        ${r ? `<button class="chip-btn" data-act="statsRole">⚡ Répartition conseillée (${r.name})</button>` : ''}
        <button class="chip-btn" data-act="statsRand">🎲 Aléatoire</button>
        <button class="chip-btn" data-act="statsReset">↺ Tout à 6</button>
      </div>
      <div class="cc-stats">${STATS.map(([k, vf, full]) => {
        const v = st.stats[k], prio = r && r.stats.includes(k);
        return `<div class="cc-stat ${prio ? 'prio' : ''}">
          <div class="cc-sl"><b>${vf}</b><span>${full}</span>${prio ? '<i title="Importante pour ce rôle">★</i>' : ''}</div>
          <div class="cc-pips">${Array.from({ length: 10 }, (_, i) => `<button class="pip ${i < v ? 'f' : ''} ${i + 1 < STAT_MIN || i + 1 > STAT_MAX ? 'x' : ''}" data-stat="${k}" data-v="${i + 1}" aria-label="${full} ${i + 1}"></button>`).join('')}</div>
          <div class="cc-step"><button data-sd="${k}" aria-label="moins">−</button><output>${v}</output><button data-su="${k}" aria-label="plus">+</button></div>
        </div>`;
      }).join('')}</div>
      <div class="callout"><span class="label">// À SAVOIR</span>BODY et WILL font les PV, BODY la sauvegarde contre la mort, EMP l'Humanité (×10). LUCK est une réserve à dépenser à chaque séance.</div>`;
    },

    skills: () => {
      const r = role(), left = SKILL_POINTS - skillSpent();
      const q = (window.__ccq || '').toLowerCase(), f = window.__ccf || 'all';
      const cats = [...new Set(SKILLS.map(s => s[0]))];
      const rows = SKILLS.filter(([c, n, , b]) =>
        (f === 'all' || (f === 'role' ? r && r.skills.includes(n) : f === 'used' ? st.skills[n] > 0 : c === f)) &&
        (!q || n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q.normalize('NFD').replace(/[̀-ͯ]/g, ''))));
      return `
      <h2 class="cc-h">Compétences</h2>
      <p class="cc-p"><strong>${SKILL_POINTS} points</strong>, niveau ${SKILL_MAX} maximum. Les compétences de base sont à 2 minimum ; les <span class="tag amber">×2</span> coûtent double. Il reste <b class="${left < 0 ? 'ko' : left === 0 ? 'ok' : 'crit'}">${left}</b> point${Math.abs(left) > 1 ? 's' : ''}.</p>
      <div class="cc-tools">
        ${r ? `<button class="chip-btn" data-act="skillsRole">⚡ Suggestion (${r.name})</button>` : ''}
        <button class="chip-btn" data-act="skillsReset">↺ Réinitialiser</button>
      </div>
      <div class="filterbar">
        <input class="search" id="ccq" type="search" placeholder="> chercher une compétence…" value="${esc(window.__ccq || '')}">
        ${[['all', 'Toutes'], ...(r ? [['role', '★ ' + r.name]] : []), ['used', 'Choisies'], ...cats.map(c => [c, c])].map(([k, l]) =>
          `<button class="chip-btn ${f === k ? 'on' : ''}" data-filt="${k}">${l}</button>`).join('')}
      </div>
      <div class="cc-skills">${rows.map(([c, n, stat, b, x2]) => {
        const l = st.skills[n], star = r && r.skills.includes(n);
        const vf = STATS.find(s => s[0] === stat)[1];
        return `<div class="cc-sk ${l > 0 ? 'has' : ''} ${star ? 'prio' : ''}">
          <div class="nm">${star ? '<i>★</i>' : ''}${esc(n)} ${b ? '<span class="tag cyan">base</span>' : ''}${x2 ? '<span class="tag amber">×2</span>' : ''}</div>
          <div class="st">${vf} ${st.stats[stat]}</div>
          <div class="cc-step"><button data-kd="${esc(n)}" ${l <= (b ? 2 : 0) ? 'disabled' : ''}>−</button><output>${l}</output><button data-ku="${esc(n)}" ${l >= SKILL_MAX ? 'disabled' : ''}>+</button></div>
          <div class="tot" title="Caractéristique + compétence">${l > 0 ? '+' + (l + st.stats[stat]) : '—'}</div>
        </div>`;
      }).join('') || '<p class="empty-msg">// aucune compétence</p>'}</div>`;
    },

    life: () => `
      <h2 class="cc-h">Lifepath</h2>
      <p class="cc-p">Donnez une histoire à votre edgerunner. Écrivez librement, ou lancez les dés 🎲 pour une idée (suggestions maison, à adapter). Remplissez-en au moins six.</p>
      <div class="cc-tools"><button class="chip-btn" data-act="lifeAll">🎲 Tout tirer (cases vides)</button></div>
      <div class="cc-life">${LIFEPATH.map(([k, label, opts]) => `
        <label class="${opts.length ? '' : 'wide'}">${label}
          <div class="cc-inline">
            ${opts.length ? `<input data-l="${k}" value="${esc(st.life[k] || '')}" list="ll-${k}"><datalist id="ll-${k}">${opts.map(o => `<option value="${esc(o)}">`).join('')}</datalist>
            <button class="chip-btn" data-roll="${k}" aria-label="Tirer">🎲</button>`
            : `<textarea data-l="${k}" rows="2" placeholder="Qui ? Pourquoi ? Que peuvent-ils faire pour (ou contre) vous ?">${esc(st.life[k] || '')}</textarea>`}
          </div></label>`).join('')}
      </div>
      <div class="callout cyan"><span class="label">// POUR LE MJ</span>Amis et ennemis sont des PNJ prêts à l'emploi. Les tables officielles complètes sont dans le livre de base.</div>`,

    gear: () => {
      const d = derived();
      return `
      <h2 class="cc-h">Équipement</h2>
      <p class="cc-p">${BUDGET} eb pour l'équipement <em>et</em> le cyberware, plus ${FASHION} eb réservés à la mode. Les prix proposés sont <em>indicatifs</em> : modifiez-les selon votre livre. Le cyberware se pose dans l'onglet suivant, <button class="cc-link" data-go="${STEPS.findIndex(x => x[1] === 'chrome')}">Chrome ▸</button></p>
      <div class="cc-add">
        <select id="ccpreset"><option value="">+ Ajouter un objet courant…</option>${['Arme', 'Armure', 'Matériel', 'Mode'].map(c =>
          `<optgroup label="${c}">${PRESETS.map((p, i) => p[1] === c ? `<option value="${i}">${esc(p[0])} — ${p[2]} eb</option>` : '').join('')}</optgroup>`).join('')}</select>
        <button class="chip-btn" data-act="gearCustom">+ Objet personnalisé</button>
      </div>
      <div class="cc-gear">
        <div class="cc-gh"><span>Objet</span><span>Catégorie</span><span>Prix</span><span></span></div>
        ${st.gear.map((g, i) => g.cat === 'Cyberware' ? '' : `<div class="cc-gr">
          <input data-g="${i}" data-k="name" value="${esc(g.name)}" aria-label="Nom">
          <select data-g="${i}" data-k="cat">${['Arme', 'Armure', 'Matériel', 'Mode'].map(c => `<option ${g.cat === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
          <input data-g="${i}" data-k="price" type="number" min="0" value="${+g.price || 0}" aria-label="Prix">
          <button class="cc-del" data-del="${i}" aria-label="Supprimer">✕</button></div>`).join('') || '<p class="empty-msg">// inventaire vide</p>'}
        ${st.gear.some(g => g.cat === 'Cyberware') ? `<p class="cc-p" style="margin:8px 0 0"><small>+ ${st.gear.filter(g => g.cat === 'Cyberware').length} implant(s) pour ${money('x') - st.gear.filter(g => g.cat !== 'Cyberware' && g.cat !== 'Mode').reduce((a, g) => a + (+g.price || 0), 0)} eb, gérés dans l'onglet Chrome.</small></p>` : ''}
      </div>
      <div class="cc-totals">
        <div>Équipement : <b class="${money('x') > BUDGET ? 'ko' : 'ok'}">${money('x')} / ${BUDGET} eb</b> · reste ${BUDGET - money('x')} eb</div>
        <div>Mode : <b class="${money('Mode') > FASHION ? 'ko' : 'ok'}">${money('Mode')} / ${FASHION} eb</b></div>
        <div>Humanité : <b>${d.hum} / ${d.humMax}</b> → EMP actuelle <b>${d.empNow}</b>${d.empNow < st.stats.EMP ? ' <span class="ko">(baisse)</span>' : ''}</div>
      </div>`;
    },

    chrome: () => {
      const d = derived(), r = role(), fam = window.__ccfam || 'Neuralware';
      const installed = st.gear.map((g, i) => [g, i]).filter(([g]) => g.cat === 'Cyberware');
      const zones = new Set(installed.map(([g]) => (CYB[g.cid] || {}).zone || 'skin'));
      const kit = r && KITS[r.id];
      const segs = Math.max(1, st.stats.EMP);
      const empLoss = st.stats.EMP - d.empNow;
      return `
      <h2 class="cc-h">Chrome</h2>
      <p class="cc-p">Chaque implant coûte de l'argent (pris sur les ${BUDGET} eb d'équipement) et de l'<strong>Humanité</strong>. Toutes les 10 points perdus, l'EMP baisse de 1. Les options demandent leur support (un cyberœil pour une lunette de visée, un neural link pour des prises d'interface…). Prix et pertes <em>indicatifs</em>, modifiables dans la liste.</p>
      <div class="cc-tools">
        <span class="cc-seg">Perte d'Humanité :
          <button class="chip-btn ${st.hlMode !== 'des' ? 'on' : ''}" data-hlmode="fixe">Valeur fixe</button>
          <button class="chip-btn ${st.hlMode === 'des' ? 'on' : ''}" data-hlmode="des">🎲 Jet de dés</button></span>
        ${st.hlMode === 'des' && installed.length ? '<button class="chip-btn" data-act="cyReroll">🎲 Relancer tout</button>' : ''}
        ${kit ? `<button class="chip-btn" data-act="cyKit">⚡ Chrome conseillé (${r.name})</button>` : ''}
        ${installed.length ? '<button class="chip-btn" data-act="cyClear">↺ Tout retirer</button>' : ''}
      </div>
      <div class="cy-wrap">
        <div class="cy-cat">
          <div class="cy-fams">${FAMS.map(f => `<button class="chip-btn ${f === fam ? 'on' : ''}" data-fam="${f}">${f}</button>`).join('')}</div>
          <div class="cy-list">${CY.filter(c => c.fam === fam).map(c => {
            const why = cyBlock(c), n = cyCount(c.id);
            const slot = c.base && n ? `<span class="tag cyan">${cyUsed(c.id)}/${cyCap(c.id)} emplacements</span>` : '';
            return `<div class="cy-item ${n ? 'has' : ''} ${c.req ? 'opt' : ''} ${c.req && !cyCount(c.req) ? 'lock' : ''}">
              <div class="cy-top"><b>${c.req ? '↳ ' : ''}${esc(c.n)}</b>${n ? `<span class="tag cyan">×${n}</span>` : ''}${slot}</div>
              <p>${esc(c.desc)}</p>
              <div class="cy-meta"><span class="tag">${c.loc}</span><span class="num">${c.price} eb</span><span class="cy-hl">−${c.hl}${c.dice ? ` <small>(${c.dice})</small>` : ''} HUM</span>
                <span class="cy-btns">${n ? `<button class="chip-btn cy-rm" data-uncy="${c.id}" title="Retirer ${esc(c.n)}${c.base ? ' (et les options qui n\'ont plus de place)' : ''}">✕ Retirer</button>` : ''}
                ${n && why ? '' : `<button class="chip-btn cy-add" data-cy="${c.id}" ${why ? 'disabled' : ''} title="${esc(why)}">${why ? esc(why) : '+ Installer'}</button>`}</span></div>
            </div>`;
          }).join('')}</div>
        </div>
        <div class="cy-body">
          <svg viewBox="0 0 160 300" class="cy-svg" aria-label="Silhouette : zones chromées">
            <g class="z ${zones.has('back') ? 'on' : ''}"><path d="M44 78 L116 78 L124 170 L36 170 Z" class="back"/></g>
            <g class="z ${zones.has('skin') ? 'on' : ''}"><path d="M80 8 C98 8 104 22 104 38 C104 56 96 66 80 66 C64 66 56 56 56 38 C56 22 62 8 80 8 Z M50 74 L110 74 L118 168 L42 168 Z" class="skin"/></g>
            <g class="z ${zones.has('head') ? 'on' : ''}"><circle cx="80" cy="36" r="22"/></g>
            <g class="z ${zones.has('eyes') ? 'on' : ''}"><rect x="66" y="31" width="10" height="5" rx="1"/><rect x="84" y="31" width="10" height="5" rx="1"/></g>
            <g class="z ${zones.has('ears') ? 'on' : ''}"><rect x="54" y="32" width="5" height="12" rx="2"/><rect x="101" y="32" width="5" height="12" rx="2"/></g>
            <g class="z ${zones.has('torso') ? 'on' : ''}"><rect x="58" y="84" width="44" height="74" rx="4"/></g>
            <g class="z ${zones.has('arms') ? 'on' : ''}"><rect x="24" y="78" width="16" height="96" rx="7"/><rect x="120" y="78" width="16" height="96" rx="7"/></g>
            <g class="z ${zones.has('legs') ? 'on' : ''}"><rect x="50" y="176" width="24" height="112" rx="9"/><rect x="86" y="176" width="24" height="112" rx="9"/></g>
            <line x1="80" y1="58" x2="80" y2="80" class="neck"/>
          </svg>
          <div class="cy-hum">
            <div class="cy-hum-h"><span>Humanité</span><b class="${d.hum <= 20 ? 'ko' : ''}">${d.hum}<small>/${d.humMax}</small></b></div>
            <div class="cy-segs">${Array.from({ length: segs }, (_, i) => {
              const lo = i * 10, fill = Math.max(0, Math.min(10, d.hum - lo)) * 10;
              return `<i class="${lo < 20 ? 'red' : ''}"><b style="width:${fill}%"></b></i>`; }).join('')}</div>
            <div class="cy-emp">EMP <b>${st.stats.EMP}</b> → <b class="${empLoss ? 'crit' : 'ok'}">${d.empNow}</b>${empLoss ? ` <span class="crit">(−${empLoss})</span>` : ''}</div>
            ${d.hum <= 20 ? '<div class="callout red" style="margin:10px 0 0"><span class="label">// ZONE ROUGE</span>Humanité très basse : le personnage frôle la cyberpsychose.</div>' : ''}
          </div>
        </div>
      </div>
      <h3 class="cy-h3">Implants installés <small>${installed.length} · ${installed.reduce((a, [g]) => a + (+g.price || 0), 0)} eb · −${installed.reduce((a, [g]) => a + (+g.hl || 0), 0)} HUM</small></h3>
      <div class="cy-inst">${installed.map(([g, i]) => `<div class="cy-row">
          <input data-g="${i}" data-k="name" value="${esc(g.name)}" aria-label="Nom">
          <span class="tag">${esc(g.loc || '—')}</span>
          <label class="cy-num">eb<input data-g="${i}" data-k="price" type="number" min="0" value="${+g.price || 0}"></label>
          <label class="cy-num">HUM<input data-g="${i}" data-k="hl" type="number" min="0" value="${+g.hl || 0}"></label>
          <button class="cc-del" data-reroll="${i}" ${g.dice ? '' : 'disabled'} title="Relancer ${esc(g.dice || '')}">🎲</button>
          <button class="cy-minus" data-del="${i}" title="Retirer ${esc(g.name)}" aria-label="Retirer ${esc(g.name)}">−</button></div>`).join('') || '<p class="empty-msg">// aucun implant : 100 % chair et os</p>'}
        <button class="chip-btn" data-act="cyCustom" style="margin-top:8px">+ Implant personnalisé</button>
      </div>
      <div class="cc-totals">
        <div>Équipement + cyberware : <b class="${money('x') > BUDGET ? 'ko' : 'ok'}">${money('x')} / ${BUDGET} eb</b> · reste ${BUDGET - money('x')} eb</div>
      </div>
      <p class="cc-p"><a href="cyberware.html">▸ Module Cyberware &amp; Humanité</a> (familles, cyberpsychose, implants des DLC)</p>`;
    },

    sheet: () => {
      const r = role(), d = derived();
      const missing = STEPS.slice(0, -1).filter((_, i) => !stepOk(i)).map(s => s[0]);
      const sk = SKILLS.filter(s => st.skills[s[1]] > 0);
      const armor = st.gear.filter(g => g.cat === 'Armure'), weap = st.gear.filter(g => g.cat === 'Arme');
      const cyber = st.gear.filter(g => g.cat === 'Cyberware'), other = st.gear.filter(g => g.cat === 'Matériel' || g.cat === 'Mode');
      return `
      <div class="cc-sheet-head">
        <h2 class="cc-h">Fiche</h2>
        <div class="cc-tools">
          <button class="chip-btn" data-act="print">⎙ Imprimer / PDF</button>
          <button class="chip-btn" data-act="export">⇩ Exporter (.json)</button>
          <label class="chip-btn cc-file">⇧ Importer<input type="file" accept=".json,application/json" id="ccimport"></label>
          <button class="chip-btn" data-act="copy">⧉ Copier en texte</button>
          <button class="chip-btn" data-act="new">✚ Nouveau</button>
        </div>
      </div>
      ${missing.length ? `<div class="callout red"><span class="label">// INCOMPLET</span>À finaliser : ${missing.join(', ')}.</div>` : '<div class="callout cyan"><span class="label">// PRÊT</span>Edgerunner prêt pour Night City. Bonne chance, choom.</div>'}
      <article class="cc-sheet" style="--rc:${r ? r.color : 'var(--red)'}">
        <header class="cs-top">
          <div class="cs-badge">${esc((st.handle || '?').slice(0, 2).toUpperCase())}</div>
          <div class="cs-who"><div class="cs-handle">${esc(st.handle || 'Sans nom')}</div>
            <div class="cs-sub">${esc(st.name)}${st.name && st.pronoms ? ' · ' : ''}${esc(st.pronoms)}</div>
            <div class="cs-role">${r ? `${r.name.toUpperCase()} // ${r.ab} rang 4` : 'RÔLE NON DÉFINI'}</div></div>
          <div class="cs-code">NC-ID<br>${Math.abs([...(st.handle || 'x')].reduce((a, c) => a * 31 + c.charCodeAt(0) | 0, 7)).toString(16).toUpperCase().slice(0, 8).padStart(8, '0')}</div>
        </header>
        <div class="cs-stats">${STATS.map(([k, vf]) => `<div><span>${vf}</span><b>${k === 'EMP' && d.empNow !== st.stats.EMP ? `${d.empNow}<small>/${st.stats.EMP}</small>` : st.stats[k]}</b></div>`).join('')}</div>
        <div class="cs-der">
          <div><span>Points de vie</span><b>${d.hp}</b></div><div><span>Blessure grave</span><b>${d.sw}</b></div>
          <div><span>Sauvegarde mort</span><b>${d.ds}</b></div><div><span>Humanité</span><b>${d.hum}<small>/${d.humMax}</small></b></div>
        </div>
        <div class="cs-cols">
          <section><h3>Compétences</h3>
            <div class="cs-skills">${sk.map(([c, n, stat]) => `<div><span>${esc(n)}</span><i>${st.skills[n]}</i><b>+${st.skills[n] + st.stats[stat]}</b></div>`).join('')}</div>
          </section>
          <section>
            <h3>Armes</h3>${weap.length ? weap.map(g => `<div class="cs-line">${esc(g.name)}</div>`).join('') : '<div class="cs-line muted">—</div>'}
            <h3>Armure</h3>${armor.length ? armor.map(g => `<div class="cs-line">${esc(g.name)}</div>`).join('') : '<div class="cs-line muted">—</div>'}
            <h3>Cyberware</h3>${cyber.length ? cyber.map(g => `<div class="cs-line">${esc(g.name)} <small>−${+g.hl || 0} HUM${g.dice ? ' (' + g.dice + ')' : ''}${g.loc ? ' · ' + g.loc : ''}</small></div>`).join('') : '<div class="cs-line muted">—</div>'}
            <h3>Matériel &amp; mode</h3>${other.length ? other.map(g => `<div class="cs-line">${esc(g.name)}</div>`).join('') : '<div class="cs-line muted">—</div>'}
            <div class="cs-line"><small>Reste en poche : ${Math.max(0, BUDGET - money('x'))} eb</small></div>
          </section>
        </div>
        <section class="cs-life"><h3>Lifepath</h3>
          <dl>${LIFEPATH.filter(([k]) => (st.life[k] || '').trim()).map(([k, l]) => `<dt>${l}</dt><dd>${esc(st.life[k])}</dd>`).join('') || '<dd class="muted">—</dd>'}</dl>
          ${st.notes ? `<p class="cs-notes">${esc(st.notes)}</p>` : ''}
        </section>
        <footer class="cs-foot">DATASHARD // EDGERUNNER — fiche générée pour Cyberpunk RED (fan-made, non officiel)</footer>
      </article>`;
    },
  };

  /* ------------------------------------------------ Actions */
  function setStat(k, v) { st.stats[k] = Math.max(STAT_MIN, Math.min(STAT_MAX, v)); }
  const actions = {
    name: () => { st.handle = pick(NAMES1) + (Math.random() < .55 ? '' : ' ' + pick(NAMES2.filter(Boolean))); },
    statsReset: () => STATS.forEach(([k]) => (st.stats[k] = 6)),
    statsRole: () => {
      const r = role(); const vals = [8, 8, 7, 7]; const rest = [6, 6, 5, 5, 5, 5];
      const others = STATS.map(s => s[0]).filter(k => !r.stats.includes(k));
      r.stats.forEach((k, i) => (st.stats[k] = vals[i]));
      others.forEach((k, i) => (st.stats[k] = rest[i]));
    },
    statsRand: () => {
      STATS.forEach(([k]) => (st.stats[k] = STAT_MIN));
      let left = STAT_POINTS - STAT_MIN * STATS.length;
      while (left > 0) { const k = pick(STATS)[0]; if (st.stats[k] < STAT_MAX) { st.stats[k]++; left--; } }
    },
    skillsReset: () => SKILLS.forEach(s => (st.skills[s[1]] = s[3] ? 2 : 0)),
    skillsRole: () => {
      actions.skillsReset();
      const r = role();
      // monte les compétences du rôle par tours, sans dépasser le budget
      let changed = true;
      while (changed) {
        changed = false;
        for (const n of r.skills) {
          if (st.skills[n] < SKILL_MAX && skillSpent() + (SK[n].x2 ? 2 : 1) <= SKILL_POINTS) { st.skills[n]++; changed = true; }
        }
      }
      // complète les bases avec le reste
      const bases = SKILLS.filter(s => s[3]).map(s => s[1]);
      changed = true;
      while (changed && skillSpent() < SKILL_POINTS) {
        changed = false;
        for (const n of bases) if (st.skills[n] < 4 && skillSpent() < SKILL_POINTS) { st.skills[n]++; changed = true; }
      }
    },
    lifeAll: () => LIFEPATH.forEach(([k, , o]) => { if (o.length && !(st.life[k] || '').trim()) st.life[k] = pick(o); }),
    gearCustom: () => st.gear.push({ name: 'Nouvel objet', cat: 'Matériel', price: 0, hl: 0 }),
    cyCustom: () => st.gear.push({ name: 'Implant personnalisé', cat: 'Cyberware', price: 0, hl: 0, loc: 'Clinique' }),
    cyKit: () => { const k = KITS[st.role] || []; let n = 0; k.forEach(id => { if (cyAdd(id)) n++; }); toast(n ? `${n} implant(s) installé(s)` : 'Rien à ajouter'); },
    cyClear: () => { st.gear = st.gear.filter(g => g.cat !== 'Cyberware'); },
    cyReroll: () => st.gear.forEach(g => { if (g.cat === 'Cyberware' && g.dice) g.hl = rollDice(g.dice); }),
    print: () => window.print(),
    export: () => {
      const blob = new Blob([JSON.stringify(st, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = (st.handle || 'edgerunner').replace(/[^\w-]+/g, '_') + '.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    },
    copy: () => {
      const r = role(), d = derived();
      const txt = [`${st.handle} — ${r ? r.name + ' (' + r.ab + ' 4)' : ''}`,
        STATS.map(([k, vf]) => `${vf} ${st.stats[k]}`).join(' · '),
        `PV ${d.hp} · Grave ${d.sw} · JdS ${d.ds} · Humanité ${d.hum}/${d.humMax}`,
        'Compétences : ' + SKILLS.filter(s => st.skills[s[1]] > 0).map(s => `${s[1]} ${st.skills[s[1]]} (+${st.skills[s[1]] + st.stats[s[2]]})`).join(', '),
        'Équipement : ' + st.gear.map(g => g.name).join(', ')].join('\n');
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(
        () => toast('Fiche copiée dans le presse-papiers'), () => toast('Copie impossible dans ce navigateur'));
    },
    new: () => { if (confirmNew()) { st = blank(); step = 0; } },
  };
  let armed = false;
  function confirmNew() {
    if (armed) { armed = false; return true; }
    armed = true; toast('Cliquez encore sur « Nouveau » pour tout effacer'); setTimeout(() => (armed = false), 3000); return false;
  }
  function toast(msg) {
    let t = $('.cc-toast'); if (!t) { t = document.createElement('div'); t.className = 'cc-toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2400);
  }

  function refreshSide() { $('.cc-side', root).innerHTML = summary(); }
  function update(full = true) { save(); if (full) { const y = window.scrollY; render(); window.scrollTo(0, y); } else refreshSide(); }

  root.addEventListener('click', e => {
    const t = e.target.closest('button, [data-go]'); if (!t) return;
    const ds = t.dataset;
    if (ds.go !== undefined) { step = +ds.go; render(); root.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if (ds.act) { actions[ds.act](); return update(); }
    if (ds.role) { st.role = ds.role; return update(); }
    if (ds.stat) { setStat(ds.stat, +ds.v); return update(); }
    if (ds.su) { setStat(ds.su, st.stats[ds.su] + 1); return update(); }
    if (ds.sd) { setStat(ds.sd, st.stats[ds.sd] - 1); return update(); }
    if (ds.ku) { const n = ds.ku; if (st.skills[n] < SKILL_MAX) st.skills[n]++; return update(); }
    if (ds.kd) { const n = ds.kd; if (st.skills[n] > (SK[n].base ? 2 : 0)) st.skills[n]--; return update(); }
    if (ds.filt) { window.__ccf = ds.filt; return update(); }
    if (ds.roll) { const l = LIFEPATH.find(x => x[0] === ds.roll); st.life[ds.roll] = pick(l[2]); return update(); }
    if (ds.del !== undefined) { st.gear.splice(+ds.del, 1); cyPrune(); return update(); }
    if (ds.uncy) {
      const i = st.gear.map(g => g.cid).lastIndexOf(ds.uncy);
      if (i >= 0) { const nm = st.gear[i].name; st.gear.splice(i, 1); cyPrune(); toast(nm + ' retiré'); }
      return update();
    }
    if (ds.cy) { if (!cyAdd(ds.cy)) toast(cyBlock(CYB[ds.cy])); return update(); }
    if (ds.fam) { window.__ccfam = ds.fam; return update(); }
    if (ds.hlmode) {
      st.hlMode = ds.hlmode;
      st.gear.forEach(g => { if (g.cid && CYB[g.cid]) g.hl = ds.hlmode === 'des' ? rollDice(g.dice) : CYB[g.cid].hl; });
      return update();
    }
    if (ds.reroll !== undefined) { const g = st.gear[+ds.reroll]; g.hl = rollDice(g.dice); toast(`${g.name} : −${g.hl} Humanité`); return update(); }
  });

  root.addEventListener('input', e => {
    const t = e.target, ds = t.dataset;
    if (ds.f) { st[ds.f] = t.value; return update(false); }
    if (ds.l) { st.life[ds.l] = t.value; return update(false); }
    if (t.id === 'ccq') {
      window.__ccq = t.value; const pos = t.selectionStart; update();
      const n = $('#ccq', root); n.focus(); n.setSelectionRange(pos, pos); return;
    }
    if (ds.g !== undefined) {
      const g = st.gear[+ds.g]; g[ds.k] = (ds.k === 'price' || ds.k === 'hl') ? Math.max(0, +t.value || 0) : t.value;
      if (ds.k === 'cat') { if (g.cat !== 'Cyberware') g.hl = 0; return update(); }
      return update(false);
    }
  });

  root.addEventListener('change', e => {
    const t = e.target;
    if (t.id === 'ccpreset' && t.value !== '') {
      const p = PRESETS[+t.value]; st.gear.push({ name: p[0], cat: p[1], price: p[2], hl: p[3] }); return update();
    }
    if (t.id === 'ccimport' && t.files[0]) {
      const fr = new FileReader();
      fr.onload = () => {
        try { const o = JSON.parse(fr.result); if (!o.stats || !o.skills) throw 0; st = Object.assign(blank(), o); update(); toast('Personnage importé'); }
        catch (err) { toast('Fichier invalide'); }
      };
      fr.readAsText(t.files[0]);
    }
  });

  // Rendu initial : reprendre où on en était
  if (st.role) step = 1;
  render();
})();
