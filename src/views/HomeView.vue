<template>
  <div class="home">
    <p>{{ VUE_APP_NODE_MESSAGE }}</p>
    <div class="flex justify-center">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
  <dropdown text="Click me" placement="top">
    <list-group>
      <list-group-item>Item #1</list-group-item>
      <list-group-item>Item #2</list-group-item>
      <list-group-item>Item #3</list-group-item>
    </list-group>
  </dropdown>
  <Carousel></Carousel>
</template>

<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { Carousel, Dropdown, ListGroup, ListGroupItem } from "flowbite-vue";

import openSSLCrypto from "@/utils/openSSLCrypto";

const loginToken = {
  googleId: "g1234567890",
  email: "edith2580@gmail.com",
  name: "harry1234",
  timestamp: Date.now(),
};
const json = JSON.stringify(loginToken);
console.log("JSON", json);
// {"googleId":"g1234567890","email":"edith2580@gmail.com","name":"harry1234","timestamp":1673845802756}
// token : wApK64OLhxBvzAPRo3T68hBGbx6qgNISYdZmf+cPTeImE5KSoyT7cVu/RtJ5IdYYF68Pe4ZiO6x8p6eEtrPqkPUuIx9LZWQ2sBbLVoOzKd27fXyIYGuI/44nWc+LXLpiCBugkf9IrKu9fXaFoB7J/gnZ0uBSyCOMjUqZ3QwISKn4lWMftG2kUUrsu75eITGUqtCX6EcqWOLhQQmxzJRmr1JBkIHrn82rnv3M5HKbB+aP21VKA0kZbZ5B5ZN8TJqm4EuZ2HAARRIgwqH7ftMqttU6Vz2PtiymU9AAqpXRy1t0ZU7oJSOZPlTO0jXjv0CyNqbxqtFuBw8JdXj6mR+WTA==
const encode = openSSLCrypto.encode(json);
console.log("encode : ", encode);

/*
// server에서 private key로 암호화한 문자열을 decode
const encrypted =
  "KQjy/RsncYgS072XfnUABk/xGtN/NX/EA/OAolhfx0zPiqZ2cu4WStBp/eLFAZcPs0LhCqxr64nOUr6TpUKlTMKbyJz4bXPflHvzGmdS+i0fAtQxumh9ijJDTVk+ORwZF/KXRtGcwoG/TNoo1yVl/gXp1SdZOQDBDwunH7Z40pQj5ReVtYMHdsGyUCyjod/C6qnCe8OzKKPSCZRt4Mbk0T46drV4LeC7dqvTh1UmtKNkNLFjj8k/IH6hO/65WkIJUNHGq4XsimmkD7ECD/OzdbJoSQVmK8wmjJGLzxFQR+5TI1DKAU5pnkNzlFNCpLBlg1PXkT2GS9VOLiT8B8tJKg==";
const decode = openSSLCrypto.decode(encrypted);
console.log("decode : ", decode);
*/
//console.log(process.env);

const VUE_APP_NODE_MESSAGE = process.env.VUE_APP_NODE_MESSAGE;
</script>
