'use client'

import { siteRoutes } from '@/config/routes'
import { SiteSteps, siteSteps } from '@/config/site'
import { localStorageNames } from '@/config/storage'
import { getLocalStorage } from '@/functions/get-local-storage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    console.log(getLocalStorage(localStorageNames.actualStep))
    const actualStep = (getLocalStorage(localStorageNames.actualStep) ??
      siteSteps[0]) as SiteSteps
    router.replace(siteRoutes[actualStep])
  }, [router])

  return <div>Loading...</div>
}
