import db from '@/lib/db'

export async function GET() {
  // Fetch all characters from the DB
  const stmt = db.prepare('SELECT * FROM characters')
  const characters = stmt.all()

  // Respond with the data in JSON format
  return new Response(JSON.stringify(characters), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
