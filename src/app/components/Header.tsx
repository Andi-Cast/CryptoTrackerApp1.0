import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function Header() {
    const { auth, logout } = useAuth();

    return (
        <header className="flex w-full px-4 py-4 mt-0 justify-between bg-black">
            <div className="flex justify-center items-center text-blue-600 font-bold">Transparent Coin</div>
            <div className="flex justify-between space-x-4">
                {auth.accessToken ? (
                    <button 
                        className="flex justify-center items-center px-4 py-2 bg-black font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-gray-800"
                        onClick={logout}
                    >
                        Log out
                    </button>
                ) : (
                    <>
                        <Link href="/auth/signin" passHref>
                            <button className="flex justify-center items-center px-4 py-2 bg-black font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-gray-800">
                                Sign in
                            </button>
                        </Link>
                        <Link href="/auth/signup" passHref>
                            <button className="flex justify-center items-center px-4 py-2 bg-blue-600 font-semibold text-gray-800 rounded-xl hover:bg-blue-400">
                                Try for free
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};
