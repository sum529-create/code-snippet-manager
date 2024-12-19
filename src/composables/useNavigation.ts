import { useRouter } from 'vue-router'

export const useNavigation = () => {
  const router = useRouter()

  const goToPage = (name: string, params?: Record<string, string | number>) => {
    router.push({
      name,
      params,
    })
  }
  return { goToPage }
}
