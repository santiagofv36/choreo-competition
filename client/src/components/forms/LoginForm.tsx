import { Link } from 'react-router-dom';
import Input from '../inputs/Input';
import React from 'react';
import Button from '../inputs/Button';

export default function LoginForm() {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      />
    </form>
  );
}
