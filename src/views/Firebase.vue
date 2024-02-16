<script setup>
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBnULIhMOeoGSDa66fD-g8-_nbCxqtCZmY",
  authDomain: "hello-notification-13973.firebaseapp.com",
  projectId: "hello-notification-13973",
  storageBucket: "hello-notification-13973.appspot.com",
  messagingSenderId: "176466236713",
  appId: "1:176466236713:web:a955f2caa78f5b8fc65338",
  measurementId: "G-N4H39NYW0B",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

getToken(messaging, {
  vapidKey:
    "BEgyKA8_75UEWD_r86WeuoEyaNwB6UvzA9jJsEHRWivr7pvg8pQA7CzVByuwpaJg9M1F4mhnDbUgX9ROw49yD94",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("Token is:", currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });
</script>

<!-- <template>
  <div>기능만 추가해놓았지 뭐</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
