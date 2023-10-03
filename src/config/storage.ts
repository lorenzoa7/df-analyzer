export const storageKey = 'dfanalyzer2'

export const localStorageKeys = ['actualStep', 'dataflowData'] as const
export type LocalStorageKeys = (typeof localStorageKeys)[number]

export const localStorageNames = {
  actualStep: 'actualStep',
  dataflowData: 'dataflowData',
} satisfies Record<string, LocalStorageKeys>
