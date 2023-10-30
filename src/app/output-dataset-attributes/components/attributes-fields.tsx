import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
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
import { attributeTypes } from '@/config/data'
import { extractIds } from '@/functions/extract-ids'
import { newId } from '@/functions/new-id'
import { Plus, X } from 'lucide-react'
import { Control, useFieldArray } from 'react-hook-form'

type Props = {
  nestIndex: number
  control: Control<
    {
      outputsAttributes: {
        attributes: {
          _id: number
          name: string
          type: 'TEXT' | 'NUMERIC' | 'FILE' | 'RDFILE'
        }[]
        transformationId: number
      }[]
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
}

export default function AttributesFields({ nestIndex, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `outputsAttributes.${nestIndex}.attributes`,
  })
  return (
    <>
      <Button
        variant="secondary"
        type="button"
        onClick={() =>
          append({
            _id: newId({ idList: extractIds(fields) }),
            name: '',
            type: attributeTypes[0],
          })
        }
        className="w-full"
      >
        <Plus className="mr-2 w-4" />
        <span>Add</span>
      </Button>
      {fields.map((field, index) => (
        <div className="mt-3 flex items-center gap-3" key={field.id}>
          <FormField
            control={control}
            name={`outputsAttributes.${nestIndex}.attributes.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      className="w-96"
                      placeholder="Attribute name..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`outputsAttributes.${nestIndex}.attributes.${index}.type`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={attributeTypes[0]}
                  >
                    <FormControl>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Select the transformation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {attributeTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
          >
            <X className="w-4" />
          </Button>
        </div>
      ))}
    </>
  )
}
