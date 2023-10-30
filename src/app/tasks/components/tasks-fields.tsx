import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
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
import { Separator } from '@/components/ui/separator'
import { extractIds } from '@/functions/extract-ids'
import { newId } from '@/functions/new-id'
import { useInput } from '@/hooks/use-input'
import { useTransformation } from '@/hooks/use-transformation'
import { TasksData } from '@/schemas/tasks-schema'
import { Plus, X } from 'lucide-react'
import { Control, useFieldArray } from 'react-hook-form'

type Props = {
  nestIndex: number
  nestTransformationId: number
  control: Control<
    TasksData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
}

export default function TasksFields({
  nestIndex,
  nestTransformationId,
  control,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `tasksList.${nestIndex}.tasks`,
  })
  const { getTransformationById } = useTransformation()
  const { getInputById } = useInput()
  const nestTransformation = getTransformationById(nestTransformationId)
  const transformationName = nestTransformation?.name
  return (
    <>
      <Button
        variant="secondary"
        type="button"
        onClick={() =>
          append({
            _id: newId({ idList: extractIds(fields), modifier: nestIndex }),
            name: transformationName
              ? `t${transformationName}${
                  fields.length === 0 ? '' : fields.length
                }`
              : '',
            inputId: nestTransformation?.inputs[0]._id ?? 1,
          })
        }
        className="w-full"
      >
        <Plus className="mr-2 w-4" />
        <span>Add</span>
      </Button>
      {fields.map((field, index) => (
        <div className="mt-3 flex w-full items-center gap-3" key={field.id}>
          <FormField
            control={control}
            name={`tasksList.${nestIndex}.tasks.${index}.name`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      className="w-full"
                      placeholder="Task name..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {getInputById(nestTransformationId, fields[index].inputId)
            ?.transformationOutputReferenceId === -1 && (
            <FormField
              control={control}
              name={`tasksList.${nestIndex}.tasks.${index}.inputId`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(
                          nestTransformation?.inputs[0]._id ?? 1,
                        )}
                      >
                        <FormControl>
                          <SelectTrigger className="w-40 truncate [&>*:nth-child(1)]:truncate">
                            <SelectValue placeholder="Select the input" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <FormLabel className="ml-2 font-bold">
                            Associated input
                          </FormLabel>
                          <Separator className="mx-auto my-2 w-full" />
                          {nestTransformation?.inputs.map((input) => (
                            <SelectItem
                              key={input._id}
                              value={String(input._id)}
                              className="truncate"
                            >
                              {input.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
            className="w-14"
          >
            <X className="w-4" />
          </Button>
        </div>
      ))}
    </>
  )
}
