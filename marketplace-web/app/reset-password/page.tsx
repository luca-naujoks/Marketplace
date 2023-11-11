"use client";

import { useState } from "react";
import { Popup } from "../../components/popup.component";
import { env } from "../../env"

export default function Page() {
  const [password, setPassword] = useState("");
  const [verifypassword, setVerifyPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("popup");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTime, setPopupTime] = useState(3);
  
  const search = window.location.search;
  const access_token = new URLSearchParams(search).get("token");

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handlePopupInfo = (type: string, message: string, time: number) => {
    setPopupType(type);
    setPopupMessage(message);
    setPopupTime(time);
    setShowPopup(true);
  };

  const handleSubmit = async() => {
    let url = `${env.API_URL}accounts/reset-password`
    const newPassword = password
    if (password !== verifypassword) {
        handlePopupInfo("warning", "password & verify password does not match", 3)
        return;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: access_token,
            password: newPassword,
        })
    })

    const data = await response.json();
    if(data.statusCode === 401) {
      handlePopupInfo("warning", "Invalid or expired reset Token", 3)
    }
    handlePopupInfo("check", "Your password has been reset and you can now log in with your new password.", 3)

    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }


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
        <h2 className="flex text-2xl justify-center font-bold mb-4">Reset Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1" htmlFor="email">
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
          <div>
            <label className="block mb-1" htmlFor="password">
              Verify Password
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type="password"
              id="verifypassword"
              placeholder="Verify your password"
              value={verifypassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-md"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
