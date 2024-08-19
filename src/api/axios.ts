import http from "@/api/http";

//bannerList, nftList, point 관련 api
export const getPointBalanceAll = () => {
  return http.get("/api/token/balanceAll");
};

//토큰 정보도 동일하게, store에 저장
export const tokenInfos = () => {
  return http.get("/api/tokenInfos", {
    params: {
      currency: "USDT",
    },
  });
};

export const bannerListApi = () => {
  return http.get("/api/banners", { params: {} });
};
export const bannerUpdatedAtApi = () => {
  return http.get("/api/bannersTime");
};
export const checkBannerLatestTime = async (
  vuexStore: any,
  bannerLatestTime: any
) => {
  const response = await bannerUpdatedAtApi();
  if (response.status !== 200) {
    return;
  }
  const checkBannerLatestTime = response.data.data;

  if (checkBannerLatestTime === bannerLatestTime) {
    return;
  }
  vuexStore.dispatch("auth/getBannerList");
};

export const nftListApi = () => {
  return http.get("/api/nft/zeroNft", { params: {} });
};

export const nftUpdatedAtApi = () => {
  return http.get("/api/nft/zeroNftTime");
};

export const checkNftLatestTime = async (
  vuexStore: any,
  nftLatestTime: any
) => {
  const response = await nftUpdatedAtApi();
  if (response.status !== 200) {
    return;
  }
  const checkNftLatestTime = response.data.data;
  if (checkNftLatestTime === nftLatestTime) {
    return;
  }
  vuexStore.dispatch("auth/getNftList");
};

export const getRankingApi = () => {
  return http.get("/api/challenge/info");
};

export const getRemainingNft = (idx: number) => {
  return http.get(`api/nft/getRemainingNft/${idx}`);
};
