import { Link } from 'react-router-dom';
import Input from '../inputs/Input';
import React from 'react';

export default function SignupForm() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    termsOfPolicy: false,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="flex flex-col p-8 w-full" onSubmit={onSubmit}>
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-start">Signup</h1>
        <p className="text-start text-lg">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-bold underline">
            Login
          </Link>
        </p>
      </header>
      <div className="flex justify-between w-full gap-32">
        <div className="flex flex-col gap-4 w-full">
          <label className="mt-8 text-lg text-primary/70">Full name</label>
          <Input
            type="text"
            placeholder="Full name"
            value={form?.name}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="name"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <label className="mt-8 text-lg text-primary/70">Email</label>
          <Input
            type="email"
            placeholder="person@example.com"
            value={form?.email}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="email"
          />
        </div>
      </div>
      <div className="flex justify-between w-full gap-32">
        <div className="flex flex-col gap-4 w-full">
          <label className="mt-8 text-lg text-primary/70">Password</label>
          <Input
            type="password"
            placeholder="•••••••••"
            value={form?.password}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <label className="mt-8 text-lg text-primary/70">
            Confirm Password
          </label>
          <Input
            type="email"
            placeholder="••••••••••"
            value={form?.confirmPassword}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="confirmPassword"
          />
        </div>
      </div>
      <div className="flex justify-between w-full gap-32">
        <div className="flex flex-col gap-4 w-[57%]">
          <label className="mt-8 text-lg text-primary/70">Username</label>
          <Input
            type="text"
            placeholder="Username"
            value={form?.username}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="username"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full justify-start items-center">
        <label className="mt-8 text-lg text-primary/70"> </label>
        <div className="flex gap-8 mt-12 items-center justify-center">
          <Input
            type="checkbox"
            value={form?.termsOfPolicy ? 'true' : 'false'}
            onChange={handleChange}
            isSearch={false}
            variant="secondary"
            name="termsOfPolicy"
            className="w-5 h-5 mt-2"
          />
          <label className="text-lg text-primary/70">
            I have read an greed to the Terms of Sevice and Privacy Policy
          </label>
        </div>
      </div>
    </form>
  );
}
