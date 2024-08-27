import { useEffect, useState } from 'react'

export default function CharacterList() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('/api/characters')
        if (!response.ok) {
          throw new Error('Failed to fetch characters')
        }
        const data = await response.json()
        setCharacters(data)
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }

    fetchCharacters()
  }, [])

  return (
    <ul className="space-y-4">
      {characters.map((character) => (
        <li
          key={character.id}
          className="p-4 border rounded-lg shadow-lg flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold">{character.name}</h2>
          <p className="text-gray-700">{character.description}</p>
          <p className="text-gray-500">
            <strong>Game:</strong> {character.game}
          </p>
          {character.img_url && (
            <img
              src={character.img_url}
              alt={character.name}
              className="mt-4 max-w-full h-auto max-h-64 rounded"
            />
          )}
        </li>
      ))}
    </ul>
  )
}
