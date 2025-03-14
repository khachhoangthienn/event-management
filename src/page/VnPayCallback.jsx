import { EventContext } from "@/context/EventContext";
import { useContext, useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const VnPayCallback = () => {
    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();
    const { fetchRecommendEvents } = useContext(EventContext)

    useEffect(() => {
        fetchRecommendEvents()
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
            navigate(-3);
        }, 3000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
            <AiOutlineCheckCircle className="size-40 text-green-500 mb-4" />
            <h1 className="text-5xl font-semibold">Payment successfull!</h1>
            <p className="text-xl mt-2">Redirect after {countdown}...</p>
        </div>
    );
}

export default VnPayCallback
