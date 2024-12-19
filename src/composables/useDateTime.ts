import dayjs from 'dayjs'

export const useDateTime = () => {
  const formatDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD')
  }

  return { formatDate }
}
