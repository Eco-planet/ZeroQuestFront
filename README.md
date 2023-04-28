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

tailwindcss 사용
다국어지원, SCSS 모듈


```bash
tailwindcss

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

serve:dev : dev서버 실행 (테스트시에 사용) 

```json
  "serve": "vue-cli-service serve --mode local",
  "serve:dev": "vue-cli-service serve --mode development",
  "serve:prod": "vue-cli-service serve --mode production",
  "build": "vue-cli-service build --mode local",
  "build:dev": "vue-cli-service build --mode development",
  "build:prod": "vue-cli-service build --mode production",
```

## 로그인 구조

```
구글 토큰 획득 -> 백엔드 서버에서 accessToken, refreshToken 획득
-> 1. router 에서 accessToken 이 만료되면 -> refreshToken 을 이용해서 accessToken 다시 갱신
-> 2. router 에서 accessToken 과 refreshToken 이 둘다 만료되면 다시 로그인
```

## tailwindcss

```
https://tailwindcss.com/
```

## 다국어 지원

한글 : src/locale/modules/kr.ts
영어 : src/locale/modules/en.ts

```js
import Modal from "@/components/Modal/index.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const title = t("message.sorryChecking");
```

## UI 구조

Router : src/router/index.ts
Header : src/components/common/HeaderView.vue
Footer : src/components/common/FooterView.vue

```
[Header]

[Router-View]

[Footer]

[Loading-Spinner]
```

## 백엔드 API 호출

.env.development -> VUE_APP_API_URL 에 접속할 서버 설정

src/api/http.ts -> accessToken 과 refreshToken 이 있으면 headers 에 자동으로 추가

```js
import http from "@/api/http";

const getUserInfo = () => {
  http.get("/api/user/info")
  .then((response) => {
	console.log(response);
  });
};
```

# pm2

```bash
pm2 start --name "FRONT" npm -- start
pm2 start --name "FRONT" npm -- run serve:dev
```

## Invalid Host header

vue.config.js 에 옵션추가

```
configureWebpack : {
    devServer: {
    allowedHosts: "auto",
  },
}
```
