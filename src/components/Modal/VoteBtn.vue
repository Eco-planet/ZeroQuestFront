<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-opacity-50 bg-gray-900 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <!--  -->
        <div v-if="NotLoadding" class="p-5 relative transform overflow-hidden bg-white shadow-xl transition-all">
          <div class="bg-white px-4 pb-4">
            <div>
              <div class="text-center">
                <h3 class="mt-4 font-semibold voteText" id="modal-title">Vote</h3>
                <!--  -->
                <div class="mt-3 text-start">
                  <div class="flex justify-center mt-4" >
                    <img class="cardImg" src="@/assets/images/Rectangle.png"/>
                  </div>
                  <div class="flex flex-col justify-between p-7"> 
                    <div class="text-center" v-if="checkModal">
                      <span class="mr-2 font-medium voteText">Do you want to vote for</span>
                      <span class="font-semibold text-green-600 checkText">Teteru bear?</span>
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
        <!--  -->
        <div v-else>
          <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const NotLoadding = ref(true)

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit("closeModal",false);
}

const checkModal = ref(true)

const isCheckModal = () => {
  NotLoadding.value = false

    setTimeout(()=>{
      NotLoadding.value = true
      checkModal.value = false
  },2000)
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