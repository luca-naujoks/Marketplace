"use client";

import { useState } from "react";
import { Popup } from "../../../../../components/popup.component";
import {
  useAuthentication,
  useCreate,
} from "../../../../../components/auth.component";

export default function Page() {
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");
  const [verifypassword, setVerifyPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("popup");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTime, setPopupTime] = useState(3);

  const isAuthenticated = useAuthentication();

  const handleZipChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 5) {
      setZip(inputValue);
    }
  };

  const handlePopupInfo = (type: string, message: string, time: number) => {
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
    let url = "http://localhost:3000/accounts";

    if (password !== verifypassword) {
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "business",
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        adress: adress,
        zip: parseInt(zip),
        company_name: companyName,
        company_type: companyType,
        verified: false,
      }),
    });

    const data = await response.json();
    if (data.message === "An account with this email already exists.") {
      console.log("An account with this email already exists.");
      handlePopupInfo(
        "warning",
        "An account with this email already exists.",
        3
      );
    } else {
      handlePopupInfo("check", "New Business Account Successfully Created", 2);
      useCreate(data.access_token, isAuthenticated);
      setTimeout((window.location.href = "/"), 3000);
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
      <div className="flex justify-center w-2/5 bg-half-gradient">
        <img
          src="/assets/Marketplace_Logo_Clear.png"
          alt="asdadas"
          className="justify-center xs:h-8 md:h-32  rounded-full p-5"
        />
      </div>
      <div className="bg-white pb-4 px-20 w-2/5 ">
        <h2 className="flex text-2xl justify-center font-bold mb-4">
          Sign Up a Business Account
        </h2>
        <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div className="w-2/5">
              <label className="block mb-1" htmlFor="FirstName">
                First Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                type="text"
                id="first_name"
                placeholder="Enter your First Name"
                value={first_name}
                onChange={(e) => setFirst_Name(e.target.value)}
                required
              />
              <label className="block mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                type="text"
                id="last_name"
                placeholder="Enter your Last Name"
                value={last_name}
                onChange={(e) => setLast_Name(e.target.value)}
                required
              />
              <label className="block mb-1" htmlFor="company_name">
                Company Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-8"
                type="text"
                id="company_name"
                placeholder="Enter your Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <label className="block mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="block mb-1" htmlFor="verifypassword">
                Verify Password
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                type="password"
                id="verify_password"
                placeholder="Enter to verify your password"
                value={verifypassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                required
              />
              <input
                type="checkbox"
                name="AGB_Checkbox"
                id="AGB_Checkbox"
                required
              />{" "}
              <label>Accept our AGBs</label>
            </div>

            <div className="w-2/5">
              <label className="block mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="flex justify-between">
                <div>
                  <label className="block mb-1" htmlFor="ZIP">
                    ZIP Code
                  </label>
                  <input
                    className="w-4/5 border border-gray-300 rounded-md p-2 mb-4"
                    type="number"
                    id="ZIP"
                    placeholder="ZIP Code"
                    value={zip}
                    onChange={handleZipChange}
                  />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="adress">
                    Adress
                  </label>
                  <input
                    className="w-auto border border-gray-300 rounded-md p-2 mb-4"
                    type="text"
                    id="adress"
                    placeholder="Enter your adress"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                  />
                </div>
              </div>

              <label className="block mb-1" htmlFor="adress">
                Company Type
              </label>

              <select
                id="company_type"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                required
              >
                <option value="">Select a Company Type</option>
                <option value="GmbH">GmbH</option>
                <option value="AG">AG</option>
                <option value="UG">UG</option>
                <option value="KG">KG</option>
                <option value="OHG">OHG</option>
                <option value="Co. KG">Co. KG</option>
              </select>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-md"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center ">
          <p>
            <span>Already have an Account? </span>
            <a className="text-blue-500" href="/api/auth/login">
              Login here.
            </a>
          </p>
          <a href="/api/auth/signup" className="text-blue-500">
            Sign up as a Private User
          </a>
        </div>
      </div>
    </div>
  );
}
