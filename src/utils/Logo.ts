// import { reactive } from 'vue'
import { SNS } from '@/utils/SnsArr'
import { logosType } from "@/types/IBattleType"

export const logos:logosType[] =([
  {
    id:1,
    name:"gitHub",
    src:SNS.GitHub.src,
    srcOn:SNS.GitHub.srcOn,
    srcOff:SNS.GitHub.srcOff,
    href:SNS.GitHub.href
  },
  {
    id:2,
    name:"telegram",
    src:SNS.Telegram.src,
    srcOn:SNS.Telegram.srcOn,
    srcOff:SNS.Telegram.srcOff,
    href:SNS.Telegram.href
  },
  {
    id:3,
    name:"twitter",
    src:SNS.Twitter.src,
    srcOn:SNS.Twitter.srcOn,
    srcOff:SNS.Twitter.srcOff,
    href:SNS.Twitter.href
  },
  {
    id:4,
    name:"blog",
    src:SNS.Blog.src,
    srcOn:SNS.Blog.srcOn,
    srcOff:SNS.Blog.srcOff,
    href:SNS.Blog.href
  },
  {
    id:5,
    name:"medium",
    src:SNS.Medium.src,
    srcOn:SNS.Medium.srcOn,
    srcOff:SNS.Medium.srcOff,
    href:SNS.Medium.href
  }
])