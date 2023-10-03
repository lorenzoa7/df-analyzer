'use client'

import { storageKey } from '@/config/storage'

export const setLocalStorage = (key: string, value: unknown) => {
  const data = JSON.stringify(value)

  window.localStorage.setItem(`${storageKey}${key}`, data)
}
