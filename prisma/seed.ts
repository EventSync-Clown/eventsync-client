import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Nettoyage
  await prisma.question.deleteMany()
  await prisma.sessionSpeaker.deleteMany()
  await prisma.session.deleteMany()
  await prisma.speaker.deleteMany()
  await prisma.room.deleteMany()
  await prisma.event.deleteMany()

  // Salles
  const cuisine     = await prisma.room.create({ data: { name: 'Cuisine Principale' } })
  const patisserie  = await prisma.room.create({ data: { name: 'Atelier Pâtisserie' } })
  const degustation = await prisma.room.create({ data: { name: 'Salle de Dégustation' } })

  // Chefs
  const chef1 = await prisma.speaker.create({
    data: {
      name: 'Marie Dupont',
      photo: 'https://i.pravatar.cc/300?img=47',
      bio: "Chef étoilée avec 15 ans d'expérience en cuisine française. Passionnée par la cuisine de terroir et les techniques modernes.",
      links: { instagram: 'https://instagram.com', website: 'https://example.com' },
    },
  })
  const chef2 = await prisma.speaker.create({
    data: {
      name: 'Jean-Luc Martin',
      photo: 'https://i.pravatar.cc/300?img=12',
      bio: 'Pâtissier MOF (Meilleur Ouvrier de France) spécialisé dans la pâtisserie contemporaine et le chocolat.',
      links: { instagram: 'https://instagram.com' },
    },
  })
  const chef3 = await prisma.speaker.create({
    data: {
      name: 'Amina Belhaj',
      photo: 'https://i.pravatar.cc/300?img=32',
      bio: "Cheffe spécialisée dans les cuisines méditerranéennes et les épices du monde. Auteure de 3 livres de cuisine.",
      links: { website: 'https://example.com', instagram: 'https://instagram.com' },
    },
  })
  const chef4 = await prisma.speaker.create({
    data: {
      name: 'Pierre Lefebvre',
      photo: 'https://i.pravatar.cc/300?img=55',
      bio: 'Expert en fermentation et cuisine végétale. Pionnier de la gastronomie durable en France.',
      links: { instagram: 'https://instagram.com' },
    },
  })

  // Helper heure
  const todayAt = (h: number, m: number) => {
    const d = new Date()
    d.setHours(h, m, 0, 0)
    return d
  }

  // Événement
  const event = await prisma.event.create({
    data: {
      title: 'Atelier Gastronomique 2025',
      description: "Une journée immersive dans l'univers de la gastronomie française et internationale. Découvrez les secrets des grands chefs, apprenez des techniques professionnelles et laissez-vous guider dans une aventure culinaire exceptionnelle.",
      startDate: todayAt(9, 0),
      endDate:   todayAt(18, 0),
      location:  'Palais de la Gastronomie, Lyon',
    },
  })

  // Sessions
  const s1 = await prisma.session.create({ data: { title: 'Les Bases des Sauces Françaises',      description: 'Maîtrisez les 5 sauces mères de la cuisine française.',                           startTime: todayAt(9,  30), endTime: todayAt(11,  0), capacity: 20, eventId: event.id, roomId: cuisine.id } })
  const s2 = await prisma.session.create({ data: { title: 'Croissants & Viennoiseries Maison',     description: 'Apprenez la technique du tourage et réalisez des croissants maison.',              startTime: todayAt(9,  30), endTime: todayAt(11, 30), capacity: 15, eventId: event.id, roomId: patisserie.id } })
  const s3 = await prisma.session.create({ data: { title: 'Dégustation : Accords Mets & Vins',    description: "Découvrez l'art des accords entre les plats et une sélection de vins de terroir.", startTime: todayAt(11, 30), endTime: todayAt(12, 30), capacity: 30, eventId: event.id, roomId: degustation.id } })
  const s4 = await prisma.session.create({ data: { title: 'Tajine & Épices du Monde',              description: "Plongez dans les cuisines d'Afrique du Nord et du Moyen-Orient.",                 startTime: todayAt(14,  0), endTime: todayAt(16,  0), capacity: 20, eventId: event.id, roomId: cuisine.id } })
  const s5 = await prisma.session.create({ data: { title: 'Entremets & Mousses au Chocolat',       description: 'Créez des entremets avec chocolat tempéré et glaçages miroir.',                    startTime: todayAt(14,  0), endTime: todayAt(16, 30), capacity: 12, eventId: event.id, roomId: patisserie.id } })
  const s6 = await prisma.session.create({ data: { title: 'Fermentation & Cuisine Végétale',       description: 'Explorez kimchi, kombucha et miso maison.',                                        startTime: todayAt(16, 30), endTime: todayAt(18,  0), capacity: 25, eventId: event.id, roomId: cuisine.id } })

  // Session live (commence 20 min avant maintenant, finit dans 40 min)
  const now = new Date()
  const liveSession = await prisma.session.create({
    data: {
      title:       'Knife Skills & Découpes Professionnelles',
      description: 'Brunoise, julienne, chiffonnade... les découpes essentielles des chefs professionnels.',
      startTime:   new Date(now.getTime() - 20 * 60_000),
      endTime:     new Date(now.getTime() + 40 * 60_000),
      capacity:    18,
      eventId:     event.id,
      roomId:      cuisine.id,
    },
  })

  // Assignation chefs ↔ sessions
  await prisma.sessionSpeaker.createMany({
    data: [
      { sessionId: s1.id,          speakerId: chef1.id },
      { sessionId: s2.id,          speakerId: chef2.id },
      { sessionId: s3.id,          speakerId: chef1.id },
      { sessionId: s3.id,          speakerId: chef3.id },
      { sessionId: s4.id,          speakerId: chef3.id },
      { sessionId: s5.id,          speakerId: chef2.id },
      { sessionId: s6.id,          speakerId: chef4.id },
      { sessionId: liveSession.id, speakerId: chef1.id },
      { sessionId: liveSession.id, speakerId: chef3.id },
    ],
  })

  // Questions de démo sur la session live
  await prisma.question.createMany({
    data: [
      { content: 'Quel est le meilleur couteau pour débuter en cuisine ?',                      authorName: 'Sophie', upvotes: 7, sessionId: liveSession.id },
      { content: 'Comment aiguiser un couteau à la maison sans pierre à aiguiser ?',            authorName: null,     upvotes: 4, sessionId: liveSession.id },
      { content: 'Quelle est la différence entre la julienne et la brunoise en utilisation ?',  authorName: 'Thomas', upvotes: 2, sessionId: liveSession.id },
    ],
  })

  console.log('✅ Seed terminé avec succès !')
  console.log(`📅 Événement : ${event.title}`)
  console.log(`👨‍🍳 ${4} chefs | 🍳 ${7} sessions | 🔴 1 session live`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
