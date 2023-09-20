<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-opacity-50 bg-gray-900 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <!--  -->
        <div class="p-5 relative transform overflow-hidden bg-white shadow-xl transition-all">
          <div class="bg-white px-4 pb-4">
            <div>
              <div class="text-center">
                <h3 class="mt-4 font-semibold voteText" id="modal-title">Vote</h3>
                <!--  -->
                <div class="mt-3 text-start">
                  <div class="flex justify-center mt-4" >
                    <svg class="cardImg  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                      <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                    </svg>
                  </div>
                  <div class="flex flex-col justify-between p-7"> 
                    <div class="text-center" v-if="checkModal">
                      <span class="mr-2 font-medium voteText">Do you want to vote for</span>
                      <span class="font-semibold text-green-600 checkText">This Session?</span>
                    </div>
                    <div class="text-center" v-else> 
                      <span class="font-semibold voteText">Voting Success! </span>
                    </div>
                  </div>
                </div>
                <!--  -->
              </div>
            </div>
          </div>
          <div class="flex justify-center py-3" v-if="checkModal">
            <button 
              data-modal-target="staticModal" data-modal-toggle="staticModal"
              href="#" 
              class="
              rounded-lg
              text-xl
              text-white 
              focus:ring-4 
              focus:ring-gray-300 
              dark:bg-gray-600 
              dark:hover:bg-gray-700 
              dark:focus:ring-gray-800
              cancleBtn"
              @click ="closeModal"
              >
                <div class="flex justify-center">
                  <div>Cancle</div>
                </div>
            </button>
            <button 
              data-modal-target="staticModal" data-modal-toggle="staticModal"
              href="#" 
              class="
              ml-8
              rounded-lg
              text-xl
              text-white 
              focus:ring-4 
              focus:ring-green-300 
              dark:bg-green-600 
              dark:hover:bg-green-700 
              dark:focus:ring-green-800
              VoteBtn"
              @click="isCheckModal"
              >
                <div class="flex justify-center">
                  <div>Vote</div>
                </div>
            </button>
          </div>
          <div v-else>
            <button 
            data-modal-target="staticModal" data-modal-toggle="staticModal"
            href="#" 
            class="
            rounded-lg
            text-xl
            text-white 
            focus:ring-4 
            focus:ring-green-300 
            dark:bg-green-600 
            dark:hover:bg-green-700 
            dark:focus:ring-green-800
            VoteBtn"
            @click ="closeModal"
            >
              <div class="flex justify-center">
                <div>ok</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import http from "@/api/http";
import { useStore } from 'vuex';

const setStore = useStore()

const props = defineProps({
  voteIdx:Number,
})

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit("closeModal",false);
}

const checkModal = ref(true)

//vote버튼누르면 isCheckModal 함수실행
//checkModal.value를 false로 바꿔주면서 
//ui버튼을 ok로 바꿔줌

const isCheckModal = () => {
  http.post(`/api/battle/vote/${ props.voteIdx }`)
  .then((response) => {
    const remainingVotes = response.data.data.vote
    const votedIdx = props.voteIdx 

    setStore.dispatch('incrementContentsVote', votedIdx)
    setStore.dispatch('auth/updateUserVotes', remainingVotes)
  })
  .catch((error) => {
    alert(error)
  })
  checkModal.value = false
}
</script>

<style lang="scss" scoped>

.voteText {
  font-size: clamp(1.7rem, 2.5vw, 2.5rem);
}

.cardImg {
  width: 33vw;
  max-width: 330px;
  height: 33vw;
  max-height: 350px;
}

.checkText{
  color: #0c5c26;
  font-size: clamp(1.7rem, 2.5vw, 2.5rem);
}

.cancleBtn {
  background-color: #999999;
  width: 34vw;
  max-width : 180px;
  height: 30px;
}
.VoteBtn {
  background-color: #24d120;
  width: 34vw;
  max-width : 180px;
  height: 30px;
} 
</style>