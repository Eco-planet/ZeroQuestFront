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
  },
  {
    id:2,
    name:"telegram",
    src:SNS.Telegram.src,
    srcOn:SNS.Telegram.srcOn,
    srcOff:SNS.Telegram.srcOff,
  },
  {
    id:3,
    name:"twitter",
    src:SNS.Twitter.src,
    srcOn:SNS.Twitter.srcOn,
    srcOff:SNS.Twitter.srcOff,
  },
  {
    id:4,
    name:"blog",
    src:SNS.Blog.src,
    srcOn:SNS.Blog.srcOn,
    srcOff:SNS.Blog.srcOff,
  },
  {
    id:5,
    name:"medium",
    src:SNS.Medium.src,
    srcOn:SNS.Medium.srcOn,
    srcOff:SNS.Medium.srcOff,
  }
])