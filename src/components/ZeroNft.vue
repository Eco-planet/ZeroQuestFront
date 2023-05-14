<template>
    <div class="w-full mt-10">
      <ul class="grid grid-cols-2 gap-x-8 gap-y-8">
        <li class="p-4 shadow-nft" v-for="nft in nftSample.filter(item => item.category === props.selectedName)" :key="nft.name">
          <div class="text-left" @click="goToDetail(nft.name)">
            <div class="w-full h-44 relative overflow-hidden">
              <img src="@/assets/images/thumb/thumb1.jpg" alt="" class="w-full h-full object-cover object-top">
            </div>
            <div class="mt-4 text-xl font-medium text-black">{{ nft.name }}</div>
            <div class="mt-2 text-lg font-light text-gray-700">0 / {{ nft.total }}</div>
            <div class="text-lg font-light text-gray-400">{{nft.price_eth}} ETH / {{ nft.price_esg }} ESG</div>
          </div>
        </li>
      </ul>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref, onMounted, Ref } from "vue";
import { useRouter } from "vue-router"
import { NFTSampleType } from "@/types/IZeroNftType"

const router = useRouter();

const props = defineProps({
    selectedName: {
        type: String,
        default() {
            return {}
        }
    }
})

// 샘플 데이터, 나중에 admin에서 추가되는 데이터
let nftSample = reactive<NFTSampleType[]>([
    {
        category: "ECOiTEM",
        name: "Pino1 NFT 1End",
        total: 250,
        price_eth: 0.002,
        price_esg: 40,
        expiration_data: new Date("2023-05-31"),
        description: 'Ullamco incididunt nostrud elit fugiat minim veniam. Pariatur officia tempor ipsum veniam est culpa id labore. Et nostrud eiusmod qui esse. Nisi cillum consectetur commodo exercitation labore eiusmod in. Nisi eu esse Lorem ipsum ullamco quis in aliqua id excepteur velit dolor eiusmod consequat.',
        extra_img1: require('@/assets/images/thumb/thumb1.jpg'),
        extra_img2: require('@/assets/images/thumb/thumb2.jpg')
    },
    {
        category: "ECOiTEM",
        name: "Pino2 NFT 1End",
        total: 250,
        price_eth: 0.003,
        price_esg: 50,
        expiration_data: new Date("2023-05-31"),
        description: 'blah blah contents description',
        extra_img1: '@/assets/images/thumb/thumb1.jpg',
        extra_img2: '@/assets/images/thumb/thumb2.jpg'
    },
    {
        category: "ECOiTEM",
        name: "Pino3 NFT 1End",
        total: 250,
        price_eth: 0.004,
        price_esg: 60,
        expiration_data: new Date("2023-05-31"),
        description: 'blah blah contents description',
        extra_img1: '@/assets/images/thumb/thumb1.jpg',
        extra_img2: '@/assets/images/thumb/thumb2.jpg'
    },
    {
        category: "Game",
        name: "Pino4 NFT 1End",
        total: 250,
        price_eth: 0.005,
        price_esg: 70,
        expiration_data: new Date("2023-05-31"),
        description: 'blah blah contents description',
        extra_img1: '@/assets/images/thumb/thumb1.jpg',
        extra_img2: '@/assets/images/thumb/thumb2.jpg'
    },
    {
        category: "Game",
        name: "Pino4 NFT 1End",
        total: 250,
        price_eth: 0.005,
        price_esg: 70,
        expiration_data: new Date("2023-05-31"),
        description: 'blah blah contents description',
        extra_img1: '@/assets/images/thumb/thumb1.jpg',
        extra_img2: '@/assets/images/thumb/thumb2.jpg'
    },
    {
        category: "Tree",
        name: "Pino4 NFT 1End",
        total: 250,
        price_eth: 0.005,
        price_esg: 70,
        expiration_data: new Date("2023-05-31"),
        description: 'blah blah contents description',
        extra_img1: '@/assets/images/thumb/thumb1.jpg',
        extra_img2: '@/assets/images/thumb/thumb2.jpg'
    },
    {
        category: "Tree",
        name: "Pino4 NFT 1End",
        total: 250,
        price_eth: 0.005,
        price_esg: 70,
        expiration_data: new Date("2023-05-31"),
        description: 'blah blah contents description',
        extra_img1: '@/assets/images/thumb/thumb1.jpg',
        extra_img2: '@/assets/images/thumb/thumb2.jpg'
    },
    {
        category: "Panda",
        name: "Pino4 NFT 1End",
        total: 250,
        price_eth: 0.005,
        price_esg: 70,
        expiration_data: new Date("2023-05-31"),
        description: 'blah blah contents description',
        extra_img1: '@/assets/images/thumb/thumb1.jpg',
        extra_img2: '@/assets/images/thumb/thumb2.jpg'
    },
])

// query로 해당 nft이름을 보내서 그 nft정보를 가져온다.
function goToDetail(name: string) {
    console.log("nftName", name)
    router.push({
        path: '/zeronftbuy',
        name: "zeronftbuy",
        params: {name: name}
    })
}
</script>
  
  <style lang="scss">
  .shadow-nft {
    box-shadow: 0 6px 8px 0px rgb(0 0 0 / 0.1), 0 2px 8px 0px rgb(0 0 0 / 0.1);
  }
  </style>