import React, {useState} from "react";
import axios from "axios";
import Webcam from "react-webcam";
import getCsrfToken from "./csrf";

const FaceRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordC, setPasswordC] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const webcamRef = React.useRef(null);

    const capture = () => {
        let imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            // Ubah base64 menjadi Blob
            let byteString = atob(imageSrc.split(",")[1]);
            let mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
        
            let ab = new ArrayBuffer(byteString.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
            }
        
            let blob = new Blob([ab], { type: mimeString });

            setImage(blob); // Simpan Blob sebagai gambar
        } else {
            console.error("Unable to capture image");
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    } 

    const handleSubmit = async () => {
        if (!name) {
            setMessage("Please provide your name.");
            return;
        }

        if (!email) {
            setMessage("Please provide your name.");
            return;
        }

        if (!password) {
            setMessage("Please provide your name.");
            return;
        }
        
        if (!passwordC) {
            setMessage("Please provide your name.");
            return;
        }

        if (!image) {
            setMessage("Please provide an image");
            return;
        }

        const csrfToken = await getCsrfToken();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", passwordC);
        formData.append("image", image);

        try {
            const response = await axios.post('http://localhost:8000/api/register-face', formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                withCredentials: true,
            });

            console.log(response);

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "an error occured");
        }
    }

    return (
        <div className="flex flex-col items-center p-4">
        <h2 className="text-xl font-bold mb-4">Register Face</h2>
            <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Input Name"
                        className="p-2 border border-gray-300 rounder w-full"
                    />
            </div>
            <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Input Email"
                        className="p-2 border border-gray-300 rounder w-full"
                    />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Input Password"
                    className="p-2 border border-gray-300 rounder w-full"
                    autoComplete="off"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Password Confrimation
                </label>
                <input
                    type="password"
                    value={passwordC}
                    onChange={(e) => setPasswordC(e.target.value)}
                    placeholder="Re-insert Password"
                    autoComplete="off"
                    className="p-2 border border-gray-300 rounder w-full"
                />
            </div>
            <div className="mb-4">
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="border rounded"
                />
                <button onClick={capture} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Capture
                </button>
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
            />
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Submit
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default FaceRegister;