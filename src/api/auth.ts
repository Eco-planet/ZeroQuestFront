import http from "@/api/http";

const googleLogin = (token: string) => {
  return http.post("/auth/google", {
    token,
  });
}

const updateRefreshToken = () => {
  return http.post("/auth/refresh");
}

const login = (userid: Nullable, password: Nullable) => {
  return http.post("/auth/login", {
    userid,
    password,
  });
}

export default {
  googleLogin,
  updateRefreshToken,
  login,
};

