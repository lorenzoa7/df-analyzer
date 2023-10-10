import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTransformation } from '@/hooks/use-transformation'
import { TasksElementsData } from '@/schemas/tasks-elements-schema'
import { Control, useFieldArray } from 'react-hook-form'

type Props = {
  nestIndex: number
  nestTransformationId: number
  control: Control<
    TasksElementsData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
}

export default function OutputElementsFields({
  nestIndex,
  nestTransformationId,
  control,
}: Props) {
  const { fields } = useFieldArray({
    control,
    name: `tasksElementsList.${nestIndex}.outputElements`,
  })
  const { getOutputAttributeById } = useTransformation()

  return (
    <>
      <FormLabel className="font-bold">Output Elements</FormLabel>
      {fields.map((field, index) => (
        <div className="mt-3 flex w-full items-center gap-3" key={field.id}>
          <FormField
            control={control}
            name={`tasksElementsList.${nestIndex}.outputElements.${index}.variableName`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <FormLabel>
                      {`Associate "${getOutputAttributeById(
                        nestTransformationId,
                        fields[index].attributeId,
                      )?.name}" attribute to a variable`}
                    </FormLabel>
                    <Input
                      className="w-full"
                      placeholder="Variable name..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </>
  )
}
