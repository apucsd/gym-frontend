"use client";

import { useState } from "react";
import Link from "next/link";
import { useLoginUserMutation } from "@/redux/features/api/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/slices/authSlice";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [loginUser] = useLoginUserMutation();
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

      if (res.success) {
        toast.success(res.message);

        // Save token and user info to localStorage
        const token = res.data.accessToken;
        const decodedUserInformation = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(decodedUserInformation)); // Save user info as string
        localStorage.setItem("token", res.data.accessToken);

        // Dispatch user info to Redux store
        dispatch(setUser({ user: decodedUserInformation }));

        router.push("/");
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
