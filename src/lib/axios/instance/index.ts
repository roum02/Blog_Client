import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 쿠키 보내기
  timeout: 10_000, // 10초
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 요청 전에 필요한 작업 (ex. accessToken 붙이기)
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료로 401 Unauthorized 발생했을 때
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     // refresh 요청 보내서 새로운 accessToken 받아오기
    //     await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    //       withCredentials: true,
    //     });

    //     // 새 토큰으로 다시 원래 요청 재시도
    //     return instance(originalRequest);
    //   } catch (refreshError) {
    //     // refresh 실패 시 (로그인 만료)
    //     window.location.href = "/login";
    //     return Promise.reject(refreshError);
    //   }
    // }

    return Promise.reject(error);
  }
);

export default instance;
