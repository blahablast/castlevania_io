import db from '@/lib/db'

export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const { name, description, game, img_url } = await req.json()

    // Check if a character with the same name already exists
    const existingCharacter = db
      .prepare('SELECT id FROM characters WHERE name = ?')
      .get(name)

    if (existingCharacter) {
      // If a character already exists, return an error res
      return new Response(
        JSON.stringify({
          error: 'Character with the same name already exists',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Prepare the SQL statement to insert the new character
    // The ? is a placeholder for parameterized queries, which prevent SQL injections.
    const stmt = db.prepare(
      'INSERT INTO characters (name, description, game, img_url) VALUES (?, ?, ?, ?)'
    )
    // This executes the prepared SQL statement
    // It is inserting name, desc, game values into the DB.
    const info = stmt.run(name, description, game, img_url)

    // Respond with the ID of the newly inserted character
    // This converts the res ID into a JSON string.
    return new Response(JSON.stringify({ id: info.lastInsertRowid }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    // Return an error response if something goes wrong
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
