"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      console.log({ response });
    } catch (error) {
      console.log("Error during registration", error);
      setError("Error during registration");
    }
  };

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4'>
        <h1 className='text-xl font-bold my-4'>Register</h1>
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
            className='bg-green-500 text-white w-fit text-sm cursor-pointer font-bold px-6 py-2'
            type='submit'
          >
            Register
          </button>

          {error && (
            <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}

          <Link href='/login' className='text-sm mt-3 text-right'>
            {" "}
            Already have an account?
            <span className='underline'>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
