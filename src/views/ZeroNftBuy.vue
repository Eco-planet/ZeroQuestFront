<template>
  <div class="flex flex-col justify-center items-center mm">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">ZeroNFT</div>
      <div class="h-8"></div>
    </div>
    <div class="h-10"></div>
    <div class="flex w-full pb-2 items-center justify-between border-b border-gray-400">
      <div class="text-2xl font-semibold">ESG Point</div>
      <div class="flex items-end">
        <div class="text-3xl font-semibold text-esg-color">99,999</div>
        <div class="w-1"></div>
        <div class="text-2xl text-gray-400">point</div>
      </div>
    </div>
    <div class="h-10"></div>

    <div class="w-full mt-5">
      <div class="grid">
        <div class="p-7 shadow-nft">
          <div class="text-left">
            <div class="w-full h-96 relative overflow-hidden">
              <img src="@/assets/images/thumb/thumb1.jpg" alt="" class="w-full h-full object-cover object-top">
            </div>
            <div class="mt-10 text-3xl font-semibold text-black">{{filterNft.name}}</div>
            <div class="mt-10 text-xl">
              <div class="flex justify-between mb-4">
                <span>Expiration Date</span>
                <span>{{ formattedDate }}</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Asset Protocol</span>
                <span>ERC-721</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Asset Public Chain</span>
                <span>Ethereum</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Remaining NFT</span>
                <span>0 / {{ filterNft?.total }}</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Price</span>
                <span>{{ filterNft?.price_eth }} ETH / {{ filterNft?.price_esg }} ESG</span>
              </div>
            </div>
            <div class="flex justify-end items-center">
              <button @click="decrease" class="bg-red-500 text-white px-4 py-2 rounded">-</button>
              <input type="number" min="0" v-model="count" class="text-sm mx-1 w-20 text-center border-2 border-gray-300" />
              <button @click="increase" class="bg-green-500 text-white px-4 py-2 rounded">+</button>
              <span class="w-24 ml-4 flex justify-end text-xl font-semibold">{{total_eth}}ETH</span>
            </div>
          </div>
        </div>
      </div>
      <div class="h-10"></div>
      <div class="flex justify-between">
        <div class="w-64 h-20 flex justify-center items-center rounded-lg text-2xl font-medium text-center text-white bg-esg-color1 cursor-pointer">ESG Point로 구매</div>
        <div class="w-64 h-20 flex justify-center items-center rounded-lg text-2xl font-medium text-center text-white bg-esg-color2 cursor-pointer">ESG Point 충전</div>
      </div>
    </div>
    <div class="h-16"></div>
    <div class="text-left">
      <div class="text-2xl font-semibold text-left">CONTENTS</div>
      <div class="text-xl mt-4 font-normal text-gray-500">
        {{ filterNft?.description }}
      </div>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
      <div class="shadow-nft-extra">
        <div class="w-full h-56 relative overflow-hidden">
          <img :src="filterNft?.extra_img1"/>
        </div>
        <div class="p-4 text-xl font-medium text-black">모바일 NFT</div>
      </div>
      <div class="shadow-nft-extra">
        <div class="w-full h-56 relative overflow-hidden">
          <img :src="filterNft?.extra_img2"/>
        </div>
        <div class="p-4 text-xl font-medium text-black">모바일 NFT</div>
      </div>
    </div>
    "asdf"{{ route.params.myParams }}
    <div class="h-40"></div>
  </div>
</template>
  
  <script lang="ts" setup>
  import { ref, reactive, computed, onMounted, defineProps } from "vue"
  import { useRoute } from "vue-router"
  import { NFTSampleType } from "../types/IZeroNftType"
  
  const route = useRoute();
  const nftName = ref<string[] | null>(null);
 
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }
  
  let formattedDate = '';

//   const name = computed(() => route.params.name || props.name)
  onMounted(() => {
    nftName.value = {
      name: route.params.name as string
    }
    // 서버에서 api를 통해 받아올 데이터 
    // nft.value = {
    //   category: route.params.category as string,
    //   name: route.params.name as string,
    //   total: Number(route.params.total),
    //   price_eth: Number(route.params.price_eth),
    //   price_esg: Number(route.params.price_esg),
    //   expiration_data: new Date(route.params.expiration_data as string),
    //   description: route.params.description as string,
    //   extra_img1: route.params.extra_img1 as string,
    //   extra_img2: route.params.extra_img2 as string,
    // };
    // if (nft.value?.expiration_data) {
    //     formattedDate = formatDate(new Date(nft.value.expiration_data));
    //   }
    //   console.log(nft.value);

  })
  
  const count = ref(0);
  const ethPerPrice = 0.002;
  
  // 각 nft마다 공통으로 들어가니까 나중에 mixin으로 작성
  const total_eth = computed(() => {
    return parseFloat((count.value * ethPerPrice).toFixed(6))
  })
  
  function increase() {
    count.value++;
  }
  
  function decrease() {
    if (count.value > 0) {
      count.value--;
    }
  }

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

// let filterNft = computed(() => {
//   return nftSample.filter(nft => nft.name === nftName.value)
// })
  
</script>

<style lang="scss">
.text-esg-color {
color: #24d120;
}
.bg-esg-color1 {
background-color: #18c050;
}
.bg-esg-color2 {
background-color: #0c5c26;
}
.shadow-nft {
box-shadow: 0 6px 8px 0px rgb(0 0 0 / 0.1), 0 2px 8px 4px rgb(0 0 0 / 0.1);
}
.shadow-nft-extra {
box-shadow: 0 6px 8px 0px rgb(0 0 0 / 0.1), 0 2px 8px 0px rgb(0 0 0 / 0.1);
}
</style>