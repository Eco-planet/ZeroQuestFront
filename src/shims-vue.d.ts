/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare type Nullable = T | null

declare module '*.json' {
  const value: any;
  export default value;
}
