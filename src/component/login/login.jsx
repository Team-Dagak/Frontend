"use client"

import { useAuthStore } from "../../store/states"

export default function Login() {
  const { isLoading, googleLogin, kakaoLogin } = useAuthStore()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">로그인</h2>
          <p className="text-sm text-gray-500">소셜 계정으로 간편하게 로그인하세요</p>
        </div>

        <div className="mt-6 space-y-4">
          <button
            className="flex h-12 w-full items-center justify-center space-x-2 rounded-md border-2 border-gray-200 bg-white transition-colors hover:bg-gray-50"
            onClick={googleLogin}
            disabled={isLoading}
          >
            <GoogleIcon className="h-5 w-5" />
            <span>Google로 로그인</span>
          </button>

          <button
            className="flex h-12 w-full items-center justify-center space-x-2 rounded-md border-0 bg-[#FEE500] text-black transition-colors hover:bg-[#FDD835]"
            onClick={kakaoLogin}
            disabled={isLoading}
          >
            <KakaoIcon className="h-5 w-5" />
            <span>카카오로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// 구글 아이콘 컴포넌트
function GoogleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
      />
      <path
        fill="#34A853"
        d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
      />
      <path
        fill="#4A90E2"
        d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
      />
    </svg>
  )
}

// 카카오 아이콘 컴포넌트
function KakaoIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#000000"
        d="M12 3C6.4775 3 2 6.4775 2 10.8C2 13.6325 3.8025 16.0725 6.5 17.4075V21L10.1275 18.5925C10.7375 18.6825 11.3625 18.6 12 18.6C17.5225 18.6 22 15.1225 22 10.8C22 6.4775 17.5225 3 12 3Z"
      />
    </svg>
  )
}
