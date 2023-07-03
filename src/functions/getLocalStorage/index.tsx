'use client'

import { STORAGE_KEY } from '@/constants'

const getLocalStorage = (key: string) => {
  const data = window.localStorage.getItem(`${STORAGE_KEY}${key}`)

  return JSON.parse(data!)
}

export default getLocalStorage
