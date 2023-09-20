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
                <h3 class="mt-4 font-semibold voteText" id="modal-title">{{t('message.battleVoteMessage')}}</h3>
                <!--  -->
              </div>
            </div>
          </div>
          <div>
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit("closeModal",false);
}

</script>

<style lang="scss" scoped>

.voteText {
  font-size: clamp(1.7rem, 2.5vw, 2.5rem);
}
.VoteBtn {
  background-color: #24d120;
  width: 34vw;
  max-width : 180px;
  height: 30px;
} 
</style>