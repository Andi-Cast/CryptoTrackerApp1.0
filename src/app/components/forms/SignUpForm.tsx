"use client"
import { useRef, useState, useEffect, ChangeEvent, use, FormEvent } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import axios from "@/app/api/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;
const NAME_REGEX = /^[a-zA-Z]{2,}$/;

const REGISTER_URL = 'http://localhost:5500/register'

export default function SignUpForm() {
    const userRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: ""
    })

    const handleFormInput = (e: ChangeEvent<HTMLInputElement> ) => {
            const { name, value } = e.target;
            setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validFirstname, setValidFirstname] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState(false);

    const [validLastname, setValidLastname] = useState(false);
    const [lastnameFocus, setLastnameFocus] = useState(false);


    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(formData.username);
        console.log(result); 
        console.log(formData.username);
        setValidUsername(result);
    }, [formData.username])

    useEffect(() => {
        const result = PWD_REGEX.test(formData.password);
        console.log(result);
        console.log(formData.password);
        setValidPwd(result);
        const match = formData.password === matchPwd;
        setValidMatch(match);
    }, [formData.password, matchPwd])

    useEffect(() => {
        const result = NAME_REGEX.test(formData.firstname);
        console.log(result);
        console.log(formData.firstname);
        setValidFirstname(result);
    }, [formData.firstname])

    useEffect(() => {
        const result = NAME_REGEX.test(formData.lastname);
        console.log(result);
        console.log(formData.lastname);
        setValidLastname(result);
    }, [formData.lastname])

    useEffect(() => {
        setErrorMessage("");
    }, [formData.username, formData.password, formData.firstname, formData.lastname, matchPwd])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const v1 = NAME_REGEX.test(formData.firstname);
        const v2 = NAME_REGEX.test(formData.lastname);
        const v3 = EMAIL_REGEX.test(formData.username);
        const v4 = PWD_REGEX.test(formData.password);
        if(!v1 || !v2 || !v3 || !v4) {
            setErrorMessage("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(
                REGISTER_URL, 
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setFormData({firstname:"", lastname:"", username:"", password:""});
            setMatchPwd("");
            setSuccessMessage("Registration successful. Redirecting to signin...");
            setTimeout(() => {
                router.push('/auth/signin')
            }, 3000)
        } catch (error) {
            const axiosError = error as AxiosError;

            if (!axiosError?.response){
                setErrorMessage('No Server Response');
            } else if (axiosError.response?.status === 409) {
                setErrorMessage('Username Taken')
            } else {
                setErrorMessage('Registration Failed')
            }
            errorRef.current?.focus();
        }
    }

    return (
        <>
            {successMessage && (
                <p
                    className="text-white bg-green-600 border border-green-700 px-4 py-2 rounded text-center md:text-left"
                >
                    {successMessage}
                </p>
            )}
            {errorMessage && (
                <p 
                    ref={errorRef} 
                    role="alert"
                    aria-live="assertive"
                    className="text-white bg-red-600 border border-red-700 px-4 py-2 rounded text-center md:text-left"
                >
                    {errorMessage}
                </p>
            )}


            <form 
                className="flex flex-col justify-center items-center p-10 bg-gray-800 shadow-lg shadow-gray-600 rounded-md w-1/3 mt-8"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center items-center text-xl text-blue-600 font-bold mb-4">
                    Transparent Coin
                </div>
                <h2 className="text-white text-2xl font-semibold mb-6">
                    Sign up
                </h2>
                <label 
                    className="flex w-full justify-start pb-2 text-white font-semibold"
                    htmlFor="firstname"
                >
                    First Name
                    <span className={`ml-2 ${validFirstname? "" : "hidden"}`}>
                        <FontAwesomeIcon className="text-green-500" icon={faCheck}/>
                    </span>
                    <span className={`ml-2 ${validFirstname|| !formData.firstname? "hidden" : ""}`}>
                        <FontAwesomeIcon className="text-red-500" icon={faTimes}/>
                    </span>
                </label>
                <input 
                    type="text" 
                    name="firstname"
                    id="firstname"
                    placeholder="ex. Andi"
                    value={formData.firstname}
                    autoComplete="off"
                    onChange={handleFormInput}
                    required
                    className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full"
                    onFocus={() => setFirstnameFocus(true)}
                    onBlur={() => setFirstnameFocus(false)}
                />
                <p 
                    className={`text-sm flex justify-start w-full mb-4 ${firstnameFocus && formData.firstname && !validFirstname ? "" : "hidden"} flex items-center text-blue-600 bg-blue-100 border border-blue-500 p-2 rounded-lg mt-1`}
                    aria-live="polite"
                >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500"/>
                    Min. of 2 character. <br/>
                    Must contain valid alphabetical letters.
                </p>

                <label 
                    className="flex w-full justify-start pb-2 text-white font-semibold"
                    htmlFor="lastname"
                >
                    Last Name
                    <span className={`ml-2 ${validLastname ? "" : "hidden"}`}>
                        <FontAwesomeIcon className="text-green-500" icon={faCheck}/>
                    </span>
                    <span className={`ml-2 ${validLastname || !formData.lastname ? "hidden" : ""}`}>
                        <FontAwesomeIcon className="text-red-500" icon={faTimes}/>
                    </span>
                </label>
                <input 
                    type="text" 
                    name="lastname"
                    id="lastname"
                    placeholder="ex. Castillo"
                    value={formData.lastname}
                    autoComplete="off"
                    onChange={handleFormInput}
                    required
                    className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full"
                    onFocus={() => setLastnameFocus(true)}
                    onBlur={() => setLastnameFocus(false)}
                />
                <p 
                    className={`text-sm flex justify-start w-full mb-4 ${lastnameFocus && formData.lastname && !validLastname ? "" : "hidden"} flex items-center text-blue-600 bg-blue-100 border border-blue-500 p-2 rounded-lg mt-1`}
                    aria-live="polite"
                >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500"/>
                    Min. of 2 character. <br/>
                    Must contain valid alphabetical letters.
                </p>

                <label 
                    className="flex w-full justify-start pb-2 text-white font-semibold"
                    htmlFor="username"
                >
                    Email
                    <span className={`ml-2 ${validUsername ? "" : "hidden"}`}>
                        <FontAwesomeIcon className="text-green-500" icon={faCheck}/>
                    </span>
                    <span className={`ml-2 ${validUsername || !formData.username ? "hidden" : ""}`}>
                        <FontAwesomeIcon className="text-red-500" icon={faTimes}/>
                    </span>
                </label>
                <input 
                    type="email" 
                    name="username"
                    id="username"
                    placeholder="name@company.com"
                    value={formData.username}
                    autoComplete="off"
                    onChange={handleFormInput}
                    required
                    className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full"
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                />
                <p 
                    className={`text-sm flex justify-start w-full mb-4 ${usernameFocus && formData.username && !validUsername ? "" : "hidden"} flex items-center text-blue-600 bg-blue-100 border border-blue-500 p-2 rounded-lg mt-1`}
                    aria-live="polite"
                >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500"/>
                    Min. of 10 character. Must be a valid email.
                </p>

                <label 
                    className="flex w-full justify-start pb-2 text-white font-semibold"
                    htmlFor="password"
                >
                    Password
                    <span className={`ml-2 ${validPwd ? "" : "hidden"}`}>
                        <FontAwesomeIcon className="text-green-500" icon={faCheck}/>
                    </span>
                    <span className={`ml-2 ${validPwd || !formData.password ? "hidden" : ""}`}>
                        <FontAwesomeIcon className="text-red-500" icon={faTimes}/>
                    </span>
                </label>
                <input 
                    type="password" 
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    autoComplete="off"
                    onChange={handleFormInput}
                    required
                    className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p 
                    className={`text-sm flex justify-start w-full mb-4 ${pwdFocus && !validPwd ? "" : "hidden"} flex items-center text-blue-600 bg-blue-100 border border-blue-500 p-2 rounded-lg mt-1`}
                    aria-live="polite"
                >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500"/>
                    Min. of 8 characters. <br/>
                    Must contain uppercase, lowercase, a number, and at least one special character (!@#$%).
                </p>

                <label 
                    className="flex w-full justify-start pb-2 text-white font-semibold"
                    htmlFor="verifypwd"
                >
                    Verify Password
                    <span className={`ml-2 ${validMatch && matchPwd ? "" : "hidden"}`}>
                        <FontAwesomeIcon className="text-green-500" icon={faCheck}/>
                    </span>
                    <span className={`ml-2 ${validMatch || !matchPwd ? "hidden" : ""}`}>
                        <FontAwesomeIcon className="text-red-500" icon={faTimes}/>
                    </span>
                </label>
                <input 
                    type="password" 
                    name="verifypwd"
                    id="verifypwd"
                    placeholder="Verify Password"
                    value={matchPwd}
                    autoComplete="off"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    className="text-white mb-4 p-2 border-1 rounded-md bg-gray-600 w-full"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p 
                    className={`text-sm flex justify-start w-full ${matchFocus && matchPwd && !validMatch ? "" : "hidden"} flex items-center text-blue-600 bg-blue-100 border border-blue-500 p-2 rounded-lg mt-1`}
                    aria-live="polite"
                >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500"/>
                    Must match the first password input field.
                </p>

                <button 
                    className={`flex justify-center items-center mt-4 text-white bg-blue-500 rounded-xl p-3 font-bold hover:bg-blue-600 w-full mb-6 ${!validFirstname || !validLastname || !validUsername || !validPwd || !validMatch ? 'bg-disabled cursor-not-allowed bg-blue-300' : ''}`}
                    onClick={() => console.log(validFirstname, validLastname, validUsername, validPwd, validMatch)}
                >
                    SIGN UP
                </button>

                <div className="flex text-white text-sm items-center text-nowrap space-x-1">
                    <p>Already have an account?</p>
                    <Link href="/auth/signin" passHref>
                        <p className="text-blue-500 hover:text-blue-600 text-sm">
                            Sign in
                        </p>
                    </Link>
                </div>
            </form>
        </>    
    );
};