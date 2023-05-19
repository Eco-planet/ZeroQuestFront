export interface NFTSampleType {
  category: string;
  name: string;
  total: number;
  price_eth: number;
  price_esg: number;
  expiration_data: Date;
  description: string;
  extra_img1: string;
  extra_img2: string;
}

export interface NftCategory {
  idx: number;
  code: string;
  name: string;
  hide: number;
  createAt: Date;
  updatedAt: Date;
}

export interface nftType {
  idx: number,
  cid: number,
  type: number,
  symbol: string,
  name: string,
  description: string,
  image: string,
  hide: number,
  buySymbol1: string,
  buyPrice1: number,
  buySymbol2: string,
  buyPrice2: number,
  metaData: null,
  createdAt: Date,
  updatedAt: Date
}