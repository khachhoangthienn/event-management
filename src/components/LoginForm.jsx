import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { axiosInstance, axiosPublic } from "@/axiosConfig";
import { useContext, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { use } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [registerState, setRegisterState] = useState('Attendee')
    const { setInfo, info, getUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (isRegister) {
            handleRegister(e);
        } else {
            handleLogin(e);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                const { token } = response.data.result;
                localStorage.setItem("authToken", token);
                const result = await getUserInfo();
                if (result.firstName == null || result.lastName == null) navigate("/profile");
                else navigate("/");
                toast.success("Login successful!", {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.log("this is error code: " + error.response.data.code);
            if (error.response) {
                const { code } = error.response.data;
                if (code === 404) setMessage("No user found with this email");
                else if (code === 401) setMessage("Invalid password");
                else if (code === 3010) setMessage("Your account is locked. Please contact the admin")
            } else {
                // console.error("Error:", error.message);
                toast.error("Login failed " + message);
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log("password", password);
            console.log("confirmPassword", confirmPassword);
            const response = await axiosPublic.post("/users", {
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                role: registerState.toUpperCase()
            });
            if (response.status === 200) {
                const { token } = response.data.result;
                setIsRegister(false)
                setMessage('')
                toast.success("Registration successful!", {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.log("this is error code: " + error.response.data.code);
            if (error.response) {
                const { code } = error.response.data;
                console.log("data", error.response.data)
                if (code === 409) setMessage("Email already exists! Please try another email");
                else if (code === 400) setMessage("Password does not match! Please try again");
            } else {
                // console.error("Error:", error.message);
                toast.error("Registration failed " + message);
            }
        }
    };

    useEffect(() => {
        if (info) {
            navigate("/");
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-0 border border-gray-300 min-w-96 py-4 px-5 rounded-xl bg-white relative shadow-xl">

            <div className="flex flex-row gap-4 mx-4 text-4xl border-b border-gray-200 py-4 justify-center items-end font-semibold">
                <h1 className=" text-cyan-900 transition-all duration-300">{isRegister ? `Sign Up ${registerState}` : 'Sign In'}</h1>
            </div>

            {isRegister && <div className="flex flex-row text-2xl text-white justify-center px-4 my-4">
                <div onClick={() => setRegisterState('Attendee')}
                    className={`${registerState === 'Attendee' ? 'bg-gradient-to-r from-cyan-950 to-cyan-800 text-white' : 'bg-white text-cyan-900'}
                     font-medium border border-cyan-900 px-4 w-1/2 text-center py-2 duration-300 transition-all cursor-pointer`}>Attendee</div>

                <div onClick={() => setRegisterState('Organizer')}
                    className={`${registerState === 'Organizer' ? 'bg-gradient-to-r from-cyan-950 to-cyan-800 text-white' : 'bg-white text-cyan-900'}
                     font-medium border border-cyan-900 px-4 w-1/2 text-center py-2 duration-300 transition-all cursor-pointer`}>Orgnizer</div>
            </div>}

            <div className="grid gap-6 mx-2 pt-3">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" autoComplete="email" placeholder="m@example.com" required className='h-10' onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" autoComplete="new-password" placeholder="your password"
                        required onChange={(e) => setPassword(e.target.value)} />
                </div>

                {isRegister && <div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Type password again</Label>
                        </div>
                        <Input id="password" type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                </div>}

                {isRegister ? <div>
                    <p className="text-red-700 pb-2">{message}</p>
                    <Button type="submit" className="w-full bg-cyan-900 text-white">
                        Sign Up
                    </Button>
                </div> :
                    <div>
                        <p className="text-red-700 pb-2">{message}</p>
                        <Button type="submit" className="w-full bg-cyan-900 text-white">
                            Sign in
                        </Button>
                    </div>
                }

                {

                    !isRegister ? <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a onClick={() => {
                            setIsRegister(true);
                            setMessage("");
                        }} className="underline underline-offset-4 cursor-pointer">
                            Sign up
                        </a>
                    </div> : <div className="text-center text-sm">
                        Have an account?{" "}
                        <a onClick={() => {
                            setIsRegister(false);
                            setMessage("");
                        }} className="underline underline-offset-4 cursor-pointer">
                            Sign in
                        </a>
                    </div>
                }

            </div>

        </form >
    )
}

export default LoginForm