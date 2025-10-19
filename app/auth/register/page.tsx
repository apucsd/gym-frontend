"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For navigation after success
import { useAddUserMutation } from '@/redux/features/user/userApi';
import { message } from 'antd';


export default function SignupPage() {
    const [ createUser , { isLoading }] = useAddUserMutation();
    const router = useRouter(); 


    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        role:"TRAINEE",
        verified: true
    });

    const { name, email, password } = formData;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [ name ]: value,
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        // console.log(formData)

        try {
            const response = await createUser(formData).unwrap();
            console.log(response)
            if (response.success) {
                message.success(response.message || "User created successfully");
                router.push('/auth/login');
            }
        } catch (error:any) {
            message.error(error?.data?.message || 'Registration failed. Please try again.');
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="my-6">
                    <h2 className="text-center text-3xl font-extrabold text-black">Sign Up Your Account</h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />

                    <div>
                        <label htmlFor="name" className="text-xl font-semibold text-black">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={name} // Access formData.name
                            onChange={handleInputChange} // Single handler for all inputs
                            className="rounded-lg block w-full px-3 py-2 bg-white text-black placeholder-gray-400 focus:ring-primary border-4 border-primary"
                            placeholder="Full Name.."
                        />
                    </div>

                    <div className="my-8">
                        <label htmlFor="email" className="text-black text-xl font-semibold">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email} // Access formData.email
                            onChange={handleInputChange} // Single handler for all inputs
                            className="rounded-lg block w-full px-3 py-2 text-black placeholder-gray-400 focus:ring-primary border-4 border-primary"
                            placeholder="Email address"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-xl font-semibold text-black">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password} // Access formData.password
                            onChange={handleInputChange} // Single handler for all inputs
                            className="rounded-lg block w-full px-3 py-2 text-black placeholder-gray-400 focus:ring-primary border-4 border-primary"
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm flex gap-4">
                            <div>Already have an Account?</div>
                            <Link href="/auth/login">
                                <div className="font-medium text-primary hover:text-yellow-600">Login</div>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                        >
                           {isLoading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
