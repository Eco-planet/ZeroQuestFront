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
  import { defineComponent, ref } from "vue";  // ref를 여기서 가져옴
  import { useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";
  import Modal from "@/views/Modal.vue"
  
  const { t } = useI18n();
  const router = useRouter();
  const isModalOpen = ref(false);
  const currentNotionId = ref("");
  const menuItems = [
      {
      text: "Terms of Use",
      notionId: "Terms-of-Use-a5c46d2598f340728969206a9e5a194a?pvs=4",
      },
      {
      text: "Privacy Policy",
      notionId: "Privacy-Policy-c9917133bc934eceb66929e3ae4f2ba2?pvs=4",
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
    flex-direction: column; 
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
    display: block;
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
  
  