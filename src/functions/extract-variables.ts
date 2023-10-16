export const extractVariables = (code: string): Record<string, string> => {
  const lines = code.split('\n')

  const variables: Record<string, string> = {}

  lines.forEach((line) => {
    if (line.includes('=') && line.indexOf('=') === line.lastIndexOf('=')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [variableName, variableValue] = line.split('=').map((s) => s.trim())
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(variableName)) {
        variables[variableName] = variableValue
      }
    }
  })

  return variables
}
