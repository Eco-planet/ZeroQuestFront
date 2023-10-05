<template>
  <div class="global-modal" v-if="wrapperVisible" @click="clickMask">
    <div :class="['global-modal-container', innerClass]" :style="containerStyle" @click.stop>
      <img v-if="showClose" class="close-icon" src="@/assets/images/img_close_black.png" @click="hide" />
      <div class="h-10"></div>
      <div class="flex flex-col justify-center items-center">
        <div class="text-2xl text-center">
          <template v-if="termsType === 1">
            <textarea v-if="locale === 'kr'" class="terms" cols="60" rows="40">{{ termsKR1 }}</textarea>
            <textarea v-else class="terms" cols="60" rows="40">{{ termsEN1 }}</textarea>
          </template>
          <template v-if="termsType === 2">
            <textarea v-if="locale === 'kr'" class="terms" cols="60" rows="40">{{ termsKR2 }}</textarea>
            <textarea v-else class="terms" cols="60" rows="40">{{ termsEN2 }}</textarea>
          </template>
        </div>
        <div class="h-10"></div>
        <div><button class="w-48 h-12 font-semibold text-white text-xl rounded close-btn" @click="updateAgree">{{ t("message.agreeBtn") }}</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { computed, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import termsKR1 from "!raw-loader!@/assets/terms/termsKR1.md";
import termsKR2 from "!raw-loader!@/assets/terms/termsKR2.md";
import termsEN1 from "!raw-loader!@/assets/terms/termsEN1.md";
import termsEN2 from "!raw-loader!@/assets/terms/termsEN2.md";

const vuexStore = useStore(); // Use a different variable name for the store
const locale = computed(() => vuexStore.state.system.locale)
const { t } = useI18n();

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  innerStyle: {
    type: Object,
    default: () => ({}),
  },
  innerClass: {
    type: String,
    defualt: () => "",
  },
  termsType: {
    type: Number,
    default: () => 0,
  },
  showClose: {
    type: Boolean,
    default: () => true,
  },
});

const emit = defineEmits([
  "show",
  "hide",
  "update:visible",
  "termsAgree",
]);
const { visible, innerStyle, termsType } = toRefs(props); // 弹框组件显隐
const wrapperVisible = ref(false); // 弹框外部容器显隐
const innerVisible = ref(false); // 弹框中间容器显隐
const resolvePromise = ref(null);

watch(visible, (val) => {
  if (val) {
    wrapperVisible.value = true;
    innerVisible.value = true;
  } else {
    wrapperVisible.value = false;
    innerVisible.value = false;
  }
});

const show = () => {
  emit("update:visible", true);

  return new Promise((resolve: any, _) => {
    resolvePromise.value = resolve;
  });
};

const updateAgree = () => {
  emit("termsAgree", termsType.value);
  emit("update:visible", false);
  emit("hide");
};

const hide = () => {
  emit("update:visible", false);
  emit("hide");
};

const clickMask = () => {
  hide();
}

const containerStyle = computed(() => ({
  transform: innerVisible.value
    ? "translate(-50%, -50%) scale(1,1)"
    : "translate(-50%, -50%) scale(0,0)",
  ...innerStyle.value,
}));
</script>

<style lang="scss">
.terms, .terms:focus {
  border: none;
  background-color: transparent;
  resize: none;
  // outline: none;
  outline: 0px !important;
  outline-offset: 0px !important;
  box-shadow: none !important;
}

.global-modal {
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  &-container {
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;

    @media screen and (min-width: 840px) {
      min-width: 400px;
    }

    @media screen and (max-width: 840px) {
      padding: 2rem 2rem;
      width: calc(100% - 60px);
    }

    .title {
      position: absolute;
      top: 27px;
      left: 27px;
      font-size: 20px;
      font-weight: bold;
    }

    .close-icon {
      position: absolute;
      top: 27px;
      right: 27px;
      width: 20px;
      height: 20px;
      cursor: pointer;

      @media screen and (max-width: 840px) {
        position: absolute;
        top: 18px;
        right: 18px;
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    }

    .close-btn {
      background-color: #0c5c26;
    }
  }
}
</style>
