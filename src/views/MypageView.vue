<template>
  <div class="card">
    <div>
      accessToken ({{ this.$store.getters["auth/isAccessTokenExpire"] }}) =
      {{ this.$store.state.auth.accessToken }}
    </div>
    <br />
    <div>
      refreshToken ({{ this.$store.getters["auth/isRefreshTokenExpire"] }}) =
      {{ this.$store.state.auth.refreshToken }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: "",
      password: "",
    };
  },
  methods: {},
};
</script>
