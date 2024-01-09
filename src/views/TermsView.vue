<template>
  <div class="h-10"></div>
  <div class="px-8 flex flex-col">
    <div class="flex font-semibold text-3xl">ZeroQuest</div>
    <div class="h-2"></div>
    <div class="flex text-2xl">{{ t("message.termsTitle") }}</div>
    <div class="h-10"></div>
    <div class="flex flex-col items-start">
      <div class="check-in flex justify-center">
        <input
          type="checkbox"
          v-model="check_all"
          @change="updateCheck(0)"
          id="clause-check-all"
          name="clause-check-all"
        />
        <label class="font-bold" for="clause-check-all">{{
          t("message.termsAgreeAll")
        }}</label>
      </div>
      <div class="px-8">{{ t("message.termsAgreeInfo") }}</div>
    </div>
    <div class="h-5"></div>
    <div class="h-px h-5 bg-gray-200"></div>
    <div class="h-5"></div>
    <div class="flex flex-col items-start">
      <div class="check-in flex justify-center">
        <input
          type="checkbox"
          v-model="check_01"
          @change="updateCheck(1)"
          id="clause-check01"
          name="clause-check"
        />
        <label for="clause-check01">{{ t("message.termsAgree01") }}</label>
        <div class="flex justify-center items-center">
          <div class="w-2"></div>
          <button
            class="p-2 h-8 flex justify-center items-center font-semibold text-lg text-white terms-enable"
            @click="showTerms(1)"
          >
            {{ t("message.terms") }}
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start">
      <div class="check-in flex justify-center">
        <input
          type="checkbox"
          v-model="check_02"
          @change="updateCheck(2)"
          id="clause-check02"
          name="clause-check"
        />
        <label for="clause-check02">{{ t("message.termsAgree02") }}</label>
        <div class="flex justify-center items-center">
          <div class="w-2"></div>
          <button
            class="p-2 h-8 flex justify-center items-center font-semibold text-lg text-white terms-enable"
            @click="showTerms(2)"
          >
            {{ t("message.terms") }}
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start">
      <div class="check-in flex justify-center">
        <input
          type="checkbox"
          v-model="check_03"
          @change="updateCheck(3)"
          id="clause-check03"
          name="clause-check"
        />
        <label for="clause-check03">{{ t("message.termsAgree03") }}</label>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="h-10"></div>
    <div class="h-10"></div>
    <div class="flex justify-center items-center">
      <button
        :class="[
          check_01 === true && check_02 === true
            ? 'wp-60 p-3 font-semibold text-2xl text-white terms-enable'
            : 'wp-60 p-3 font-semibold text-2xl text-white terms-disable',
        ]"
        @click="updateTerms"
      >
        {{ t("message.termsBtn") }}
      </button>
    </div>
  </div>
  <div class="h-10"></div>
  <Terms
    :visible="termsVisiable"
    @hide="closeModal"
    @termsAgree="setTerms"
    :termsType="termsType"
  />
  <Modal
    :visible="store.state.isPopup"
    @hide="closeModal"
    :title="popupTitle"
  />
</template>

<script lang="ts" setup>
import store from "@/store";
import router from "@/router";
import http from "@/api/http";
import Terms from "@/components/Terms/index.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const check_all = ref(false);
const check_01 = ref(false);
const check_02 = ref(false);
const check_03 = ref(false);
const popupTitle = ref("");

const termsVisiable = ref(false);
const termsType = ref(0);
const termsStatus = store.getters["auth/getTerms"];

const setTerms = (type: number) => {
  if (type === 1) {
    check_01.value = true;
  } else if (type === 2) {
    check_02.value = true;
  }

  updateCheck(type);
};

const showTerms = (type: number) => {
  termsType.value = type;
  termsVisiable.value = true;
};

const closeModal = () => {
  termsVisiable.value = false;
  store.state.isPopup = false;
};

const updateCheck = (type: number) => {
  if (type === 0) {
    if (check_all.value === true) {
      check_01.value = true;
      check_02.value = true;
      check_03.value = true;
    } else {
      check_01.value = false;
      check_02.value = false;
      check_03.value = false;
    }
  } else if (
    check_01.value === false ||
    check_02.value === false ||
    check_03.value === false
  ) {
    check_all.value = false;
  } else if (
    check_01.value === true &&
    check_02.value === true &&
    check_03.value === true
  ) {
    check_all.value = true;
  }
};

const updateTerms = () => {
  if (termsStatus === 1) {
    store.state.popupType = "message";
    popupTitle.value = "message.termsAgree04";
    store.state.isPopup = true;
  } else if (check_01.value === false || check_02.value === false) {
    store.state.popupType = "message";
    popupTitle.value = "message.agreeTerms";
    store.state.isPopup = true;
  } else {
    let agree = "1," + Number(check_03.value);

    http
      .post("/auth/terms", {
        uid: store.getters["auth/getUserId"],
        agree: agree,
      })
      .then((response) => {
        if (response.data.status === 1) {
          store.commit("auth/setTerms", { terms: response.data.status });

          router.push("/" + process.env.VUE_APP_FIRST_URL);
        }
      });
  }
};
</script>

<style lang="scss">
.check-in {
  display: inline-block;
  vertical-align: top;

  input[type="checkbox"],
  input[type="radio"] {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
  }

  input[type="checkbox"] + label,
  input[type="radio"] + label {
    padding-left: 25px;
    font-size: 12px;
    line-height: 32px;
    color: #000;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    position: relative;
  }

  input[type="checkbox"] + label:before,
  input[type="checkbox"] + label:after,
  input[type="radio"] + label:before,
  input[type="radio"] + label:after {
    content: "";
    width: 18px;
    height: 18px;
    background-color: #fff;
    border: 2px solid #bbb;
    font-size: 0;
    line-height: 0;
    display: inline-block;
    vertical-align: top;
    position: absolute;
    left: 0;
    top: 8px;
    border-radius: 99px;
    box-sizing: border-box;
  }

  input[type="checkbox"] + label {
  }
  input[type="checkbox"] + label:before {
  }
  input[type="checkbox"] + label:after {
    border: none;
    background: url("@/assets/images/check.svg") no-repeat center center;
    background-size: 12px;
    opacity: 0.3;
  }
  input[type="checkbox"]:checked + label:before {
    border-color: #0c5c26;
  }
  input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }

  input[type="radio"] + label {
  }
  input[type="radio"] + label:before {
    border-radius: 99px;
  }
  input[type="radio"] + label:after {
    width: 1rem;
    height: 1rem;
    margin: -0.5rem 0 0 0;
    background-color: var(--point);
    border: none;
    top: 50%;
    transition: 0.3s;
    transform-origin: 50% 50%;
    opacity: 0.3;
  }
  input[type="radio"]:checked + label:before {
    border-color: var(--point);
  }
  input[type="radio"]:checked + label:after {
    opacity: 1;
  }
}

.terms-enable {
  background-color: #0c5c26;
  border-radius: 5px;
}

.terms-disable {
  background-color: #dedede;
  border-radius: 5px;
}
</style>
