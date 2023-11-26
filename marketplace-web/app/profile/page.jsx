"use client";
import { useSession } from "../../components/auth.component";
import { LogOutButton } from "../../components/buttons.component";
import {
  CompanyData,
  OwnedProducts,
  CompanyOrders,
  ProductOrders,
  Payments,
  CustomerSupport,
} from "../../components/business.component";
import {
  PersonalData,
  MarketplacePrime,
  PrivatePayments,
  Orders,
  Subscriptions
} from "../../components/private.component"
import { useState } from "react";

export default function Page() {
  const session = useSession();
  const [selectedSection, setSelectedSection] = useState("Personal Data");

  const handleLinkClick = (section) => {
    setSelectedSection(section);
  };

  if (session && session.type === "private") {
    return (
      <div className="flex justify-center w-full h-full pt-24">
        <div className="flex flex-none w-2/3 h-full m-5">
          <div className="w-1/4">
            <h1 className="flex m-2 font-bold text-3xl">
              Hey {session.first_name} {session.last_name}
            </h1>
            <ul className="p-5">
              <li className="m-2">
                <a
                  onClick={() => handleLinkClick("Personal Data")}
                  className={`text-lg font-bold cursor-pointer ${
                    selectedSection === "Personal Data"
                      ? "text-black"
                      : "text-gray-600"
                  }`}
                >
                  Personal Data
                </a>
              </li>
              <li className="m-2">
                <a
                  onClick={() => handleLinkClick("Prime Card")}
                  className={`text-lg font-bold cursor-pointer ${
                    selectedSection === "Prime Card"
                      ? "text-black"
                      : "text-gray-600"
                  }`}
                >
                  Marketplace Prime
                </a>
              </li>
              <li className="m-2">
                <a
                  onClick={() => handleLinkClick("Payments")}
                  className={`text-lg font-bold cursor-pointer ${
                    selectedSection === "Payments"
                      ? "text-black"
                      : "text-gray-600"
                  }`}
                >
                  Payments
                </a>
              </li>
              <li className="m-2">
                <a
                  onClick={() => handleLinkClick("Orders")}
                  className={`text-lg font-bold cursor-pointer ${
                    selectedSection === "Orders"
                      ? "text-black"
                      : "text-gray-600"
                  }`}
                >
                  Orders
                </a>
              </li>
              <li className="m-2">
                <a
                  onClick={() => handleLinkClick("Subscriptions")}
                  className={`text-lg font-bold cursor-pointer ${
                    selectedSection === "Subscriptions"
                      ? "text-black"
                      : "text-gray-600"
                  }`}
                >
                  Subscriptions
                </a>
              </li>
              <li className="m-2">
                <LogOutButton />
              </li>
            </ul>
          </div>
          <div className="flex justify-center w-full">
            {selectedSection === "Personal Data" && <div className="flex flex-col w-full h-full items-center">
                  <PersonalData />
                </div>}
                {selectedSection === "Payments" && <div className="flex flex-col w-full h-full items-center">
                  <PrivatePayments />
                </div>}
            {selectedSection === "Prime Card" && <div className="flex flex-col w-full h-full items-center">
                  <MarketplacePrime />
                </div>}
            {selectedSection === "Orders" && <div className="flex flex-col w-full h-full items-center">
                  <Orders />
                </div>}
            {selectedSection === "Subscriptions" && <div className="flex flex-col w-full h-full items-center">
                  <Subscriptions />
                </div>}
          </div>
        </div>
      </div>
    );
  } else {
    if (session && session.type === "business") {
      return (
        <div className="flex justify-center w-full h-full pt-24">
          <div className="flex flex-none w-2/3 h-full m-5">
            <div className="w-1/4">
              <h1 className="flex m-2 font-bold text-3xl">
                Hey {session.first_name} {session.last_name}
              </h1>
              <ul>
                <li className="m-2">
                  <a
                    onClick={() => handleLinkClick("Personal Data")}
                    className={`text-lg font-bold cursor-pointer ${
                      selectedSection === "Personal Data"
                        ? "text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Personal Data
                  </a>
                </li>
                <li className="m-2">
                  <a
                    onClick={() => handleLinkClick("Owned Products")}
                    className={`text-lg font-bold cursor-pointer ${
                      selectedSection === "Owned Products"
                        ? "text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Owned Products
                  </a>
                </li>
                <li className="m-2">
                  <a
                    onClick={() => handleLinkClick("Company Orders")}
                    className={`text-lg font-bold cursor-pointer ${
                      selectedSection === "Company Orders"
                        ? "text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Own Orders
                  </a>
                </li>
                <li className="m-2">
                  <a
                    onClick={() => handleLinkClick("Product Orders")}
                    className={`text-lg font-bold cursor-pointer ${
                      selectedSection === "Product Orders"
                        ? "text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Product Orders
                  </a>
                </li>
                <li className="m-2">
                  <a
                    onClick={() => handleLinkClick("Payments")}
                    className={`text-lg font-bold cursor-pointer ${
                      selectedSection === "Payments"
                        ? "text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Payments
                  </a>
                </li>
                <li className="m-2">
                  <a
                    onClick={() => handleLinkClick("Customer Support")}
                    className={`text-lg font-bold cursor-pointer ${
                      selectedSection === "Customer Support"
                        ? "text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Customer Support
                  </a>
                </li>
                <li className="m-2">
                  <LogOutButton />
                </li>
              </ul>
            </div>
            <div className="flex justify-center w-full">
              {selectedSection === "Personal Data" && (
                <div className="flex flex-col w-full h-full items-center">
                  <CompanyData />
                </div>
              )}
              {selectedSection === "Owned Products" && (
                <div className="flex flex-col w-full h-full items-center">
                  <OwnedProducts />
                </div>
              )}
              {selectedSection === "Company Orders" && (
                <div className="flex flex-col w-full h-full items-center">
                  <CompanyOrders />
                </div>
              )}
              {selectedSection === "Product Orders" && (
                <div className="flex flex-col w-full h-full items-center">
                  <ProductOrders />
                </div>
              )}
              {selectedSection === "Payments" && (
                <div className="flex flex-col w-full h-full items-center">
                  <Payments />
                </div>
              )}
              {selectedSection === "Customer Support" && (
                <div className="flex flex-col w-full h-full items-center">
                  <CustomerSupport />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}
