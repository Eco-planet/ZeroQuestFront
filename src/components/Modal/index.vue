<template>
  <div class="global-modal" v-if="wrapperVisible" @click="clickMask">
    <div
      :class="['global-modal-container', innerClass]"
      :style="containerStyle"
      @click.stop
    >
      <div class="title">{{ title }}</div>
      <div class="sub-title">{{ subTitle }}</div>
      <img
        v-if="showClose"
        class="close-icon"
        src="@/assets/images/img_close_black.png"
        @click="hide"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, toRefs, watch } from "vue";

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
  title: {
    type: String,
    default: () => "",
  },
  subTitle: {
    type: String,
    default: () => "",
  },
  showClose: {
    type: Boolean,
    default: () => true,
  },
});

const emit = defineEmits(["afterShow", "afterHide", "hide", "update:visible"]);
const { visible, innerStyle } = toRefs(props); // 弹框组件显隐
const wrapperVisible = ref(false); // 弹框外部容器显隐
const innerVisible = ref(false); // 弹框中间容器显隐

watch(visible, (val) => {
  if (val) {
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
    }, 100);
  }
});
function hide() {
  emit("update:visible", false);
  emit("hide");
}

const containerStyle = computed(() => ({
  transform: innerVisible.value
    ? "translate(-50%, -70%) scale(1,1)"
    : "translate(-50%, -70%) scale(0,0)",
  ...innerStyle.value,
}));

function clickMask() {
  hide();
}
</script>

<style lang="scss">
.global-modal {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  &-container {
    // transition: 0.2s all ease;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, -70%);
    border-radius: 10px;
    padding: 80px 28px 38px 28px;
    overflow-y: auto;
    max-height: 90%;

    @media screen and (min-width: 840px) {
      min-width: 400px;
    }

    @media screen and (max-width: 840px) {
      padding: 6.5rem 2rem;
      width: calc(100% - 60px);
    }

    .title {
      position: absolute;
      top: 27px;
      left: 27px;
      font-size: 20px;
      font-weight: bold;
    }

    .sub-title {
      position: absolute;
      top: 55px;
      left: 29px;
      font-size: 15px;
      color: #999;
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
  }
}
</style>
