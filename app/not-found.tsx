import errorIcon from '@/public/assets/images/error.png'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <section className="bg-white">
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                    <Image src={errorIcon} alt="404" className=" size-32" />
                    <h1 className="mt-3 text-2xl font-semibold text-black md:text-3xl">
                        Page not found
                    </h1>
                    <p className="mt-4 text-gray-500">
                        The page you are looking for doesn&apos;t exist.
                    </p>

                    <div className="flex items-center mt-4">
                        <Link
                            href={'/'}
                            className=" bg-primary text-black flex justify-center items-center px-4 py-2 rounded-md font-bold"
                        >
                            Take me home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}