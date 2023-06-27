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
}

const GeneralContext = createContext<GeneralContextProps>(
  {} as GeneralContextProps,
)

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultAppData: DataFlow = {
    dataflow_tag: '',
    code: '',
    transformations: [],
  }

  const [appData, setAppData] = useState(
    getLocalStorage('app_data') ? getLocalStorage('app_data') : defaultAppData,
  )

  const saveAppData = useCallback(() => {
    setLocalStorage('app_data', appData)
  }, [appData])

  useEffect(() => saveAppData(), [saveAppData])

  return (
    <GeneralContext.Provider
      value={{
        appData,
        setAppData,
        defaultAppData,
        saveAppData,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export { GeneralContext, GeneralProvider }

