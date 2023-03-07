# ECOGameFront

Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, Router, Vuex, CSS Pre-processors, Linter
? Choose a version of Vue.js that you want to start the project with 3.x
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No

## 적용 라이브러리

element-plus

axios

bignumber.js

i18n

web3

## vue.cli 의 env 설명

```bash
.env : 모든 환경에서 로드가 된다.
.env.local : 모든 환경에서 로드가 되며 local용 (git에 등록x)

.env.development : serve 환경에서 실행 
.env.development.local : serve 환경에서 로드되며 local용 (git에 등록x)

.env.production : build 환경에서 실행 
.env.production.local : build 환경에서 로드되며 local용 (git에 등록x)
```

serve 로 실행후 process.env 를 출력하면 아래와 같이 나옴

```
BASE_URL: "/"
NODE_ENV: "development"
VUE_APP_NODE_LOCAL: "Hello ENV Local"
VUE_APP_NODE_MESSAGE: "Hello ENV Developer"
VUE_APP_PUBLIC_KEY: "-----BEGIN PUBLIC KEY-----...."
VUE_APP_TITLE: "ECO Game Platform"
```