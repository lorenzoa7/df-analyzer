'use client'

import { storageKey } from '@/config/storage'

export const getLocalStorage = (key: string) => {
  const data = window.localStorage.getItem(`${storageKey}:${key}`)

  return data ? (JSON.parse(data) as unknown) : null
}
