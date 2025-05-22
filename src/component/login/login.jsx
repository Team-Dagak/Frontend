/** @jsxImportSource @emotion/react */

import { useAuthStore } from "../../store/states"
import { css } from "@emotion/react"
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";


const Container = css`
  display: flex;
  align-items:center;
  justify-content: center;
  background-color: gray;
  padding: 4px;
  height: 100%;
`

const Level2Container = css`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px;
  border-color: gray;
  background-color: #ffffff;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const TextStyle = css`
  text-align: center;
  margin-top: 4px;
`

const ButtonContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const ButtonTemplate = css`
  display: flex;
  height: 30px;
  width: fit-content;
  min-width: 200px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: white;
  gap: 8px;
  padding: 0 30px;
  font-size: 14px;
`

export default function Login() {
  const { isLoading, googleLogin, kakaoLogin } = useAuthStore()

  return (
    <div css={Container}>
      <div css={Level2Container}>
        <div css={TextStyle}>
          <img src="./image.webp" css={{height:"50px  "}}></img>
          <h2>다각다각</h2>
          <p>소셜 계정으로 간편하게 로그인하세요</p>
        </div>

        <div css={ButtonContainer}>
          <button
            css={[ButtonTemplate, {BackgroundColor:"#ffffff"}]}
            onClick={googleLogin}
            disabled={isLoading}
          >
            <FcGoogle size="20px" />
            <span>Google로 로그인</span>
          </button>

          <button
            css={[ButtonTemplate, {backgroundColor:"#fee500"}]}
            onClick={kakaoLogin}
            disabled={isLoading}
          >
            <RiKakaoTalkFill size="20px"/>
            <span>카카오로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  )
}
