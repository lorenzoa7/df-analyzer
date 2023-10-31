import { NextRequest, NextResponse } from 'next/server'
import { SiteRoutes, siteRoutes } from './config/routes'
import { SiteSteps, siteSteps } from './config/site'
import { cookiesNames } from './config/storage'
import { getStepByRoute } from './functions/get-step-by-route'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname as SiteRoutes
  const actualStep = request.cookies.get(cookiesNames.actualStep)?.value as
    | SiteSteps
    | undefined

  const pathnameStep = getStepByRoute(pathname)

  if (actualStep) {
    if (pathnameStep === actualStep) {
      return NextResponse.next()
    }

    const newURL = new URL(siteRoutes[actualStep], request.url)
    return NextResponse.redirect(newURL)
  }

  const response = NextResponse.redirect(
    new URL(siteRoutes.script, request.url),
  )
  response.cookies.set(cookiesNames.actualStep, siteSteps[0])
  return response
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
