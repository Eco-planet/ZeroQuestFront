<template>
    <div class="h-10"></div>
    <div class="px-8 flex flex-col">
      <div class="header-container">
        <button @click="goBack" class="back-button">
          <img
            src="../assets/images/leftArrow.png"
            alt="Go back"
            class="arrow-icon"
          />
        </button>
        <span class="header-title">{{ selectedTitle }}</span>
      </div>
    </div>
    <br />
    <div>
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          @click="openModal(item.notionId)"
        >
          {{ item.text }}
        </li>
      </ul>
      <Modal
        v-if="isModalOpen"
        :notionId="currentNotionId"
        @close-btn="closeBtn"
      />
      <div class="copyright">Copyright @2023 ZeroQuest. All Rights Reserved.</div>
    </div>
  </template>
  
  <script setup>
  import { defineComponent, ref } from "vue";
  import { useRouter } from "vue-router";
  
  import { useI18n } from "vue-i18n";
  import Modal from "@/views/Modal.vue"
  
  
    const { t } = useI18n();
    const router = useRouter();
    const isModalOpen = ref(false);
    const currentNotionId = ref("")
    const menuItems = [
        {
      text: "Terms of Use",
      notionId: "termsEn1-2773fcc199394980ae365d80f48cfad4?pvs=4",
    },
    {
      text:"Privacy Policy",
      notionId: "termsEn-2-dfbf8b07a95c4fc99b0de6b4cc2fb887?pvs=4",
    },
    {
      text: "이용 약관",
      notionId: "termsKr-1-89ed3158ae124b9bbbb871a779a52908?pvs=4",
    },
    {
      text: "개인 정보 약관",
      notionId: "termsKr-2-2de9cfdbedf14970bf1e7c185d18b5a1?pvs=4",
    },
    ];
  
    const selectedTitle = ref(t("message.termsTitle"));
  
    const openModal = (notionId) => {
      currentNotionId.value = notionId;
      isModalOpen.value = true;
    };
  
    const closeBtn = (boolean) => {
      isModalOpen.value = boolean;
      currentNotionId.value = null;
    };
  
    const goBack = () => {
      router.back();
    };
  
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 8px 5px;
    margin-bottom: 10px;
    font-size: 1.5em;
    background-color: transparent;
    border-top: 1px solid #ddd;
    cursor: pointer;
    text-align: left;
    padding-left: 30px;
  }
  li:last-child {
    border-bottom: 1px solid #ddd;
  }
  li:hover {
    background-color: #f5f5f5;
  }
  button {
    font-size: 1em;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button:hover {
    text-decoration: underline;
  }
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .back-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
  }
  
  .header-title {
    flex-grow: 1;
    text-align: center;
    font-size: 18px;
  }
  
  .arrow-icon {
    height: 24px;
    width: auto;
  }
  
  .copyright {
    text-align: left;
    color: gray;
    padding-left: 20px;
  }
  </style> 
  
  