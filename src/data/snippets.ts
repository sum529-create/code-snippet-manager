export interface Snippet {
  id: number
  title: string
  code: string
  language: string
  createdAt: string
  tags: string[]
}

export const dummySnippets: Snippet[] = [
  {
    id: 1,
    title: '배열 필터링 함수',
    code: `function filterArray(arr) {
 return arr.filter(item => item > 0)
   .map(num => num * 2);
}`,
    language: 'js',
    createdAt: '2024-03-12',
    tags: ['배열', '필터', '유틸리티'],
  },
  {
    id: 2,
    title: 'Promise 체이닝 예제',
    code: `fetchUser()
 .then(user => fetchProfile(user.id))
 .then(profile => updateUI(profile))
 .catch(error => console.error(error));`,
    language: 'js',
    createdAt: '2024-03-11',
    tags: ['비동기', 'Promise', 'API'],
  },
  {
    id: 3,
    title: 'Vue 3 Composition API 기본 설정',
    code: `import { ref, onMounted } from 'vue'

export default {
 setup() {
   const count = ref(0)

   onMounted(() => {
     console.log('컴포넌트가 마운트되었습니다')
   })

   return { count }
 }
}`,
    language: 'vuejs',
    createdAt: '2024-03-10',
    tags: ['Vue', 'Composition API', '설정'],
  },
  {
    id: 4,
    title: 'TypeScript 인터페이스 정의',
    code: `interface User {
 id: number;
 name: string;
 email?: string;
 role: 'admin' | 'user';
}`,
    language: 'ts',
    createdAt: '2024-03-09',
    tags: ['TypeScript', '인터페이스', '타입'],
  },
  {
    id: 5,
    title: 'CSS Flex 중앙 정렬',
    code: `.container {
 display: flex;
 justify-content: center;
 align-items: center;
 min-height: 100vh;
}`,
    language: 'css3',
    createdAt: '2024-03-08',
    tags: ['CSS', 'Flexbox', '레이아웃'],
  },
  {
    id: 6,
    title: 'React useState 훅 예제',
    code: `import { useState } from 'react';

function Counter() {
 const [count, setCount] = useState(0);

 return (
   <button onClick={() => setCount(count + 1)}>
     Count: {count}
   </button>
 );
}`,
    language: 'react',
    createdAt: '2024-03-07',
    tags: ['React', 'Hooks', '상태관리'],
  },
]
