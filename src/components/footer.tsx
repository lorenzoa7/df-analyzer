import { Github } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex h-10 w-full items-center justify-center gap-1 font-bold opacity-30 2xl:text-sm">
      <Link
        href="https://github.com/lorenzoa7"
        className="flex items-center justify-center gap-1 underline underline-offset-4 duration-150 hover:text-zinc-500"
        target="_blank"
        rel="noreferrer"
      >
        <Github size={15} />
        Lorenzo Aceti
      </Link>
      <span>- Script Instrumentation for DfAnalyzer</span>
      <span>- 2023</span>
    </footer>
  )
}
