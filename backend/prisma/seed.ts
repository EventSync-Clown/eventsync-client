import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.question.deleteMany()
  await prisma.speakerOnSession.deleteMany()
  await prisma.session.deleteMany()
  await prisma.speaker.deleteMany()
  await prisma.room.deleteMany()
  await prisma.event.deleteMany()

  // Create Event
  const event = await prisma.event.create({
    data: {
      title: 'Atelier Gastronomique 2025',
      description: 'Le plus grand rassemblement de chefs étoilés et d\'experts en gastronomie. Au programme : démonstrations, ateliers pratiques et dégustations.',
      startDate: new Date('2025-05-15T09:00:00Z'),
      endDate: new Date('2025-05-17T18:00:00Z'),
      location: 'Palais des Congrès, Paris',
    },
  })

  // Create Rooms
  const mainRoom = await prisma.room.create({
    data: { name: 'Cuisine Principale' },
  })
  const pastryRoom = await prisma.room.create({
    data: { name: 'Atelier Pâtisserie' },
  })
  const tastingRoom = await prisma.room.create({
    data: { name: 'Salle de Dégustation' },
  })

  // Create Speakers
  const marie = await prisma.speaker.create({
    data: {
      name: 'Marie Dupont',
      photoUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      bio: 'Chef étoilée Michelin, spécialiste de la cuisine française contemporaine.',
      externalUrl: 'https://twitter.com/mariedupont',
    },
  })
  const jeanLuc = await prisma.speaker.create({
    data: {
      name: 'Jean-Luc Martin',
      photoUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
      bio: 'Meilleur ouvrier de France, expert en boulangerie et viennoiserie.',
      externalUrl: 'https://linkedin.com/in/jeanlucmartin',
    },
  })
  const amina = await prisma.speaker.create({
    data: {
      name: 'Amina Belhaj',
      photoUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
      bio: 'Chef pâtissière primée, fusion franco-marocaine.',
      externalUrl: 'https://instagram.com/aminabelhaj',
    },
  })
  const pierre = await prisma.speaker.create({
    data: {
      name: 'Pierre Lefebvre',
      photoUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      bio: 'Sommelier international, consultant en accords mets et vins.',
      externalUrl: 'https://pierrelefebvre.com',
    },
  })

  // Create Sessions
  const now = new Date()
  const liveStart = new Date(now)
  liveStart.setHours(now.getHours() - 1)
  const liveEnd = new Date(now)
  liveEnd.setHours(now.getHours() + 1)

  const session1 = await prisma.session.create({
    data: {
      title: 'Les secrets de la cuisine moléculaire',
      description: 'Découvrez les techniques innovantes qui transforment les textures et les saveurs.',
      startTime: liveStart,
      endTime: liveEnd,
      capacity: 50,
      eventId: event.id,
      roomId: mainRoom.id,
      speakers: {
        create: [{ speakerId: marie.id }],
      },
    },
  })

  const session2 = await prisma.session.create({
    data: {
      title: "L'art du croissant parfait",
      description: 'Maîtrisez le feuilletage et obtenez des croissants dignes des meilleures boulangeries.',
      startTime: new Date('2025-05-15T10:00:00Z'),
      endTime: new Date('2025-05-15T12:00:00Z'),
      capacity: 30,
      eventId: event.id,
      roomId: pastryRoom.id,
      speakers: {
        create: [{ speakerId: jeanLuc.id }],
      },
    },
  })

  const session3 = await prisma.session.create({
    data: {
      title: 'Pâtisserie orientale revisitée',
      description: 'Un voyage gustatif entre tradition et modernité.',
      startTime: new Date('2025-05-15T14:00:00Z'),
      endTime: new Date('2025-05-15T16:00:00Z'),
      capacity: 40,
      eventId: event.id,
      roomId: pastryRoom.id,
      speakers: {
        create: [{ speakerId: amina.id }],
      },
    },
  })

  const session4 = await prisma.session.create({
    data: {
      title: 'Accords mets et vins',
      description: "Apprenez à sublimer vos plats avec les bonnes associations d'alcools.",
      startTime: new Date('2025-05-16T11:00:00Z'),
      endTime: new Date('2025-05-16T13:00:00Z'),
      capacity: 60,
      eventId: event.id,
      roomId: tastingRoom.id,
      speakers: {
        create: [{ speakerId: pierre.id }],
      },
    },
  })

  const session5 = await prisma.session.create({
    data: {
      title: 'Démonstration : Cuisine en direct',
      description: 'Marie Dupont prépare son plat signature en direct.',
      startTime: new Date('2025-05-16T15:00:00Z'),
      endTime: new Date('2025-05-16T17:00:00Z'),
      capacity: 80,
      eventId: event.id,
      roomId: mainRoom.id,
      speakers: {
        create: [{ speakerId: marie.id }],
      },
    },
  })

  const session6 = await prisma.session.create({
    data: {
      title: 'Table ronde : L\'avenir de la gastronomie',
      description: 'Débat avec nos chefs sur les tendances culinaires de demain.',
      startTime: new Date('2025-05-17T10:00:00Z'),
      endTime: new Date('2025-05-17T12:00:00Z'),
      capacity: 100,
      eventId: event.id,
      roomId: mainRoom.id,
      speakers: {
        create: [
          { speakerId: marie.id },
          { speakerId: amina.id },
          { speakerId: pierre.id },
        ],
      },
    },
  })

  const session7 = await prisma.session.create({
    data: {
      title: 'Atelier : Créez votre propre fromage',
      description: 'Initiation à la fromagerie artisanale.',
      startTime: new Date('2025-05-17T14:00:00Z'),
      endTime: new Date('2025-05-17T16:00:00Z'),
      capacity: 25,
      eventId: event.id,
      roomId: tastingRoom.id,
      speakers: {
        create: [{ speakerId: pierre.id }],
      },
    },
  })

  // Create demo questions for live session
  await prisma.question.createMany({
    data: [
      {
        content: 'Quelle est la différence entre la cuisine moléculaire et la gastronomie moderne ?',
        authorName: 'Sophie',
        upvotes: 12,
        sessionId: session1.id,
      },
      {
        content: 'Avez-vous des recommandations de livres sur ce sujet ?',
        authorName: null,
        upvotes: 5,
        sessionId: session1.id,
      },
      {
        content: 'Peut-on appliquer ces techniques chez soi avec du matériel basique ?',
        authorName: 'Thomas',
        upvotes: 8,
        sessionId: session1.id,
      },
    ],
  })

  console.log('✅ Seed completed!')
  console.log(`📅 Event: ${event.title}`)
  console.log(`🎤 Speakers: ${[marie.name, jeanLuc.name, amina.name, pierre.name].join(', ')}`)
  console.log(`🎙️ Live session: ${session1.title}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })