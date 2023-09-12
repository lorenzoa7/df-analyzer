import { getLocalStorage, setLocalStorage } from '@/functions'
import { DataFlow } from '@/utils/types'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

export type GeneralContextProps = {
  appData: DataFlow
  setAppData: Dispatch<SetStateAction<DataFlow>>
  defaultAppData: DataFlow
  saveAppData: () => void
  getVariableNames: () => { variableName: string }[]
}

const GeneralContext = createContext<GeneralContextProps>(
  {} as GeneralContextProps,
)

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultAppData: DataFlow = {
    dataflow_tag: '',
    code: '',
    transformations: [],
    tasks: [],
  }

  const [appData, setAppData] = useState(defaultAppData)

  const saveAppData = useCallback(() => {
    setLocalStorage('app_data', appData)
  }, [appData])

  const getVariableNames = () => {
    const variables = [
      'PRIMEIRO_NUMERO',
      'SEGUNDO_NUMERO',
      'RESULTADO_SOMA',
      '/home/debora/Documents/numeros',
    ]
    return variables.map((variable) => ({
      variableName: variable,
    }))
  }

  useEffect(() => {
    if (getLocalStorage('app_data')) setAppData(getLocalStorage('app_data'))
  }, [])

  useEffect(() => saveAppData(), [saveAppData])

  return (
    <GeneralContext.Provider
      value={{
        appData,
        setAppData,
        defaultAppData,
        saveAppData,
        getVariableNames,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export { GeneralContext, GeneralProvider }
