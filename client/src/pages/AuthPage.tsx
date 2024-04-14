import React from 'react';
import Layout from '../components/layouts/Layout';
import AuthLayout from '../components/layouts/AuthLayout';
import LoginForm from '../components/forms/LoginForm';
import { useLocation } from 'react-router';
import SignupForm from '../components/forms/SignupForm';

export default function AuthPage() {
  const location = useLocation();

  const searchParams = React.useMemo(
    () => new URLSearchParams(location.search),
    [location?.search]
  );

  const isLogin = React.useMemo(() => {
    return searchParams.get('redirect') === 'login';
  }, [searchParams]);

  return (
    <Layout>
      <AuthLayout isReverse={isLogin}>
        <img
          src={`/${isLogin ? 'login' : 'signup'}.webp`}
          alt="Signup"
          className={`rounded-${isLogin ? 'r' : 'l'}-xl`}
        />
        {isLogin ? <LoginForm /> : <SignupForm />}
      </AuthLayout>
    </Layout>
  );
}
