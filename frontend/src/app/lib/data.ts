

export const events = [
  {
    id: 1,
    title: "Festival Gastronomique La Table",
    description: "Une immersion culinaire unique réunissant chefs, dégustations et ateliers gastronomiques.",
    location: "CCI Ivato",
    startDate: "2026-05-14",
    endDate: "2026-05-16",
  },

];

export const sessions = [
  {
    id: 1,
    title: "Cuisine Fusion Malagasy",
    description: "L'art de marier les épices locales aux techniques modernes.",
    speaker: { 
      name: "Chef Andry", 
      role: "Maître Saucière",
      bio: "Expert en saveurs endémiques de Madagascar."
    },
    room: "Atelier Gourmet",
    start: "09:00",
    end: "10:00",
    live: true,
    upvotes: 24,
    eventId: 1
  },
  {
    id: 2,
    title: "L’Art du Dressage Moderne",
    description: "Sublimer vos plats par une esthétique minimaliste et élégante.",
    speaker: { 
      name: "Chef Sarah", 
      role: "Designer Culinaire",
      bio: "Ancienne sous-chef de palaces parisiens."
    },
    room: "Salle Prestige",
    start: "10:30",
    end: "11:30",
    live: false,
    upvotes: 15,
    eventId: 1
  },
  {
    id: 3,
    title: "Desserts & Créativité",
    description: "Techniques avancées en pâtisserie fine et associations de textures.",
    speaker: { 
      name: "Chef Miora", 
      role: "Chef Pâtissière",
      bio: "Spécialiste du chocolat et des fruits tropicaux."
    },
    room: "Studio Sucré",
    start: "13:00",
    end: "14:00",
    live: false,
    upvotes: 42,
    eventId: 1
  },
  {
    id: 4,
    title: "Mixologie & Épices",
    description: "Création de cocktails signatures à base de vanille et poivre sauvage.",
    speaker: { 
      name: "Rindra Barman", 
      role: "Mixologue Senior",
      bio: "Champion régional de mixologie."
    },
    room: "Le Lounge",
    start: "15:00",
    end: "16:00",
    live: false,
    upvotes: 18,
    eventId: 1
  },
  {
    id: 5,
    title: "Street Food de Luxe",
    description: "Réinventer les classiques de rue avec des ingrédients nobles.",
    speaker: { 
      name: "Chef Toky", 
      role: "Street-Food Stylist",
      bio: "Explorateur de saveurs urbaines."
    },
    room: "Atelier Gourmet",
    start: "16:30",
    end: "17:30",
    live: false,
    upvotes: 31,
    eventId: 1
  },
  {
    id: 6,
    title: "Secrets du Riz Malagasy",
    description: "Atelier sur les variétés de riz et les modes de cuisson ancestraux.",
    speaker: { 
      name: "Mme Voary", 
      role: "Gardienne des Traditions",
      bio: "Ethno-gastronome passionnée."
    },
    room: "Salle Tradition",
    start: "09:00",
    end: "10:30",
    live: false,
    upvotes: 56,
    eventId: 1
  },
  {
    id: 7,
    title: "Vin & Terroir Rouge",
    description: "Dégustation comparative des meilleurs crus des hauts plateaux.",
    speaker: { 
      name: "Eric Sommelier", 
      role: "Sommelier Conseil",
      bio: "Expert en œnologie tropicale."
    },
    room: "Cave d'Exception",
    start: "18:00",
    end: "19:30",
    live: false,
    upvotes: 27,
    eventId: 1
  },
  {
    id: 8,
    title: "Zébu & Basse Température",
    description: "Maîtriser la tendreté de la viande locale par la cuisson sous-vide.",
    speaker: { 
      name: "Chef Andry", 
      role: "Maître Saucière",
      bio: "Expert en saveurs endémiques."
    },
    room: "Atelier Gourmet",
    start: "11:00",
    end: "12:30",
    live: false,
    upvotes: 68,
    eventId: 1
  }
];