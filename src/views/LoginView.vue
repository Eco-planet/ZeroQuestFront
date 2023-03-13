<template>
  <GoogleLogin :callback="callback" />
  <!-- <div class="card-footer text-center">
    <button type="button" class="btn btn-dark" @click="login">로그인</button>
  </div> -->
  <button type="button" @click="updateExpire">UPDATE</button>
  <div>expire = {{ isAccessTokenExpire }}</div>
  <div>TOKEN = {{ this.$store.getters["auth/getAccessToken"] }}</div>
</template>

<script lang="ts" setup>
import store from "@/store";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { CallbackTypes, decodeCredential } from "vue3-google-login";
import { computed } from "vue";

const isAccessTokenExpire = computed(
  () => store.getters["auth/isAccessTokenExpire"]
);

const callback: CallbackTypes.CredentialCallback = (response) => {
  login(response.credential);
};

const login = (credential: string): void => {
  const userData: any = decodeCredential(credential);
  console.log("Handle the userData", userData);
  console.log(userData.email);

  const loginToken = {
    googleId: userData.sub,
    email: userData.email,
    name: userData.name,
    timestamp: Date.now(),
  };

  const json = JSON.stringify(loginToken);
  console.log("JSON", json);
  // {"googleId":"g1234567890","email":"edith2580@gmail.com","name":"harry1234","timestamp":1673845802756}
  // token : wApK64OLhxBvzAPRo3T68hBGbx6qgNISYdZmf+cPTeImE5KSoyT7cVu/RtJ5IdYYF68Pe4ZiO6x8p6eEtrPqkPUuIx9LZWQ2sBbLVoOzKd27fXyIYGuI/44nWc+LXLpiCBugkf9IrKu9fXaFoB7J/gnZ0uBSyCOMjUqZ3QwISKn4lWMftG2kUUrsu75eITGUqtCX6EcqWOLhQQmxzJRmr1JBkIHrn82rnv3M5HKbB+aP21VKA0kZbZ5B5ZN8TJqm4EuZ2HAARRIgwqH7ftMqttU6Vz2PtiymU9AAqpXRy1t0ZU7oJSOZPlTO0jXjv0CyNqbxqtFuBw8JdXj6mR+WTA==
  const encode = openSSLCrypto.encode(json);
  console.log("encode : ", encode);

  store.dispatch("auth/googleLogin", {
    token: encode,
  });
};

const updateExpire = (): void => {
  store.dispatch("auth/updateExpire");
};
</script>

<!-- <script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      //dialog: /*..*/   // move to computed
    };
  },
  computed: mapGetters({
    expire: "auth/isAccessTokenExpire",
  }),
};
</script> -->
