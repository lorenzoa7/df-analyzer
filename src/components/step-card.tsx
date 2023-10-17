'use client'

import { useIsClient } from '@/providers/is-client-provider'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

type Props = {
  children: React.ReactNode
  title: string
  description: string
}

export default function StepCard({ children, title, description }: Props) {
  const isClient = useIsClient()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{isClient ? children : <span>Loading...</span>}</CardContent>
    </Card>
  )
}
