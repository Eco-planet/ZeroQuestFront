
<template>
  <div class="h-10"></div>
  <div class="px-8 flex flex-col">
    <div class="header-container">
      <div class="modal-overlay" @click="close">
        <div class="modal-content" @click.stop>
          <div class="flex justify-between items-center mt-20">
            <div class="flex items-center">
              <button @click="close" class="back-button">
                <img
                  src="../assets/images/leftArrow.png"
                  alt="Go back"
                  class="arrow-icon"
                  style="width: 20px; height: 20px; margin-left: 20px"
                />
              </button>
            </div>
            <div class="flex-grow text-center">
              <span
                class="header-title"
                style="text-align: center; position: relative; right: 15px"
              >
               Terms</span
              >
            </div>
          </div>
          <NotionRenderer :blockMap="blockMap" fullPage class="h-full overflow-y-auto"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { NotionPage } from 'vue3-notion';
// import { getPageBlocks } from 'vue3-notion';
import { NotionRenderer, getPageBlocks } from "vue-notion";

const props = defineProps([
  'notionId'
])

const emit = defineEmits([
  'close'
])

const blockMap = ref(null);

onMounted(async () => {
  blockMap.value = await getPageBlocks(props.notionId);
});

const close = () => {
  emit('closeBtn', false)
}
</script>

<style lang="scss" scoped>
@import "vue-notion/src/styles.css";

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  display: flex;
  flex-direction: column;
}

iframe {
  flex-grow: 1;
}

.close-button {
  position: absolute;
  top: 10px;
  left: 40px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 30px;
}

.header-container .back-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
}

.header-container .header-title {
  font-size: 18px;
}

.header-container .flex-grow {
  flex-grow: 1;
}

.header-container .text-center {
  text-align: center;
}
</style>