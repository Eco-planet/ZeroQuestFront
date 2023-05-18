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