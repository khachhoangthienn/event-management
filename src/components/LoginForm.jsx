import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [registerState, setRegisterState] = useState('Attendee')

    return (
        <form className="flex flex-col gap-0 border border-gray-300 min-w-96 py-4 px-5 rounded-xl bg-white relative shadow-xl ">

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

            <div className="grid gap-6 mx-4 pt-3">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required className='h-10' />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {!isRegister && <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">Forgot your password? </a>}
                    </div>
                    <Input id="password" type="password" required />
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
                    <Button type="submit" className="w-full bg-cyan-900 text-white">
                        Login
                    </Button>
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