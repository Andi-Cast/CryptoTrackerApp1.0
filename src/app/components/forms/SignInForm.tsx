"use client"
import Link from "next/link";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/router"; 
import axios from "@/app/api/axios";
import { AxiosError } from "axios";
const LOGIN_URL = 'http://localhost:5500/auth'

export default function SignInForm() {
    const { auth, setAuth } = useAuth();
    const router = useRouter();
    const userRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleFormInput = (e: ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        console.log(`${auth}`)
        if (auth.accessToken && auth.roles) {
            console.log(`2${auth}`)
            router.push('/dashboard')
        }
    }, [auth, router]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: formData.username, password: formData.password }),
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setAuth(response.data);
        } catch (error) {
            const axiosError = error as AxiosError; // Type assertion
            if (!axiosError.response) {
                setErrorMessage('No Server Response');
            } else if (axiosError.response.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if (axiosError.response.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
            errorRef.current?.focus(); // Safe navigation
        }
    };


    return (
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center p-10 bg-gray-800 shadow-lg shadow-gray-600 rounded-md w-1/3 my-8">
            <div className="flex justify-center items-center text-xl text-blue-600 font-bold mb-4">
                Transparent Coin
            </div>
            <h2 className="text-white text-2xl font-semibold mb-6">
                Welcome back
            </h2>
            
            <label
                className="flex w-full justify-start pb-2 text-white font-semibold" 
                htmlFor="username">
                Email: 
            </label>
            <input 
                type="text"
                className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full"
                id="username"
                name="username"
                ref={userRef}
                autoComplete="off"
                onChange={handleFormInput}
                value={formData.username}
                required
            />

            <label
                className="flex w-full justify-start pb-2 text-white font-semibold"  
                htmlFor="password">
                Password: 
            </label>
            <input 
                type="password"
                className="text-white mb-6 p-2 border-1 rounded-md bg-gray-600 w-full"
                id="password"
                name="password"
                onChange={handleFormInput}
                value={formData.password}
                required
            />

            <button className="flex justify-center items-center text-white bg-blue-500 rounded-xl p-4 font-bold hover:bg-blue-600 w-full  mt-4 mb-6">
                Sign in
            </button>
            <div className="flex text-white text-sm items-center text-nowrap space-x-1">
                <p>Don't have an account?</p>
                <Link href="/auth/signup" passHref>
                    <p className="text-blue-500 hover:text-blue-600 text-sm">
                        Create an account
                    </p>
                </Link>
            </div>
        </form>
    );
}