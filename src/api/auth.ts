import http from "@/api/http";

function googleLogin(token: string) {
  return http.post("/auth/google", {
    token,
  });
}

function updateRefreshToken() {
  return http.post("/auth/refresh");
}

function login(userid: Nullable, password: Nullable) {
  return http.post("/login", {
    userid,
    password,
  });
}

export default {
  googleLogin,
  updateRefreshToken,
  login,
};
