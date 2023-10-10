import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useInput } from '@/hooks/use-input'
import { TasksElementsData } from '@/schemas/tasks-elements-schema'
import { Control, useFieldArray } from 'react-hook-form'

type Props = {
  nestIndex: number
  nestTransformationId: number
  nestInputId: number
  control: Control<
    TasksElementsData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
}

export default function InputElementsFields({
  nestIndex,
  nestTransformationId,
  nestInputId,
  control,
}: Props) {
  const { fields } = useFieldArray({
    control,
    name: `tasksElementsList.${nestIndex}.inputElements`,
  })
  const { getInputAttributeById } = useInput()

  if (fields.length > 0) {
    return (
      <>
        <FormLabel className="font-bold">Input Elements</FormLabel>
        {fields.map((field, index) => (
          <div className="mt-3 flex w-full items-center gap-3" key={field.id}>
            <FormField
              control={control}
              name={`tasksElementsList.${nestIndex}.inputElements.${index}.variableName`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <FormLabel>
                        {`Associate "${getInputAttributeById(
                          nestTransformationId,
                          nestInputId,
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
}
