'use client'

import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

type Props = {
  copyText: string
}

export default function CopyButton({ copyText }: Props) {
  const [isCopied, setIsCopied] = useState(false)

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    }

    throw new Error(`Can't copy text to clipboard.`)
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Button variant="ghost" className="h-8 w-32" onClick={handleCopyClick}>
      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      {isCopied ? (
        <Check className="ml-2 h-4 w-4" />
      ) : (
        <Copy className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}
