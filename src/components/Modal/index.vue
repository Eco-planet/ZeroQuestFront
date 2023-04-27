<template>
  <div class="global-modal" v-if="wrapperVisible" @click="clickMask">
    <div :class="['global-modal-container', innerClass]" :style="containerStyle" @click.stop>
      <img v-if="showClose" class="close-icon" src="@/assets/images/img_close_black.png" @click="hide" />
      <div class="flex flex-col justify-center items-center">
        <template v-if="title === 'qr_code'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">My Address</div>
            <div class="h-5"></div>
            <QRCodeVue3
              :width="200"
              :height="200"
              value="{{ showTitle }}"
              :dotsOptions="{
                type: 'square'
              }"
              :cornersSquareOptions="{ type: 'square', color: '#000000' }"
            />
            <div class="h-10"></div>
            <div class="p-3 text-xl bg-gray-500 rounded text-white">{{ store.getters["auth/getAddress"] }}</div>
            <div class="h-10"></div>
            <div class="p-3 flex justify-center items-center qrcode-bg" @click="doCopy">
              <div class="text-2xl text-white">Copy Address</div>
              <div class="w-5"></div>
              <div class="wp-10"><img src="@/assets/images/icon_copy.png" /></div>
            </div>
            <div class="h-10"></div>
            <div class="w-full flex">- {{ t('message.addressCaution1') }}</div>
            <div class="w-full flex">- {{ t('message.addressCaution2') }}</div>
            <div class="w-full flex">- {{ t('message.addressCaution3') }}</div>
          </div>
        </template>
        <template v-if="title !== 'qr_code'">
          <div><img class="error-icon" src="@/assets/images/icon_error.png" /></div>
          <div class="h-10"></div>
          <div class="text-2xl text-center">{{ t(showTitle) }}</div>
          <div class="h-10"></div>
          <div v-if="popupType !== 'Error'" class="flex justify-center">
            <div><button class="w-36 h-12 font-semibold text-white text-xl rounded close-btn" @click="resData('yes')">YES</button></div>
            <div class="w-20"></div>
            <div><button class="w-36 h-12 font-semibold text-white text-xl rounded close-btn" @click="resData('no')">NO</button></div>
          </div>
          <div v-if="popupType === 'Error'" class="flex justify-center">
            <div><button class="w-48 h-12 font-semibold text-white text-xl rounded close-btn" @click="hide">Closed</button></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { STATEMENT_OR_BLOCK_KEYS } from "@babel/types";
import { computed, nextTick, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import QRCodeVue3 from "qrcode-vue3";

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
  popupType: {
    type: String,
    default: () => "Error",
  },
  title: {
    type: String,
    default: () => "",
  },
  showClose: {
    type: Boolean,
    default: () => true,
  },
});

const emit = defineEmits([
  "afterShow",
  "afterHide",
  "afterLogin",
  "show",
  "hide",
  "update:visible",
  "resData"
]);
const { visible, innerStyle, title } = toRefs(props); // 弹框组件显隐
const wrapperVisible = ref(false); // 弹框外部容器显隐
const innerVisible = ref(false); // 弹框中间容器显隐
const resolvePromise = ref(null);
const showTitle = ref(title.value);

watch(visible, (val) => {
  if (val) {
    if (store.state.isLogin === true) {
      showTitle.value = "error.useAfterLogin";
    }

    wrapperVisible.value = true;
    setTimeout(() => {
      innerVisible.value = true;
      emit("afterShow");
    }, 100);
  } else {
    innerVisible.value = false;
    setTimeout(() => {
      wrapperVisible.value = false;
      emit("afterHide");

      if (store.state.isLogin === true) {
        store.state.isLogin = false;
        emit("afterLogin");
      }
    }, 100);
  }
});

const show = () => {
  emit("update:visible", true);

  return new Promise((resolve: any, _) => {
    resolvePromise.value = resolve;
  });
};

const hide = () => {
  emit("update:visible", false);
  emit("hide");
};

const resData = (resType: string) => {
  emit("resData", resType);
  emit("update:visible", false);
  emit("hide");
};

const containerStyle = computed(() => ({
  transform: innerVisible.value
    ? "translate(-50%, -50%) scale(1,1)"
    : "translate(-50%, -50%) scale(0,0)",
  ...innerStyle.value,
}));

const clickMask = () => {
  hide();
}

const doCopy = () => {
  window.navigator.clipboard.writeText(store.getters["auth/getAddress"]).then(() => {
    //console.log('copy');
  });

  hide();
};
</script>

<style lang="scss">
.global-modal {
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  &-container {
    // transition: 0.2s all ease;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, -70%);
    // border-radius: 10px;
    // padding: 80px 28px 38px 28px;
    // overflow-y: auto;
    // max-height: 90%;

    @media screen and (min-width: 840px) {
      min-width: 400px;
    }

    @media screen and (max-width: 840px) {
      padding: 5rem 2rem;
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

    .error-icon {
      width: 60%;
      height: 60%;
      margin-left: 20%;
    }

    .close-btn {
      background-color: #999;
    }

    .qrcode-bg {
      background-color: #437af0;
    }
  }
}
</style>
