"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";

export default function LoginPage() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch(); // To dispatch actions to the Redux store
  const [email, setEmail] = useState("superadmin@gmail.com");
  const [password, setPassword] = useState("superadmin");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };
      const res = await loginUser(loginData).unwrap();
      console.log(res);
      if (res?.success) {
        const user = jwtDecode(res?.data?.accessToken);
        dispatch(setUser({ user, token: res?.data?.accessToken }));
        toast.success(res?.message);
        router.push(`/`);
  }
    } catch (error) {
      console.log(error);
      toast.error("Invalid information !");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className=" my-6">
          <h2 className="text-center text-3xl font-extrabold text-black">
            Login to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />

          <div className="rounded-md shadow-sm -space-y-px">
            <div className=" my-8">
              <label
                htmlFor="email-address"
                className=" text-black text-xl font-semibold"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email} // Set value from state
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                className="rounded-lg relative block w-full px-3 py-2 bg-primary/10 text-black placeholder-gray-400 focus:ring-primary border-4 border-primary"
                placeholder="Email address"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className=" text-xl font-semibold text-black"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password} // Set value from state
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                className="rounded-lg relative block w-full px-3 py-2 bg-primary/10 text-black placeholder-gray-400 focus:ring-primary border-4 border-primary"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm flex gap-4">
              <div>Don&apos;t have an Account?</div>
              <Link href="/auth/register">
                <div className="font-medium text-primary hover:text-yellow-600">
                  Sign Up
                </div>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
             {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
