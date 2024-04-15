/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import Input from '../inputs/Input';
import React from 'react';
import Button from '../inputs/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../app/api/apiSlice';

export default function LoginForm() {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    err: false,
  });

  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.api.loading);

  const navigate = useNavigate();

  const user = useSelector((state: any) => state.api.user);

  if (user) {
    navigate('/');
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setForm((prev) => ({ ...prev, err: true }));
      return;
    }

    const result = await dispatch(loginUser(form) as any);
    if (result?.error) {
      toast.error('Invalid Credentials');
      setForm((prev) => ({ ...prev, err: true }));
      return;
    }

    navigate('/');

    toast.success('Logged in successfully');
    setForm({ username: '', password: '', err: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    setForm((prev) => ({ ...prev, err: false }));
  }, [form.username, form.password]);

  return (
    <form className="flex flex-col p-8 w-full px-20" onSubmit={onSubmit}>
      <header className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold text-start">Login</h1>
        <p className="text-start text-xl">
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
            <label className="mt-8 text-xl text-primary/70">Username</label>
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
            <label className="mt-8 text-xl text-primary/70">Password</label>
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
        className="w-full mt-8 lg:text-xl"
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
}
