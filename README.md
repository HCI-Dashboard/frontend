# frontend

Vue 3와 Ant Design Vue 4로 만든 기본 대시보드 화면입니다.

## 개발환경
1. Node.js 최소 20.19.0 (22.12.0 이상 권장) [NodeJS](https://nodejs.org/)
2. VSCode

## VSCode 플러그인
1. EditorConfig for VS Code - https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
2. Vue (Official) - https://marketplace.visualstudio.com/items?itemName=Vue.volar
3. Prettier - Code formatter - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
4. ESLint - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
5. Oxc - https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode
6. Vitest - https://marketplace.visualstudio.com/items?itemName=vitest.explorer

* 위의 플러그인은 VSCode로 해당 프로젝트를 로드 시, 자동으로 추천되게 세팅되어 있습니다.

## 프로젝트 설정

### 프로젝트 의존성 라이브러리 설치

```sh
npm install
```

### 프로젝트 개발환경 실행

```sh
npm run dev
```

### 프로젝트 빌드

```sh
npm run build
```

### Vitest를 이용한 단위 테스트 실행 [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Cypress를 이용한 End-to-end 테스트 실행 [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### ESLint를 이용한 정적코드 분석 [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Prettier를 이용한 코드 포맷 통일 [Prettier](https://prettier.io/)

```sh
npm run format
```
