
import React from 'react';
import { useEffect , useState } from "react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter,Navigate,Routes, Route} from 'react-router-dom';
import Router from './routes';
import Login from "./component/login/login";
import { globalStyle } from './component/common/styles/globalStyle/globalStyle';
import { Global } from '@emotion/react';
import { useAuthStore } from './store/states'
const queryClient = new QueryClient();

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuthStatus } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthStatus()
      setIsChecking(false)
    }
    verifyAuth()
  }, [checkAuthStatus])

  if (isChecking) {
    return <div className="flex h-screen items-center justify-center">인증 확인 중...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}


const App = () => {
  const { checkAuthStatus } = useAuthStore()

  useEffect(() => {
    // 앱 시작 시 인증 상태 확인
    checkAuthStatus()
  }, [checkAuthStatus])

  return (
    
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/Frontend">
      
      <Global styles={globalStyle} />
      <div className='app'>
        <Routes>
        {/* 로그인은 별도 */}
        <Route path="/login" element={<Login />} />
        {/* 나머지는 ProtectedRoute로 감싼다 */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Router />
            </ProtectedRoute>
          }
        />
      </Routes>
      </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};


export default App;

