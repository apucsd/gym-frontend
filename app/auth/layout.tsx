import Link from 'next/link'
import React from 'react'
interface Children {
    children: React.ReactNode
}
export default function AuthLayout({ children }: Readonly<Children>) {
    return (
        <div className='mt-2'>
            <Link className=' text-primary text-left text-3xl font-bold ml-8' href={"/"}>
                Gym360BD
            </Link>
            {children}
        </div>
    )
}
