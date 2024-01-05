export interface logosType {
  id:number;
  name:string;
  src:string;
  srcOn:string;
  srcOff:string;
  href:string;
}

export interface nowSessionType {
  id:number;
  title:string;
  topic:string;
  period:Date;
  bannerImg:string
}

export interface contentsType {
  idx: number;
  session_id: number;
  uid: string;
  address: string;
  image: string;
  title: string;
  desc: string;
  vote: number;
  createAt: string;
  updatedAt: string;
}