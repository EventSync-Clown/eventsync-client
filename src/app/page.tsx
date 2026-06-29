import Link from 'next/link'

export default function Home() {
  const endpoints = [
    { method: 'GET', path: '/api/events', description: 'Liste tous les événements' },
    { method: 'GET', path: '/api/events/:id', description: 'Détail d\'un événement + sessions' },
    { method: 'GET', path: '/api/sessions', description: 'Liste les sessions (filtres: ?eventId=, ?roomId=)' },
    { method: 'GET', path: '/api/sessions/live', description: 'Sessions en cours (live)' },
    { method: 'GET', path: '/api/sessions/:id', description: 'Détail complet + flag isLive' },
    { method: 'GET', path: '/api/sessions/:id/questions', description: 'Questions triées par upvotes' },
    { method: 'POST', path: '/api/sessions/:id/questions', description: 'Poser une question (live uniquement)' },
    { method: 'PATCH', path: '/api/questions/:id/upvote', description: 'Upvoter une question' },
    { method: 'GET', path: '/api/speakers', description: 'Liste tous les chefs' },
    { method: 'GET', path: '/api/speakers/:id', description: 'Profil d\'un chef + ses sessions' },
    { method: 'GET', path: '/api/rooms', description: 'Liste toutes les salles' },
    { method: 'GET', path: '/api/rooms/:id', description: 'Détail d\'une salle + sessions avec isLive' },
  ]

  return (
    <div>
       <h1>EventSync API</h1>
      <p>Backend API is running.</p>
    </div>
  )
}