import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const confirmToast = (message, onConfirm) => {
    toast(
        ({ closeToast }) => (
            <div className="p-4 bg-white shadow-sm rounded-lg text-gray-800">
                <p className="text-lg font-semibold">{message}</p>
                <div className="flex justify-end gap-3 mt-4">
                    {/* Nút Cancel */}
                    <button
                        onClick={closeToast}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                    >
                        Cancel
                    </button>

                    {/* Nút OK */}
                    <button
                        onClick={() => {
                            onConfirm();
                            closeToast();
                        }}
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        ),
        {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
        }
    );
};

export default confirmToast;
