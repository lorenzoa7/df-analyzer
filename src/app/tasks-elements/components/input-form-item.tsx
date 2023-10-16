import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TasksElementsData } from '@/schemas/tasks-elements-schema'
import { useEffect, useState } from 'react'
import { ControllerRenderProps, UseFormSetValue } from 'react-hook-form'

type Props = {
  nestIndex: number
  itemIndex: number
  inputId: number
  attributeId: number
  variables: Record<string, string>
  setValue: UseFormSetValue<TasksElementsData>
  field: ControllerRenderProps<
    TasksElementsData,
    `tasksElementsList.${number}.inputElements.${number}.variableName`
  >
  attributeName?: string
}

export default function InputFormItem({
  nestIndex,
  itemIndex,
  inputId,
  attributeId,
  attributeName,
  field,
  variables,
  setValue,
}: Props) {
  const hasVariables = Object.keys(variables).length > 0
  const [useVariableAssistant, setUseVariableAssistant] = useState(false)
  const defaultVariableName = hasVariables ? Object.keys(variables)[0] : ''

  useEffect(() => {
    if (hasVariables && useVariableAssistant) {
      setValue(
        `tasksElementsList.${nestIndex}.inputElements.${itemIndex}`,
        {
          attributeId,
          inputId,
          variableName: defaultVariableName,
        },
        { shouldDirty: true },
      )
    }

    if (hasVariables && !useVariableAssistant) {
      setValue(
        `tasksElementsList.${nestIndex}.inputElements.${itemIndex}`,
        {
          attributeId,
          inputId,
          variableName: '',
        },
        { shouldDirty: true },
      )
    }
  }, [
    useVariableAssistant,
    attributeId,
    inputId,
    hasVariables,
    nestIndex,
    itemIndex,
    setValue,
    defaultVariableName,
  ])

  return (
    <FormItem className="w-full">
      <div className="flex flex-col gap-4">
        <FormLabel>
          {`Associate "${attributeName}" attribute to a variable`}
        </FormLabel>
        {hasVariables && (
          <div className="flex items-center">
            <FormControl>
              <Checkbox
                checked={useVariableAssistant}
                onCheckedChange={() =>
                  setUseVariableAssistant((state) => !state)
                }
              />
            </FormControl>
            <FormLabel className="ml-2">
              Use an assistant to select the variable
            </FormLabel>
          </div>
        )}

        {useVariableAssistant && (
          <Select
            onValueChange={field.onChange}
            defaultValue={'PRIMEIRO_NUMERO'}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select the variable" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {Object.keys(variables).map((variable) => (
                <SelectItem key={variable} value={variable}>
                  <span className="font-bold">{variable}</span>
                  <span> = {variables[variable]}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {!useVariableAssistant && (
          <FormControl>
            <Input
              className="w-full"
              placeholder="Variable name..."
              {...field}
            />
          </FormControl>
        )}
      </div>

      <FormMessage />
    </FormItem>
  )
}
