import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export default function StripeCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    const status = searchParams.get("status");

    const isSuccess = status === "success";

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl bg-white text-gray-900">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    {isSuccess ? (
                        <>
                            <CheckCircle2 className="text-green-500 w-16 h-16" />
                            <h2 className="text-2xl font-semibold">Payment Successful!</h2>
                            <p className="text-muted-foreground">Thank you for your payment. 🎉</p>
                        </>
                    ) : (
                        <>
                            <XCircle className="text-red-500 w-16 h-16" />
                            <h2 className="text-2xl font-semibold">Payment Failed</h2>
                            <p className="text-muted-foreground">Something went wrong during your payment.</p>
                        </>
                    )}

                    {/* <Alert className="bg-gray-100 border-0 text-gray-700">
                        <AlertTitle>Redirecting in {countdown}s...</AlertTitle>
                        <AlertDescription>
                            You’ll be automatically redirected to the homepage.
                        </AlertDescription>
                    </Alert> */}
                    <Card className="bg-gray-100 p-4 text-gray-700">
                        <h3 className="text-lg font-semibold">Redirecting in {countdown}s...</h3>
                        <p>You’ll be automatically redirected to the homepage.</p>
                    </Card>

                    <Button
                        variant="default"
                        onClick={() => navigate("/")}
                        className="mt-2"
                    >
                        Go to Homepage
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
