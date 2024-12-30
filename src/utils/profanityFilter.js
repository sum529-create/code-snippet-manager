import bannedWords from '@/data/bannedWords'
import AhoCorasick from 'modern-ahocorasick'

export const profanityFilter = async (text) => {
  const ac = new AhoCorasick(bannedWords)

  const results = ac.search(text)

  return results.length === 0
}
