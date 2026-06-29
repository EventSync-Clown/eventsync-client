/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
      ]
    }]
  }
}


export default nextConfig
