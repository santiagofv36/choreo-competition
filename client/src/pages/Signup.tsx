import Layout from '../components/Layout';
import SignupForm from '../components/forms/SignupForm';
import AuthLayout from '../components/AuthLayout';

export default function SignupPage() {
  return (
    <Layout>
      <AuthLayout>
        <img
          src="./public/signup.webp"
          alt="Signup"
          className="h-[798px] rounded-l-xl"
        />
        <SignupForm />
      </AuthLayout>
    </Layout>
  );
}
