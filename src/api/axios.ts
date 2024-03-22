import http from "@/api/http";
import store from '@/store';
import { isContext } from "vm";

//bannerList, nftList, point 관련 api 
export const getPointBalanceAll = () => { 
    return http.get('/api/token/balanceAll')
}

//토큰 정보도 동일하게, store에 저장
export const tokenInfos = () => {
  return http.get('/api/tokenInfos', {params: {
   currency: "USDT", }})}

//   export const bannerListApi = () => {
//     return http.get("/api/banners", { params: {} });
//   };
//   export const bannerUpdatedAtApi = () => {
//     return http.get("/api/bannersTime");
//   };
//   export const checkBannerLatestTime = async (
//     vuexStore: any,
//     bannerLatestTime: any
//   ) => {
//     const response = await bannerUpdatedAtApi();
//     if (response.status !== 200) {
//       return;
//     }
//     const checkBannerLatestTime = Date.parse(response.data.data.updatedAt);
  
//     if (checkBannerLatestTime === bannerLatestTime) {
//       return;
//     }
//     vuexStore.dispatch("auth/getBannerList");
//   };
//   //////////////////////////
  
//   export const nftListApi = () => {
//     return http.get("/api/nft/zeroNft", { params: {} });
//   };
  
//   export const nftUpdatedAtApi = () => {
//     return http.get("/api/nft/zeroNftTime");
//   };
  
//   export const checkNftLatestTime = async (
//     vuexStore: any,
//     nftLatestTime: any
//   ) => {
//     const response = await nftUpdatedAtApi();
//     if (response.status !== 200) {
//       return;
//     }
//     const checkBannerLatestTime = Date.parse(response.data.data.nftUpdatedTime);
//     if (checkBannerLatestTime === nftLatestTime) {
//       return;
//     }
//     vuexStore.dispatch("auth/getNftList");
//   };
  

const bannerList = () => {
  return http.get('api/banners',{
    params: {},
  }
  );
}
//bannerList에서, updatedAt 중에서, 제일 최신값을 가지고 온다.
const getBannerListTime = async () => {
  const response = await bannerList();
  const banners = response.data.data;
  const latestUpdateTime = banners.reduce((latest: Date, banner: { updatedAt: string }) => {
    const currentUpdateTime = new Date(banner.updatedAt);
    return currentUpdateTime > latest ? currentUpdateTime : latest;
  }, new Date(banners[0].updatedAt)); 
  console.log('latestUpdateTime',latestUpdateTime) //시간 값 잘 나옴
  return latestUpdateTime;
};

// bannersTime에서는, date안에 시간값을 가져오지만, updatedAt을 빼서 비교해줘야 될 것 같음.
const bannersTime = () => {
  return http.get('api/bannersTime'); 
}


// bannersTime과 bannerList에 updatedAt을 비교하는 함수
const compareBannersTime = async () => {
  // bannersTime API 호출
  const bannersResponse = await bannersTime();
  if (bannersResponse.status !== 200) {
    console.error('Failed to fetch bannersTime');
    //store.state.bannerList
    return;
  }
  const bannerLatestTime = new Date(bannersResponse.data.data);
  console.log('bannersTime에서 시간은', bannerLatestTime);

  // getBannerListTime 함수를 호출하여 최신 업데이트 시간을 가져옴
  const latestUpdateTime = await getBannerListTime();
  // console.log('latestUpdateTime은',latestUpdateTime)

  // 가져온 두 시간을 비교
  if (bannerLatestTime.getTime() === latestUpdateTime.getTime()) {
    console.log("banner 시간이 같다");
    //store.state.bannerList
   return
  } else if (bannerLatestTime.getTime() > latestUpdateTime.getTime() || bannerLatestTime.getTime() < latestUpdateTime.getTime()) {
    store.dispatch("auth/getBannerList");
};
}

const nftList = () => {
  return http.get('api/nft/zeroNft',{
    params: {},
  });
}
const getNftListTime = async () => {
  const response = await nftList();
  console.log('nftList response', response.data.data);
  const nft = response.data.data
  const latestUpdateTime = nft.reduce((latest: Date, banner: { updatedAt: string }) => {
    const currentUpdateTime = new Date(banner.updatedAt);
    return currentUpdateTime > latest ? currentUpdateTime : latest;
  }, new Date(nft[0].updatedAt)); 
  console.log('latestUpdateTime',latestUpdateTime) //시간 값 잘 나옴
  return latestUpdateTime;
}

getNftListTime()

const nftTime = () => { 
  return http.get('api/nft/zeroNftTime');
}


const compareNftTime = async() => {
  const nftResponse = await nftTime();
    if(nftResponse.status !==200) {
      console.error('Failed to fetch nftTime');
      // store.state.nftList
      return;
    }
    const nftLatestTime = new Date(nftResponse.data.data);
    console.log('bannersTime에서 시간은', nftLatestTime, nftResponse.status);

    const latestUpdateTime = await getNftListTime();
    if(nftLatestTime.getTime() === latestUpdateTime.getTime()) {
      // store.state.nftList
      return
    }else if( nftLatestTime.getTime() > latestUpdateTime.getTime() || nftLatestTime.getTime() < latestUpdateTime.getTime()) {
      store.dispatch('auth/getNftList');
    }
  }

export  {
  bannerList,
  bannersTime,
  nftTime,
  compareBannersTime,
  compareNftTime,
};

