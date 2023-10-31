import { FormField, FormLabel } from '@/components/ui/form'
import { extractVariables } from '@/functions/extract-variables'
import { useTransformation } from '@/hooks/use-transformation'
import { useApp } from '@/providers/app-provider'
import { TasksElementsData } from '@/schemas/tasks-elements-schema'
import { Control, UseFormSetValue, useFieldArray } from 'react-hook-form'
import OutputFormItem from './output-form-item'

type Props = {
  nestIndex: number
  nestTransformationId: number
  control: Control<
    TasksElementsData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
  setValue: UseFormSetValue<TasksElementsData>
}

export default function OutputElementsFields({
  nestIndex,
  nestTransformationId,
  control,
  setValue,
}: Props) {
  const { fields } = useFieldArray({
    control,
    name: `tasksElementsList.${nestIndex}.outputElements`,
  })
  const { getOutputAttributeById } = useTransformation()
  const { dataflowData } = useApp()
  const variables = extractVariables(dataflowData.code)

  return (
    <>
      <FormLabel className="font-bold">Output Elements</FormLabel>
      {fields.map((field, index) => (
        <div className="mt-3 flex w-full items-center gap-3" key={field.id}>
          <FormField
            control={control}
            name={`tasksElementsList.${nestIndex}.outputElements.${index}.variableName`}
            render={({ field }) => (
              <OutputFormItem
                nestIndex={nestIndex}
                itemIndex={index}
                attributeId={fields[index].attributeId}
                attributeName={
                  getOutputAttributeById(
                    nestTransformationId,
                    fields[index].attributeId,
                  )?.name
                }
                field={field}
                variables={variables}
                setValue={setValue}
              />
            )}
          />
        </div>
      ))}
    </>
  )
}
