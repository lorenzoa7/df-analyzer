'use client'

import { STORAGE_KEY } from '@/constants'

const setLocalStorage = (key: string, value: unknown) => {
  const data = JSON.stringify(value)

  return window.localStorage.setItem(`${STORAGE_KEY}${key}`, data)
}

export default setLocalStorage
