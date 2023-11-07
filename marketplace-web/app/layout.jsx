"use client";
import React from "react";
import "./globals.css";
import { LoginButton } from "../components/buttons.component";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Marketplace</title>
        <meta name="keywords" content="Marketplace, bobby68.de" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/assets/Marketplace_Logo_Clear.png " />
      </head>
      <body className="h-screen">
        <div className="fixed left-0 top-0 w-full shadow-md bg-white">
          <div className="flex justify-evenly items-center pb-1 pt-5">
            <a href="/?category=product">
              <div className="transition flex items-center text-gray-500 font-bold text-lg duration-200">
                <img
                  src="/assets/Marketplace_Logo_Clear.png"
                  alt=""
                  className="xs:h-8 md:h-10 items-center"
                />
                <span className="">Marketplace</span>
              </div>
            </a>
            <a href="/?category=product">Shop</a>
            <a href="/sales">Special Sales</a>
            <a href="/?category=selfmade">Self Made</a>
            <a href="/?category=services">Services</a>
            <LoginButton />
          </div>
        </div>
        <div className=" h-full">{children}</div>
      </body>
    </html>
  );
}
