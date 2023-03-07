# ZeroQuest Front

```bash
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
```

## 적용 라이브러리

기본 ui 디자인 및 다국어지원, SCSS 모듈

```bash
element-plus

axios

bignumber.js

i18n

scss
```

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
VUE_APP_NODE_MESSAGE: "Hello ENV Local"
VUE_APP_PUBLIC_KEY: "-----BEGIN PUBLIC KEY-----...."
VUE_APP_TITLE: "ECO Game Platform"
```

## 화면 구성 타입

ECOP 기획서에 의한대로 Front 는 Mobile 전용으로 개발

## build

serve : local 실행

serve:dev : dev서버 실행

```json
  "serve": "vue-cli-service serve --mode local",
  "serve:dev": "vue-cli-service serve --mode development",
  "serve:prod": "vue-cli-service serve --mode production",
  "build": "vue-cli-service build --mode local",
  "build:dev": "vue-cli-service build --mode development",
  "build:prod": "vue-cli-service build --mode production",
```
