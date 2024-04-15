/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import Input from '../inputs/Input';
import React from 'react';
import Button from '../inputs/Button';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { registerUser } from '../../app/api/apiSlice';

export default function SignupForm() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    termsOfPolicy: false,
    err: false,
  });

  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.api.loading);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.username
    ) {
      setForm((prev) => ({ ...prev, err: true }));
      toast.error('Please fill in all fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setForm((prev) => ({ ...prev, err: true }));
      toast.error('Passwords do not match');
      return;
    }

    if (!form.termsOfPolicy) {
      toast.error('Please agree to the terms of service and privacy policy');
      return;
    }

    const result = await dispatch(
      registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        username: form.username,
      }) as any
    );

    if (result?.error) {
      toast.error('An error occurred. Please try again');
      return;
    }

    toast.success('Account created successfully');
    setForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      termsOfPolicy: false,
      err: false,
    });
    window.scrollTo(0, 0);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    setForm((prev) => ({ ...prev, err: false }));
  }, [
    form.name,
    form.email,
    form.password,
    form.confirmPassword,
    form.username,
    form.termsOfPolicy,
  ]);

  return (
    <form className="flex flex-col p-8 w-full" onSubmit={onSubmit}>
      <header className="flex flex-col gap-4">
        <h1 className="lg:text-5xl text-3xl font-bold text-start">Signup</h1>
        <p className="text-start lg:text-xl text-lg">
          Already have an account?{' '}
          <Link
            to="/auth?redirect=login"
            className="text-secondary font-bold underline"
          >
            Login
          </Link>
        </p>
      </header>
      <div className="flex flex-col 2xl:flex-row justify-between w-full 2xl:gap-32">
        <div className="flex flex-col gap-4 w-full">
          <label className="mt-8 lg:text-xl text-lg text-primary/70">
            Full name
          </label>
          <Input
            type="text"
            placeholder="Full name"
            value={form?.name}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="name"
            err={form?.err}
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <label className="mt-8 lg:text-xl text-lg text-primary/70">
            Email
          </label>
          <Input
            type="email"
            placeholder="person@example.com"
            value={form?.email}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="email"
            err={form?.err}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row justify-between w-full 2xl:gap-32">
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
        <div className="flex flex-col gap-4 w-full">
          <label className="mt-8 lg:text-xl text-lg text-primary/70">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="••••••••••"
            value={form?.confirmPassword}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="confirmPassword"
            err={form?.err}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row justify-between w-full 2xl:gap-32">
        <div className="flex flex-col gap-4 2xl:w-[42%]">
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
      </div>
      <div className="flex flex-col gap-4 w-full justify-start items-center -mt-12">
        <label className="mt-8 text-xl text-primary/70"> </label>
        <div className="flex gap-8 mt-12 items-center justify-center">
          <Input
            type="checkbox"
            value={form?.termsOfPolicy ? 'true' : 'false'}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="termsOfPolicy"
            className="w-5 h-5 mt-2"
            err={form?.err}
            disabled={isLoading}
          />
          <label className="lg:text-xl text-lg text-primary/70">
            I have read an greed to the Terms of Sevice and Privacy Policy
          </label>
        </div>
        <Button
          text="Create Account"
          onClick={() => {}}
          variant="primary"
          className="w-full mt-8"
          type="submit"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
