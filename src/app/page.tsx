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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            🍳 EventSync API
          </h1>
          <p className="text-xl text-amber-700">
            TENDA-KANINA — Backend Next.js
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              API en ligne
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-amber-800 text-white px-6 py-4">
            <h2 className="text-2xl font-semibold">📡 Endpoints disponibles</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-amber-900">Méthode</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-amber-900">Route</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-amber-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {endpoints.map((endpoint, index) => (
                  <tr key={index} className="hover:bg-amber-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {endpoint.path}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{endpoint.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">📝 Exemple POST question</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`POST /api/sessions/:id/questions
Content-Type: application/json

{
  "content": "Quel couteau utiliser pour la brunoise ?",
  "authorName": "Sophie"
}`}
            </pre>
            <p className="text-sm text-gray-500 mt-2">
              ℹ️ <code className="text-xs">authorName</code> est optionnel — anonyme si absent
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">📦 Format de réponse</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`// Succès
{
  "success": true,
  "data": { ... }
}

// Erreur
{
  "success": false,
  "error": "Message d'erreur"
}`}
            </pre>
          </div>
        </div>

        <div className="mt-8 text-center text-amber-600 text-sm">
          <p>🚀 Built with Next.js 14, Prisma, PostgreSQL</p>
        </div>
      </div>
    </div>
  )
}