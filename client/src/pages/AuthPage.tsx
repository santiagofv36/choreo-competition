/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import Layout from '@/components/layouts/Layout';
import AuthLayout from '@/components/layouts/AuthLayout';
import LoginForm from '@/components/forms/LoginForm';
import SignupForm from '@/components/forms/SignupForm';
import { useCustomNavigate } from '@/hooks/use-previouspath';

export default function AuthPage() {
  const location = useLocation();

  const searchParams = React.useMemo(
    () => new URLSearchParams(location.search),
    [location?.search]
  );

  const navigate = useCustomNavigate();

  const user = useSelector((state: any) => state.auth.user);

  if (user) {
    navigate('/');
  }

  const isLogin = React.useMemo(() => {
    return searchParams.get('redirect') === 'login';
  }, [searchParams]);

  return (
    <Layout>
      <AuthLayout isReverse={isLogin}>
        <img
          src={`/${isLogin ? 'login' : 'signup'}.webp`}
          alt="Signup"
          className={`${
            isLogin
              ? 'xl:rounded-r-xl xl:rounded-ss-none'
              : 'xl:rounded-l-xl xl:rounded-e-none'
          } rounded-t-xl`}
        />
        {isLogin ? <LoginForm /> : <SignupForm />}
      </AuthLayout>
    </Layout>
  );
}
