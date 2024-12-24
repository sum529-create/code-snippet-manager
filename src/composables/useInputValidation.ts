export const useInputValidation = () => {
  const sanitizeText = (value: string) => {
    return value.replace(/[^\w\s가-힣]/g, '')
  }
  const validateTitle = (value: string) => {
    return {
      inValid: true,
      message: 'Error',
    }
  }

  return { sanitizeText, validateTitle }
}
