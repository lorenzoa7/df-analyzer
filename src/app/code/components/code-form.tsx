'use client'

import { StepButtons } from '@/components/step-buttons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { SiteRoutes } from '@/config/routes'
import { getNextRoute } from '@/functions/get-next-route'
import { getPreviousRoute } from '@/functions/get-previous-route'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useApp } from '@/providers/app-provider'
import { CodeData, codeSchema } from '@/schemas/codeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function CodeForm() {
  const currentRoute = usePathname() as SiteRoutes
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData } = useApp()
  const form = useForm<CodeData>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: '',
    },
  })

  const onSubmit = (data: CodeData) => {
    setDataflowData((dataflowData) => ({ ...dataflowData, code: data.code }))
    goToNextStep(currentRoute)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-96 w-[32rem] resize-none"
                  placeholder="Paste here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepButtons.Root>
          {getPreviousRoute(currentRoute) !== currentRoute && (
            <StepButtons.Back currentRoute={currentRoute} />
          )}
          {getNextRoute(currentRoute) !== currentRoute && <StepButtons.Next />}
        </StepButtons.Root>
      </form>
    </Form>
  )
}
