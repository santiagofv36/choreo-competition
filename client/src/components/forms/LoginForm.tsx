/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import nProgress from 'nprogress';
import { loginUser } from '@/app/api/authSlice';
import Input from '@/components/inputs/Input';
import Button from '@/components/inputs/Button';
import { useCustomNavigate, usePreviousPath } from '@/hooks/use-previouspath';

export default function LoginForm() {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    err: false,
  });

  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.auth.loading);

  const navigate = useCustomNavigate();

  const { previousPath } = usePreviousPath();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nProgress.start();

    if (!form.username || !form.password) {
      setForm((prev) => ({ ...prev, err: true }));
      return;
    }

    const result = await dispatch(loginUser(form) as any);
    if (result?.error) {
      toast.error('Invalid Credentials');
      setForm((prev) => ({ ...prev, err: true }));
      nProgress.done();
      return;
    }

    navigate(previousPath || '/');

    toast.success('Logged in successfully');
    setForm({ username: '', password: '', err: false });
    nProgress.done();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    setForm((prev) => ({ ...prev, err: false }));
  }, [form.username, form.password]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form className="flex flex-col p-8 w-full lg:px-20" onSubmit={onSubmit}>
      <header className="flex flex-col gap-4">
        <h1 className="lg:text-5xl text-3xl font-bold text-start">Login</h1>
        <p className="text-start lg:text-xl text-lg">
          Don't have an account?{' '}
          <Link
            to="/auth?redirect=signup"
            className="text-secondary font-bold underline"
          >
            create a new one.
          </Link>
        </p>
      </header>
      <div className="flex justify-between w-full gap-32">
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col gap-4 w-full">
            <label className="mt-8 lg:text-xl text-lg text-primary/70">
              Username
            </label>
            <Input
              type="text"
              placeholder="Username"
              value={form?.username}
              onChange={handleChange}
              isSearch={false}
              variant="secondary"
              name="username"
              err={form?.err}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <label className="mt-8 lg:text-xl text-lg text-primary/70">
              Password
            </label>
            <Input
              type="password"
              placeholder="•••••••••"
              value={form?.password}
              onChange={handleChange}
              isSearch={false}
              variant="secondary"
              name="password"
              err={form?.err}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <Button
        text="Login"
        onClick={() => {}}
        variant="primary"
        className="w-full mt-8 lg:text-xl text-lg"
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
}
