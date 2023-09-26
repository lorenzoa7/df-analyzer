'use client'

import useGeneral from '@/hooks/useGeneral'
import useInput from '@/hooks/useInput'
import useTask from '@/hooks/useTask'
import useTransformation from '@/hooks/useTransformation'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BarLoader } from 'react-spinners'
import * as C from './styles'

export default function ExportSection() {
  const { push } = useRouter()
  const { appData } = useGeneral()
  const { getTransformationById } = useTransformation()
  const { getInputById } = useInput()
  const { getTaskById } = useTask()
  const [isLoading, setIsLoading] = useState(false)

  const handleBack = () => {
    setIsLoading(true)
    Cookie.remove('code_preview')
    push('/')
  }

  const exportFile = () => {
    let updatedCode: string[] = []
    const imports = [
      'import time',
      'from datetime import datetime',
      'from dfa_lib_python.attribute import Attribute',
      'from dfa_lib_python.attribute_type import AttributeType',
      'from dfa_lib_python.dataflow import Dataflow',
      'from dfa_lib_python.dataset import DataSet',
      'from dfa_lib_python.element import Element',
      'from dfa_lib_python.program import Program',
      'from dfa_lib_python.set import Set',
      'from dfa_lib_python.set_type import SetType',
      'from dfa_lib_python.task import Task',
      'from dfa_lib_python.transformation import Transformation',
      '',
    ]

    updatedCode = updatedCode.concat(imports)
    const dataflowSetter = [
      `dataflow_tag = "${appData.dataflow_tag}"`,
      'df = Dataflow(dataflow_tag)',
      '',
      '# Prospective provenance',
    ]
    updatedCode = updatedCode.concat(dataflowSetter)
    const prospectiveProvenance = appData.transformations
      .flatMap((transformation) => {
        const sets = []
        const inputs = transformation.inputs.flatMap((input) => {
          if (input.transformationOutputReferenceId === null) {
            const set = `tf${transformation.id}_input${input.id}`
            sets.push(set)
            return [
              `${set} = Set("${
                input.name
              }", SetType.INPUT, [${input.attributes.flatMap((attribute) => [
                `Attribute("${attribute.name}", AttributeType.${attribute.type})`,
              ])}])`,
            ]
          }

          const set = `tf${input.transformationOutputReferenceId}_output`
          sets.push(set)

          return [
            `${set}.set_type(SetType.INPUT)`,
            `tf${input.transformationOutputReferenceId}_output.dependency=tf${input.transformationOutputReferenceId}._tag`,
          ]
        })

        const outputSet = `tf${transformation.id}_output`
        sets.push(outputSet)

        const output = [
          `${outputSet} = Set("${
            transformation.output.name
          }", SetType.OUTPUT, [${transformation.output.attributes.flatMap(
            (attribute) => [
              `Attribute("${attribute.name}", AttributeType.${attribute.type})`,
            ],
          )}])`,
        ]

        const lastTransformationPart = [
          `tf1.set_sets([${sets.toString()}])`,
          `df.add_transformation(tf${transformation.id})`,
          '',
        ]

        return [
          `tf${transformation.id} = Transformation("${transformation.name}")`,
        ].concat(inputs, output, lastTransformationPart)
      })
      .concat(['df.save()', '', '# Retrospective provenance'])

    updatedCode = updatedCode.concat(prospectiveProvenance)

    const retrospectiveProvenance = appData.codeLines
      .flatMap((line) => {
        if (typeof line === 'string') return [line]
        if (line.stamp === 'begin') {
          const task = getTaskById(line.taskId)
          const hasInputElement = !!(task && task.inputElement)
          let dependecyTaskName
          if (!hasInputElement && task?.transformationId) {
            const transformationOutputId = getInputById(
              task.transformationId,
              task.inputId,
            )?.transformationOutputReferenceId
            if (transformationOutputId) {
              const attributesNames = getTransformationById(
                transformationOutputId,
              )?.output.attributes.map((attribute) => attribute.name)

              dependecyTaskName = appData.tasks.find(
                (task) =>
                  task.outputElement.toString() === attributesNames?.toString(),
              )?.name
            }
          }
          return [
            `${task?.name} = Task(${
              line.taskId
            }, dataflow_tag, "${getTransformationById(line.transformationId)
              ?.name}"${
              dependecyTaskName ? `, dependency=${dependecyTaskName}` : ''
            })`,
          ].concat(
            task && task.inputElement
              ? [
                  `${task?.name}_input = DataSet("${getInputById(
                    line.transformationId,
                    task.inputId,
                  )?.name}", [Element([${task.inputElement.toString()}])])`,
                  `${task?.name}.add_dataset(${task?.name}_input)`,
                ]
              : [],
            [`${task?.name}.begin()`],
          )
        }

        const task = getTaskById(line.taskId)
        if (task)
          return [
            `${task?.name}_output= DataSet("${getTransformationById(
              line.transformationId,
            )?.name}", [Element([${task.outputElement.toString()}])])`,
            `${task?.name}.add_dataset(${task?.name}_output)`,
            `${task?.name}.end()`,
          ]

        return []
      })
      .concat([''])

    updatedCode = updatedCode.concat(retrospectiveProvenance)
    console.log(updatedCode)
    const generatedPythonCode = updatedCode.join('\n')

    // Download File
    const blob = new Blob([generatedPythonCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${appData.dataflow_tag}-df.py`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <C.Container>
      <C.BackButton onClick={handleBack}>
        {isLoading && <BarLoader />}
        {!isLoading && 'GO BACK'}
      </C.BackButton>

      <C.ExportButton onClick={exportFile}>EXPORT</C.ExportButton>

      <C.BackButton className="invisible">
        {isLoading && <BarLoader />}
        {!isLoading && 'GO BACK'}
      </C.BackButton>
    </C.Container>
  )
}
