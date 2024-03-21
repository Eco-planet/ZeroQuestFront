<template>
  <div class="mt-16 px-9 text-left">
    <div>
      <div class="text-black text-2xl font-bold">
        Please select a reason for withdrawal.
      </div>
      <div class="py-1 font-medium">
        Based on your feedback, we will become a better Zero Quest.
      </div>
      <select
        class="w-full h-12 text-black text-center rounded-lg"
        id="delivery-options"
        name="delivery-check"
        v-model="selectedOption"
      >
        <option class="font-bold" value="쓰지 않는 앱이에요">
          It's an app I don't use
        </option>
        <option class="font-bold" value="계좌/카드 연결이 안 돼요">
          Can't connect account/card
        </option>
        <option class="font-bold" value="오류가 생겨서 쓸 수 없어요">
          Can't use it due to an error
        </option>
        <option class="font-bold" value="앱 사용법을 모르겠어요">
          I don't know how to use the app
        </option>
        <option class="font-bold" value="기타사항">Other reasons</option>
      </select>
    </div>

    <div class="mt-16 pb-8">
      <div class="py-1 text-black text-2xl font-bold">
        Please tell us more about your reason.
      </div>
      <textarea
        class="h-56 p-3 w-full border-gray-500 border-1 border-solid rounded-lg"
        v-model="withdrawReason"
      ></textarea>
    </div>
    <div>
      <button
        class="text-2xl text-white bg-green-700 p-3 w-full border-gray-500 border-1 border-solid rounded-lg"
        @click="withdraw"
      >
        Next
      </button>
    </div>
  </div>

  <Modal
    :showClose="showClose"
    :visible="modalVisible"
    :withdrawVisible="modalWithdrawVisible"
    @clickWithdraw="clickWithdraw"
    @refreshHide="WithdrawCloseModal"
    @hide="closeModal"
    title="message.sorryChecking"
  />
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import http from "@/api/http";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const modalVisible = ref(false);
const modalWithdrawVisible = ref(false);
const selectedOption = ref("탈퇴사유선택");
const showClose = ref(true);
const withdrawReason = ref("");
console.log("reason", withdrawReason.value);

const withdraw = () => {
  store.state.popupType = "withDraw";
  modalVisible.value = true;
};
const clickWithdraw = () => {
  store.commit("auth/setClearToken");
  const formData = {
    selectedOption: selectedOption.value,
    withdrawReason: withdrawReason.value,
  };
  //회원 탈퇴 시 uid로 삭제되는 테이블에 user_nft_rewards도 추가
  http.post("/auth/withdraw", formData).then((response) => {
    console.log("res", response);
    if (response.data.message === "Success") {
      console.log("success");
      //db삭제됨
      modalVisible.value = false;
      //탈퇴되었습니다 모달 띄워야됨
      store.state.popupType = "successWithdraw";
      modalWithdrawVisible.value = true;
      showClose.value = false;
    }
  });
};
const WithdrawCloseModal = () => {
  console.log("탈퇴완료버튼누름");
  modalVisible.value = false;
  // router.go(0)
  router.push("/");
};
const closeModal = () => {
  modalVisible.value = false;
};
</script>
<style lang="scss" scoped></style>
