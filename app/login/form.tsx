"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      console.log({ response });
      if (response?.error) {
        setError("Invalid Credentials");
        return;
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4'>
        <h1 className='text-xl font-bold my-4'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            className='border border-black text-black'
            placeholder='Email'
            type='email'
            name='email'
          />
          <input
            className='border border-black text-black'
            placeholder='Password'
            type='password'
            name='password'
          />
          <button
            className='bg-green-500 text-white font-bold cursor-pointer px-6 py-2'
            type='submit'
          >
            Login
          </button>
          {error && (
            <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}

          <Link className='text-sm mt-3 text-right' href={"/register"}>
            Don't have an account? <span className='underline'>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
