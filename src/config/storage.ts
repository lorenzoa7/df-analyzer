export const storageKey = 'dfanalyzer2:'

export const localStorageKeys = ['actualStep'] as const
export type LocalStorageKeys = (typeof localStorageKeys)[number]

export const localStorageNames = {
  actualStep: 'actualStep',
} satisfies Record<string, LocalStorageKeys>
