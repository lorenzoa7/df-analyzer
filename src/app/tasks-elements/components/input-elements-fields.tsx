import { FormField, FormLabel } from '@/components/ui/form'
import { extractVariables } from '@/functions/extract-variables'
import { useInput } from '@/hooks/use-input'
import { useApp } from '@/providers/app-provider'
import { TasksElementsData } from '@/schemas/tasks-elements-schema'
import { Control, UseFormSetValue, useFieldArray } from 'react-hook-form'
import InputFormItem from './input-form-item'

type Props = {
  nestIndex: number
  nestTransformationId: number
  nestInputId: number
  control: Control<
    TasksElementsData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
  setValue: UseFormSetValue<TasksElementsData>
}

export default function InputElementsFields({
  nestIndex,
  nestTransformationId,
  nestInputId,
  control,
  setValue,
}: Props) {
  const { fields } = useFieldArray({
    control,
    name: `tasksElementsList.${nestIndex}.inputElements`,
  })
  const { getInputAttributeById } = useInput()
  const { dataflowData } = useApp()
  const variables = extractVariables(dataflowData.code)

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
                <InputFormItem
                  nestIndex={nestIndex}
                  itemIndex={index}
                  inputId={fields[index].inputId}
                  attributeId={fields[index].attributeId}
                  attributeName={
                    getInputAttributeById(
                      nestTransformationId,
                      nestInputId,
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
}
