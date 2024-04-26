<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <!-- esgPoint -->
    <div class="h-10"></div>
    <div
      class="flex w-full pb-2 items-center justify-between border-b border-gray-400"
    >
      <div class="text-2xl font-semibold">ESG Point</div>
      <div class="flex items-end">
        <div class="text-3xl font-semibold text-esg-color">
          {{ esgPoint.toLocaleString() }}
        </div>
        <div class="w-1"></div>
        <div class="text-2xl text-gray-400">point</div>
      </div>
    </div>
    <div class="h-10"></div>

    <div class="w-full">
			<div class="mb-4 p-5 border">
				<div class="mb-6 text-2xl font-bold">Zero Challenge</div>
				<div class="text-lg font-medium text-left">
Zero Challenge is a habit tracker that makes practicing environmental protection enjoyable. 
Various challenges record your carbon reduction efforts and support you. 
Take on the challenge of carbon reduction now and see it lead to rewards.
				</div>
			</div>
<!-- Carousel 적용하기 -->
      <Carousel :autoplay="3000" :wrap-around="true">
				<Slide
					v-for="(slide, index) in bannerList"
					:key="index"
					v-if="bannerList"
				>
					<div class="carousel__item" style="overflow: hidden">
						<img :src="slide.url" @click="goToLink(slide.link)" />
					</div>
				</Slide>
			</Carousel>

		</div>

    <!-- challenge배너1 -->
    <!-- <div class="mt-5" v-for="(banner, index) in banners" :key="index">
      <div class="flex justify-center pb-2">
        <img class="banner2_borderRadius" :src="banner" />
      </div>
    </div> -->

    <div class="mt-20">
      <div class="flex justify-center text-4xl font-bold mb-10">My Ranking</div>
      <div class="circle-container">
        <div class="rounded-circle">
          <div class="text-center">
            <!-- email -->
            <div v-if="!myInfo || !myInfo.email" class="text-3xl font-semibold">
              -
            </div>
            <div v-else class="text-3xl font-semibold">
              {{ myInfo.email.split("@")[0] }}
            </div>
            <br> <!-- Line break -->
            <!-- reward -->
            <div v-if="!myInfo || !myInfo.reward" class="font-bold text-4xl">
              0
            </div>
            <div v-else class="font-bold text-8xl">
              {{ myInfo.reward }}
            </div>
            <br> <!-- Line break -->
            <div class="font-semibold text-3xl">ESGpoint</div>
            <br> <!-- Line break -->
            <!-- rank -->
            <div class="flex justify-center">
              <div v-if="!myInfo || !myInfo.rank" class="font-semibold text-2xl">
                (0
              </div>
              <div v-else class="font-semibold text-2xl">
                ({{ myInfo.rank }}
              </div>
              <div class="font-semibold text-2xl">/</div>
              <div class="font-semibold text-2xl">{{ totalCnt }})</div>
            </div>
            <br> <!-- Line break -->
          </div>
        </div>
      </div>
    </div>
    
    

    <!-- Total Ranking -->
    <div class="mt-32">
      <div class="flex justify-center mb-16 text-4xl font-bold">
        Total Ranking
      </div>
      <div
        class="flex text-2xl items-center justify-center pb-3"
        v-for="(all, index) in allInfo.slice(0, moreLimit)"
        :key="index"
      >
        <div class="flex-1 font-medium mr-4">
          <img
            v-if="index + 1 === 1"
            src="@/assets/images/challenge/rank1.png"
            class="responsive-image"
          />
          <img
            v-else-if="index + 1 === 2"
            src="@/assets/images/challenge/rank2.png"
            class="responsive-image"
          />
          <img
            v-else-if="index + 1 === 3"
            src="@/assets/images/challenge/rank3.png"
            class="responsive-image"
          />
          <div v-else class="my-5 rank-beyond">
            <span>{{ index + 1 }}</span>
          </div>
        </div>
        <div
          class="flex px-7 py-5 rounded-full justify-between wp-80"
          :class="{ totalRankingBg: index < 3, totalOutlineStyle: index >= 3 }"
        >
          <div class="font-medium">{{ all.email.split("@")[0] }}</div>
          <div class="flex">
            <div class="font-medium">{{ all.reward }}</div>
            <div class="font-medium">point</div>
          </div>
        </div>
      </div>
    </div>
    <!-- more -->
    <div
      class="bg-gray-100 mt-20 text-2xl py-4 font-semibold border-2 border-gray-200"
      @click="more"
    >
      더보기
    </div>
  </div>
  <div class="h-96"></div>
  <Modal
    :visible="modalVisible"
    @hide="closeModal"
    @voteHide="closeVoteModal"
    :title="popupTitle"
    :showClose="showClose"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from "vue";
import router from "@/router";
import http from "@/api/http";
import { useStore } from "vuex";
import { getRankingApi } from "@/api/axios.ts";
import { Carousel, Pagination, Slide } from 'vue3-carousel';

const store = useStore();

const modalVisible = ref();
const popupTitle = ref();
const showClose = ref(true);

const banners = ref([]);
const myInfo = ref({});
const myEmail = ref("");
const totalCnt = ref("");
const allInfo = ref([]);

const moreLimit = ref(5);

onMounted(() => {
  getRanking();
});

const userTokenInfo = computed(() => store.getters["auth/getBalances"]);
const esgPoint = parseInt(userTokenInfo.value.ESGP);
const bannerList = computed(() => store.getters['auth/getBannerList']);

const getRanking = async () => {
  try {
    store.state.isLoading;

    const res = await getRankingApi();

    if (res.status === 200) {
      const data = res.data.data;

      banners.value.push(data.seasonInfo.banner1, data.seasonInfo.banner2);
      myInfo.value = data.userChallengeInfo;

      if (myInfo.value) {
        myEmail.value = myInfo.value.email.split("@")[0];
      }

      totalCnt.value = data.totalCnt;
      allInfo.value = data.challengeInfo;
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    store.state.isLoading = false;
  }
};

const more = () => {
  moreLimit.value += 5;
};

// //랭킹별로 보여주기 위한 코드
// const byRanking = computed(() => {
// 	return recentSessionContent.value.slice().sort((a, b) => b.vote - a.vote);
// });

// //default === false
// //click시 true값으로 변환

// const toggleOutline = idx => {
// 	if (totalClickCard.value.includes(idx)) {
// 		totalClickCard.value = totalClickCard.value.filter(
// 			totalIdx => totalIdx !== idx,
// 		);
// 		clickCard[idx] = false;
// 	} else if (totalClickCard.value.length < 3) {
// 		totalClickCard.value.push(idx);

// 		totalClickCard.value.forEach(totalIdx => {
// 			clickCard[totalIdx] = true;
// 		});
// 	} else {
// 		store.state.popupType = 'SelectionIsCompleted';
// 		modalVisible.value = true;
// 	}
// };

const closeModal = () => {
  modalVisible.value = false;
};

// const closeVoteModal = () => {
// 	modalVisible.value = false;
// 	router.go(0);
// };
</script>

<style lang="scss" scoped>
.text-esg-color {
  color: #24d120;
}

.banner2_borderRadius {
  border-radius: 7px;
}

.cardTbtn {
  background-color: #c944aa;
  border-radius: 7px;
}

.cardVbtn {
  background-color: #999;
  border-radius: 7px;
}

.heart {
  color: #c944aa;
  background-color: #2e3092;
}

.cardBbtn {
  background-color: #c944aa;
}

.cardFocus {
  opacity: 0.5;
  outline: none;
  outline: 3px solid #c944aa;
}

.number7 .cardImg:hover {
  cursor: pointer;
}

.mediaBottom {
  margin-bottom: 80px;

  @media (min-width: 660px) {
    margin-bottom: 200px;
  }

  @media (min-width: 860px) {
    margin-bottom: 250px;
  }
}

.totalRankingBg {
  background-color: #0c5c26;
  color: white;
}

.totalOutlineStyle {
  background-color: #e5eee7;
  color: #0c5c26;
}

.responsive-image {
  width: 15vw; /* Minimum width you allow */
}

.rank-beyond {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 8vw; /* 뷰포트 너비에 따라 크기 조절 */
  height: 8vw; /* 너비와 동일하게 높이 설정 */
  min-width: 50px; /* 최소 너비 설정 */
  min-height: 50px; /* 최소 높이 설정 */
  background-color: #d3d5d3;
  border-radius: 50%; /* 원형 모양 */
  color: white;
  font-size: 5vw;
  padding: 10px; /* 내부 여백 추가 */
}
.circle-container {
  display: flex;
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  width: 100%; // 컨테이너 전체 너비
  height: 100%; // 컨테이너 전체 높이, 이 부분은 필요에 따라 조정
  flex-direction: column; // 요소들을 세로로 정렬
}

.rounded-circle {
  width: 200px; // 원의 크기, 필요에 따라 조정
  height: 200px; // 원의 높이, width와 같게 설정하여 완벽한 원형 유지
  border-radius: 50%; // 원형
  border: 8px solid lightgray; // 테두리
  display: flex;
  justify-content: center; // 내부 컨텐츠 가로 중앙 정렬
  align-items: center; // 내부 컨텐츠 세로 중앙 정렬
  text-align: center; // 텍스트 중앙 정렬
  flex-direction: column; // 내부 요소들을 세로로 정렬
}



</style>
