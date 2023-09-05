'use client'

import { STORAGE_KEY } from '@/constants'

const getLocalStorage = (key: string) => {
  const data = window.localStorage.getItem(`${STORAGE_KEY}${key}`)

  return data ? JSON.parse(data) : null
}

export default getLocalStorage
