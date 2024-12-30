export const useInputValidation = () => {
  const sanitizeText = (value: string) => {
    return value.replace(/[^\w\sㄱ-힣]/g, '')
  }
  const validateTitle = (value: string) => {
    if (value.length < 2) {
      return {
        isValid: false,
        message: '제목은 최대 2자 이상이어야 합니다.',
      }
    }
    if (value.length > 50) {
      return {
        isValid: false,
        message: '제목은 50자를 초과할 수 없습니다.',
      }
    }
    if (!/\S/.test(value)) {
      return {
        inValid: false,
        message: '공백문자가 아닌 제목을 입력해주세요.',
      }
    }
    return {
      inValid: true,
      message: 'Error',
    }
  }

  return { sanitizeText, validateTitle }
}
