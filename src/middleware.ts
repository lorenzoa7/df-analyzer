import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const isCodePreview =
    request.cookies.get('code_preview')?.value.toLowerCase() === 'true'

  const homeURL = new URL('/', request.url)
  const codePreviewURL = new URL('/code', request.url)

  if (!isCodePreview) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next()
    }

    return NextResponse.redirect(homeURL)
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(codePreviewURL)
  }
}

export const config = {
  matcher: ['/', '/code'],
}
