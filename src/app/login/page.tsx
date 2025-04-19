const REDIRECT_URI = "http://localhost:3000/login/kakao-callback";

const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;

export default function LoginPage() {
  return (
    <a href={kakaoAuthUrl}>
      <button className="bg-yellow-400 text-black px-4 py-2 rounded">
        카카오 로그인
      </button>
    </a>
  );
}
