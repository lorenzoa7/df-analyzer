import getLocalStorage from '../getLocalStorage'

export const checkCodePreview = () => {
  return !!getLocalStorage('code_preview')
}
