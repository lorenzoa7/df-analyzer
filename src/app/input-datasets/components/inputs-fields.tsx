import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { extractIds } from '@/functions/extract-ids'
import { newId } from '@/functions/new-id'
import { useTransformation } from '@/hooks/use-transformation'
import { useApp } from '@/providers/app-provider'
import { InputsData } from '@/schemas/inputs-schema'
import { Plus, X } from 'lucide-react'
import { Control, useFieldArray } from 'react-hook-form'

type Props = {
  nestIndex: number
  nestTransformationId: number
  control: Control<
    InputsData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
}

export default function InputsFields({
  nestIndex,
  nestTransformationId,
  control,
}: Props) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `inputsList.${nestIndex}.inputs`,
  })
  const { dataflowData } = useApp()
  const { getTransformationById } = useTransformation()

  const activateOutputReference = (index: number) => {
    const input = fields[index]
    let updatedRefereceValue = -1
    let updatedNameValue = input.name
    if (input.transformationOutputReferenceId === -1) {
      updatedRefereceValue = dataflowData.transformations[0]._id
      updatedNameValue = ''
    }

    update(index, {
      ...fields[index],
      transformationOutputReferenceId: updatedRefereceValue,
      name: updatedNameValue,
    })
  }

  const hasOutputReference = (index: number) => {
    return fields[index].transformationOutputReferenceId !== -1
  }

  const transformationName = getTransformationById(nestTransformationId)?.name

  return (
    <>
      <Button
        variant="secondary"
        type="button"
        onClick={() =>
          append({
            _id: newId({ idList: extractIds(fields) }),
            name: transformationName
              ? `i${transformationName}${
                  fields.length === 0 ? '' : fields.length
                }`
              : '',
            transformationOutputReferenceId: -1,
          })
        }
        className="w-full"
      >
        <Plus className="mr-2 w-4" />
        <span>Add</span>
      </Button>
      {fields.map((field, index) => (
        <div key={field.id} className="mt-3">
          {dataflowData.transformations.length > 1 && (
            <FormField
              control={control}
              name={`inputsList.${nestIndex}.inputs.${index}.transformationOutputReferenceId`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Checkbox
                      checked={field.value !== -1}
                      onCheckedChange={() => activateOutputReference(index)}
                    />
                  </FormControl>
                  <FormLabel className="ml-2">
                    Set this input as another transformation output.
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="mt-2 flex items-center gap-3">
            {hasOutputReference(index) && (
              <FormField
                control={control}
                name={`inputsList.${nestIndex}.inputs.${index}.transformationOutputReferenceId`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(
                          dataflowData.transformations.find(
                            (transformation) =>
                              nestTransformationId !== transformation._id,
                          )?._id,
                        )}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select the transformation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataflowData.transformations.flatMap(
                            (transformation) =>
                              transformation._id === nestTransformationId ? (
                                []
                              ) : (
                                <SelectItem
                                  key={transformation._id}
                                  value={String(transformation._id)}
                                >
                                  {transformation.output.name}
                                </SelectItem>
                              ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!hasOutputReference(index) && (
              <FormField
                control={control}
                name={`inputsList.${nestIndex}.inputs.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Input name..." {...field} />
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
            >
              <X className="w-4" />
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
