"use client";

import { useState } from "react";
import { Popup } from "../../../../components/popup.component";

export default function Page() {
  const [email, setEmail] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("popup");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTime, setPopupTime] = useState("popup");

  const handlePopupInfo = (type: any, message: any, time: any) => {
    setPopupType(type);
    setPopupMessage(message);
    setPopupTime(time);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let url = "http://localhost:3000/accounts/forgot-password";

    setEmail("");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    if (data.statusCode === 200) {
      handlePopupInfo(
        "check",
        "We send an email to your address to reset your password",
        3
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-50">
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
        <h2 className="flex text-2xl justify-center font-bold mb-4">
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type="email"
              id="email"
              placeholder="Enter your email to reset your password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
