# code-snippet-manager

개발자들을 위한 코드 스니펫 관리 도구

기본 프레임워크 & 핵심 기술:
- Vue 3 (Composition API)
- TypeScript (타입 안정성 강화)
- Vite (빌드 도구)
- Pinia (상태 관리)
- Vue Router

UI/UX 관련:
# UI 컴포넌트
npm install @headlessui/vue   # 접근성 고려된 UI 컴포넌트
npm install @heroicons/vue    # 아이콘

# 스타일링
npm install tailwindcss postcss autoprefixer
npm install @tailwindcss/forms  # 폼 스타일링
npm install @tailwindcss/typography  # 마크다운 스타일링

# 코드 하이라이팅
npm install prismjs
npm install marked  # 마크다운 지원

데이터 관리:
# 로컬 데이터 관리
npm install idb  # IndexedDB Wrapper
npm install dexie  # IndexedDB 라이브러리

# 상태 관리 지원
npm install pinia-plugin-persistedstate  # 상태 영속성

개발 도구 & 품질 관리:
# 린팅 & 포맷팅
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-plugin-prettier

# 테스트
npm install -D vitest @vue/test-utils
npm install -D cypress  # E2E 테스트

---

1차 예정
1. 코드 스니펫 추가 / 수정 / 삭제 / 조회
2. 프로그래밍 언어별 분류
3. 태그 기능
4. 간단한 검색
