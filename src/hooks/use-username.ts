import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

const ANIMALS = ['dog', 'cat', 'lion', 'tiger', 'bear', 'wolf', 'fox', 'eagle', 'shark', 'whale']
const STORAGE_KEY = 'chat_username'

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  return `anonymous-${word}-${nanoid(5)}`
}

export const useUsername = () => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const main = () => {
      const storedUsername = localStorage.getItem(STORAGE_KEY)

      if (storedUsername) {
        setUsername(storedUsername)
        return
      }

      const generatedUsername = generateUsername()
      localStorage.setItem(STORAGE_KEY, generatedUsername)
      setUsername(generatedUsername)
    }
    main()
  }, [])

  return { username }
}
