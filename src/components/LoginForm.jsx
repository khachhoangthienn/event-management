import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosInstance from "@/axiosConfig";
import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [registerState, setRegisterState] = useState('Attendee')
    const { setInfo } = useContext(UserContext);
    const navigate = useNavigate();



    const getUserInfo = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get("/users/me");
            if (response.status === 200) {
                const result = await response.data.result;
                localStorage.setItem("userInfo", JSON.stringify(result));
                setInfo(result);
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                const { code, message } = error.response.data;
                toast.error("Login failed: " + message);
            } else {
                console.error("Error:", error.message);
                toast.error("Login failed: " + message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                const { token } = response.data.result;
                localStorage.setItem("authToken", token);
                getUserInfo(e);
                toast.success("Login successful!", {
                    autoClose: 3000,  // Thời gian tồn tại (5 giây)
                });
            }
        } catch (error) {
            if (error.response) {
                const { code, message } = error.response.data;
                if (code === 404) setMessage("No user found with this email.");
                else if (code === 401) setMessage("Invalid password.");
            } else {
                console.error("Error:", error.message);
                alert("Login failed: " + error.message);
            }
        }
    };



    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-0 border border-gray-300 min-w-96 py-4 px-5 rounded-xl bg-white relative shadow-xl">

            <div className="flex flex-row gap-4 mx-4 text-4xl border-b border-gray-200 py-4 justify-center items-end font-semibold">
                <h1 className=" text-cyan-900 transition-all duration-300">{isRegister ? `Sign Up ${registerState}` : 'Login Form'}</h1>
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
                    <Input id="email" type="email" placeholder="m@example.com" required className='h-10' onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {!isRegister && <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">Forgot your password? </a>}
                    </div>
                    <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>

                {isRegister && <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Type password again</Label>
                    </div>
                    <Input id="password" type="password" required />
                </div>}

                {isRegister ? <Button type="submit" className="w-full bg-cyan-900 text-white">
                    Sign Up
                </Button> :
                    <div>
                        <p className="text-red-700 py-2">{message}</p>
                        <Button type="submit" className="w-full bg-cyan-900 text-white">
                            Login
                        </Button>
                    </div>
                }

                {!isRegister && <div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                    <Button variant="outline" className="w-full text-cyan-900 mt-4">
                        <FaGoogle />
                        Login with Google
                    </Button>
                </div>}

                {

                    !isRegister ? <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a onClick={() => setIsRegister(true)} className="underline underline-offset-4 cursor-pointer">
                            Sign up
                        </a>
                    </div> : <div className="text-center text-sm">
                        Have an account?{" "}
                        <a onClick={() => setIsRegister(false)} className="underline underline-offset-4 cursor-pointer">
                            Login
                        </a>
                    </div>
                }

            </div>

        </form >
    )
}

export default LoginForm