export const metadata = { title: 'EventSync API' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'monospace', padding: '2rem', background: '#fafafa' }}>
        {children}
      </body>
    </html>
  )
}
