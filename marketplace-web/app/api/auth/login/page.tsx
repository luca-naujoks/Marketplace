"use client";
import { useState } from "react";
import { useAuthentication, useCreate } from "../../../../components/auth.component";
import { Popup } from "../../../../components/popup.component"
import { env } from "../../../../env"

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("popup");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTime, setPopupTime] = useState(3);
  const isAuthenticated = useAuthentication();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handlePopupInfo = (type: string, message: string, time: number) => {
    setPopupType(type);
    setPopupMessage(message);
    setPopupTime(time);
    setShowPopup(true);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let url = `${env.API_URL}auth/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.message === "Unauthorized") {
      console.log("Unauthorized");
      handlePopupInfo("warning", "Email Adress or Password incorrect", 1);
    } else {
      useCreate(data.access_token, isAuthenticated);
      window.location.href = "/";
      handlePopupInfo("check", "Successfully Loged In", 2);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
      <Popup
        show={showPopup}
        message={popupMessage}
        onClose={handleClosePopup}
        time={popupTime}
        type={popupType}
      />
      <div className="flex justify-center w-1/5 bg-half-gradient">
        <img
          src="/assets/Marketplace_Logo_Clear.png"
          alt="asdadas"
          className="justify-center xs:h-8 md:h-32  rounded-full p-5"
        />
      </div>
      <div className="bg-white p-8 w-1/5">
        <h2 className="flex text-2xl justify-center font-bold mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-md"
            type="submit"
          >
            Sign In
          </button>
          <div className="text-center">
            <a className="text-blue-500" href="/api/auth/forgot-password">
              Forgot your Password?
            </a>
            <p>
              <span>Don't have an Account? </span>
              <a className="text-blue-500" href="/api/auth/signup">
                {" "}
                Sign Up here.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
