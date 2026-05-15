export default function Home() {
  const routes = [
    { method: 'GET',   path: '/api/events',                            desc: 'Liste tous les événements' },
    { method: 'GET',   path: '/api/events/:id',                        desc: 'Détail d\'un événement + sessions' },
    { method: 'GET',   path: '/api/sessions',                          desc: 'Liste les sessions (?eventId, ?roomId)' },
    { method: 'GET',   path: '/api/sessions/live',                     desc: 'Sessions en cours (live)' },
    { method: 'GET',   path: '/api/sessions/:id',                      desc: 'Détail d\'une session + questions' },
    { method: 'GET',   path: '/api/sessions/:id/questions',            desc: 'Questions d\'une session (triées par upvotes)' },
    { method: 'POST',  path: '/api/sessions/:id/questions',            desc: 'Poser une question (session live uniquement)' },
    { method: 'PATCH', path: '/api/questions/:id/upvote',              desc: 'Upvoter une question' },
    { method: 'GET',   path: '/api/speakers',                          desc: 'Liste tous les chefs' },
    { method: 'GET',   path: '/api/speakers/:id',                      desc: 'Profil d\'un chef + ses sessions' },
    { method: 'GET',   path: '/api/rooms',                             desc: 'Liste toutes les salles' },
    { method: 'GET',   path: '/api/rooms/:id',                         desc: 'Détail d\'une salle + ses sessions' },
  ]

  const colors: Record<string, string> = {
    GET: '#2e7d32', POST: '#1565c0', PATCH: '#e65100', DELETE: '#c62828',
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 4 }}>🍳 EventSync API</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>
        Backend Next.js Route Handlers — Atelier Gastronomique 2025
      </p>

      <h2 style={{ fontSize: '1rem', marginBottom: 12, color: '#333' }}>Endpoints disponibles</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>Méthode</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>Route</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '7px 12px', border: '1px solid #ddd' }}>
                <span style={{ color: colors[r.method] ?? '#333', fontWeight: 'bold' }}>{r.method}</span>
              </td>
              <td style={{ padding: '7px 12px', border: '1px solid #ddd', color: '#1a1a1a' }}>{r.path}</td>
              <td style={{ padding: '7px 12px', border: '1px solid #ddd', color: '#555' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: '1rem', marginTop: 32, marginBottom: 8, color: '#333' }}>
        Format de réponse
      </h2>
      <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 6, fontSize: '0.8rem' }}>
{`// Succès
{ "success": true, "data": { ... } }

// Erreur
{ "success": false, "error": "Message d'erreur" }`}
      </pre>

      <h2 style={{ fontSize: '1rem', marginTop: 24, marginBottom: 8, color: '#333' }}>
        POST /api/sessions/:id/questions — body attendu
      </h2>
      <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 6, fontSize: '0.8rem' }}>
{`{
  "content": "Quel couteau utiliser pour la brunoise ?",
  "authorName": "Sophie"   // optionnel — anonyme si absent
}`}
      </pre>
    </div>
  )
}
