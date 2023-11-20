import Cookies from "js-cookie";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuthentication, useCreate } from "../components/auth.component";
import { env } from "../env";

interface AccountJwtPayload extends JwtPayload {
  account_id: number;
  company_name: string;
  company_type: string;
  first_name: string;
  last_name: string;
  adress: string;
  zip: number;
  email: string;
  type: string;
}

const accountdata = getaccountdata();

function getaccountdata() {
  const jwt = Cookies.get("auth");

  if (!jwt) {
    return null;
  }

  const payload = jwtDecode<AccountJwtPayload>(jwt);

  return payload;
}

export function CompanyData() {
  const [company_name, setCompanyName] = useState(accountdata.company_name);
  const [company_type, setCompanyType] = useState(accountdata.company_type);
  const [first_name, setFirstName] = useState(accountdata.first_name);
  const [last_name, setLastName] = useState(accountdata.last_name);
  const [email, setEmail] = useState(accountdata.email);
  const [zip, setZip] = useState(accountdata.zip);
  const [adress, setAdress] = useState(accountdata.adress);

  const [isreadOnly, setIsReadOnly] = useState(true);

  const refreshPage = () => {
    window.location.reload();
  };

  const toggleReadOnly = async () => {
    let url = `${env.API_URL}accounts`;

    const request_data = {
      where: { id: accountdata.account_id },
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        adress: adress,
        zip: zip,
      },
    };
    setIsReadOnly(!isreadOnly);
    if (!isreadOnly) {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${Cookies.get("auth")}`,
        },
        body: JSON.stringify(request_data),
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        useCreate(data.access_token);
        refreshPage();
      }
    }
  };

  return (
    <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
      <div className="mb-5">
        <h1 className="text-xl font-bold">Company Data</h1>
        <div className="w-1/3">
          <div className="flex flex-col mb-4">
            <p className="block mb-1">Company ID</p>
            <p className="border border-gray-300 rounded-md p-2">
              {accountdata.account_id}
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-2/5 mr-4">
            <p className="block mb-1">Company Name</p>
            <input
              className="w-full border border-gray-300 rounded-md p-2 mb-4 outline-none bg-transparent"
              type="text"
              id="company_Name"
              placeholder="Enter to change Company Name"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
              readOnly={isreadOnly}
            />
          </div>
          <div className="flex flex-col">
            <p className="block mb-1">Company Type</p>
            <p className="border border-gray-300 rounded-md p-2">
              {accountdata.company_type}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Contact Data</h1>
          <button onClick={toggleReadOnly}>
            {isreadOnly ? (
              <img src="/assets/edit_pen.svg" alt="edit" className="w-6 h-6" />
            ) : (
              <img
                src="/assets/check_mark.svg"
                alt="save"
                className="w-6 h-6"
              />
            )}
          </button>
        </div>
        <div className="flex">
          <div className="flex flex-col w-2/5 mr-4">
            <p className="block mb-1">First Name</p>
            <input
              className="w-full border border-gray-300 rounded-md p-2 mb-4 outline-none bg-transparent"
              type="text"
              id="first_Name"
              placeholder="Enter to change First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              readOnly={isreadOnly}
            />
          </div>
          <div className="flex flex-col w-2/5 mr-4">
            <p className="block mb-1">Last Name</p>
            <input
              className="w-full border border-gray-300 rounded-md p-2 mb-4 outline-none bg-transparent"
              type="text"
              id="last_Name"
              placeholder="Enter to change Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              readOnly={isreadOnly}
            />
          </div>
        </div>
        <div className="w-2/5">
          <p className="block mb-1">Email Adress</p>
          <input
            className="w-full border border-gray-300 rounded-md p-2 mb-4 outline-none bg-transparent"
            type="text"
            id="email"
            placeholder="Enter to change your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={isreadOnly}
          />
        </div>
        <div className="flex">
          <div className="flex flex-col w-2/5 mr-4">
            <p className="block mb-1">zip Code</p>
            <input
              className="w-full border border-gray-300 rounded-md p-2 mb-4 outline-none bg-transparent"
              type="text"
              id="zip_Code"
              placeholder="Enter to change your zip Code"
              value={zip}
              onChange={(e) => setZip(parseInt(e.target.value))}
              readOnly={isreadOnly}
            />
          </div>
          <div className="flex flex-col w-2/5 mr-4">
            <p className="block mb-1">Adress</p>
            <input
              className="w-full border border-gray-300 rounded-md p-2 mb-4 outline-none bg-transparent"
              type="text"
              id="adress"
              placeholder="Enter to change your Adress"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              readOnly={isreadOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OwnedProducts() {
  const [items, setItems] = useState([]);
  const [start, setStart] = useState(0);

  async function getproducts() {
    let url = `${env.API_URL}products?brandid=${accountdata.account_id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }

  useEffect(() => {
    getproducts();
  });

  const handlePrev = () => {
    setStart((oldStart) => (oldStart === 0 ? items.length - 3 : oldStart - 1));
  };

  const handleNext = () => {
    setStart((oldStart) => (oldStart === items.length - 3 ? 0 : oldStart + 1));
  };

  const displayItems = items.slice(start, start + 3);

  const listedItems = items.filter((item) => item.status === "listed");

  const nonlistedItems = items.filter((item) => item.status === "non-listed");

  return (
    <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
      <div className="mb-5">
        <h1 className="text-xl font-bold mb-5">Company Owned Products</h1>
        <div className="flex">
          <div className="w-1/3 ml-2 mb-5">
            <p className="block mb-1">
              <span className="text-green-500">Listed</span>
              <span> products</span>
            </p>
            <input
              className="w-full border border-gray-300 rounded-md p-2 mb-4 outline-none bg-transparent"
              type="text"
              id="company_Name"
              value={listedItems.length}
              readOnly
            />
          </div>
          <div className="w-1/3 ml-2 mb-5">
            <p className="block mb-1">
              <span className="text-red-500">Non-listed</span>
              <span> products</span>
            </p>
            <input
              className="w-full border border-gray-300 rounded-md p-2 mb-4 outline-none bg-transparent"
              type="text"
              id="company_Name"
              value={nonlistedItems.length}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handlePrev}
            className={`text-3xl rounded-md p-5 duration-300 ${
              items.length <= 3 ? "" : "hover:bg-black hover:text-white"
            }`}
            disabled={items.length <= 3}
          >
            ❮
          </button>
          <div className="grid grid-cols-3 gap-5 mx-2 flex-grow transition-all duration-500 ease-in-out">
            {displayItems.map((item, index) => (
              <div
                key={index}
                className="p-2 border-2 rounded-md border-black hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
              >
                <label>Status: </label>
                <label
                  className={
                    item.status === "listed" ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.status}
                </label>
                <div className="flex justify-center">
                  <img
                    src="assets/Example_Product.png"
                    alt={"picture " + item.id}
                    className="max-w-full max-h-32"
                  />
                </div>
                <div className="flex mx-5 mt-5 flex-col">
                  <p className="mb-2">{item.name}</p>
                  <p className="pr-2">Price: {item.price}€</p>
                  <p>
                    Delivery in:{" "}
                    {item.delivery_time >= 7
                      ? Math.floor(item.delivery_time / 7) + " weeks"
                      : item.delivery_time + " days"}
                  </p>
                  <span>Rating: {Array(item.rating).fill("★").join("")}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className={`text-3xl rounded-md p-5 duration-300 ${
              items.length <= 3 ? "" : "hover:bg-black hover:text-white"
            }`}
            disabled={items.length <= 3}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export function CompanyOrders() {
  const [orders, setOrders] = useState([]);

  async function getorders() {
    let url = `${env.API_URL}orders?buyerId=${accountdata.account_id}`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        Array.isArray(data) ? setOrders(data) : setOrders([data])
      );
  }

  useEffect(() => {
    getorders();
  });

  return (
    <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
      <div className="mb-5">
        <h1 className="text-xl font-bold">Company Ordered Products</h1>
        {orders.map((order, index) => {
          let date = new Date(order.date);
          let formattedDate = date.toISOString().substring(0, 10);
          return (
            <div key={index} className="bg-white shadow-md rounded-md p-2 mb-2">
              <div className="flex ">
                <p className="mr-5">
                  <span className="font-semibold">Order ID: </span>
                  <span className="font-semibold">{order.id}</span>
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Order Date: </span>
                  <span className="font-semibold">{formattedDate}</span>
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Amount of Items: </span>
                  <span className="font-semibold">{order.items.length}</span>
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Total Costs: </span>
                  <span className="text-red-500 font-semibold">
                    -
                    {order.items.reduce(
                      (total, item) => total + item.price * item.amount,
                      0
                    )}
                    €
                  </span>
                </p>
              </div>
              {order.items.map((item) => (
                <div>
                  <p>
                    <span className="mr-5">Product Name: {item.name}</span>{" "}
                    <span className="mr-5">Cost per Item: {item.price}€</span>
                    <span className="mr-5">Amount: {item.amount}</span>
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductOrders() {
  const [orders, setOrders] = useState([]);

  async function getorders() {
    let url = `${env.API_URL}orders?sellerId=${accountdata.account_id}`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        Array.isArray(data) ? setOrders(data) : setOrders([data])
      );
  }

  useEffect(() => {
    getorders();
  });

  return (
    <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
      <div className="mb-5">
        <h1 className="text-xl font-bold">Product Orders</h1>
        {orders.map((order, index) => {
          let date = new Date(order.date);
          let formattedDate = date.toISOString().substring(0, 10);
          return (
            <div key={index} className="bg-white shadow-md rounded-md p-2 mb-2">
              <div className="flex ">
                <p className="mr-5">
                  <span className="font-semibold">Order ID: </span>
                  <span className="font-semibold">{order.id}</span>
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Order Date: </span>
                  <span className="font-semibold">{formattedDate}</span>
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Amount of Items: </span>
                  <span className="font-semibold">{order.items.length}</span>
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Total Costs: </span>
                  <span className="text-green-500 font-semibold">
                    +
                    {order.items.reduce(
                      (total, item) => total + item.price * item.amount,
                      0
                    )}
                    €
                  </span>
                </p>
              </div>
              {order.items.map((item) => (
                <div>
                  <p>
                    <span className="mr-5">Product Name: {item.name}</span>
                    <span className="mr-5">Cost per Item: {item.price}€</span>
                    <span className="mr-5">Amount: {item.amount}</span>
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Payments() {
  const [payments, setPayments] = useState([]);

  const [orders, setOrders] = useState([]);

  async function getorders() {
    let url = `${env.API_URL}orders?buyerId=${accountdata.account_id}&sellerId=${accountdata.account_id}`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        Array.isArray(data) ? setOrders(data) : setOrders([data])
      );
  }

  async function getpayments() {
    let url = `${env.API_URL}payments`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        Array.isArray(data) ? setPayments(data) : setPayments([data])
      );
  }

  useEffect(() => {
    getorders();
    getpayments();
  }, []);

  return (
    <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
      <div className="w-full mb-5">
        <h1 className="text-xl font-bold pb-5">Payment methods</h1>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div className="bg-white shadow-md rounded-md p-2 mb-2 hover:scale-105 duration-300 cursor-pointer">
              <p>
                <span className="font-bold">{payment.provider}</span>, Ending
                with: <span className="font-bold">{payment.card_number}</span>
                <button className="float-right hover:font-semibold">
                  Edit
                </button>
              </p>
              <p>
                Expires on: <span className="font-bold">{payment.expires}</span>
              </p>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-md rounded-md p-2 mb-2 hover:scale-105 duration-300 cursor-pointer">
            <p>We found no payment methods registered on your account.</p>
            <p>
              Register a new one by clicking on the 'Add payment method' button
            </p>
          </div>
        )}
        <div className="flex justify-end w-full mt-5">
          <button className="p-1 rounded-md bg-gray-500 text-white hover:bg-gray-600">
            Add payment
          </button>
        </div>
        <h1 className="text-xl font-bold mb-5">Billings</h1>
        {orders.map((order, index) => {
          let date = new Date(order.date);
          let formattedDate = date.toISOString().substring(0, 10);
          return (
            <div key={index} className="bg-white shadow-md rounded-md p-2 mb-2">
              <div className="flex ">
                <p className="mr-5">
                  <span className="font-semibold">Order ID: </span>
                  {order.id}{" "}
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Order Date: </span>
                  {formattedDate}{" "}
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Amount of Items: </span>
                  {order.items.length}{" "}
                </p>
                <p className="mr-5">
                  <span className="font-semibold">Costs: </span>
                  <span
                    className={
                      order.buyerId === 4 ? "text-red-500" : "text-green-500"
                    }
                  >
                    {order.buyerId === 4 ? "-" : "+"}
                    {order.items.reduce((total, item) => total + item.price, 0)}
                    €
                  </span>{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CustomerSupport() {
  const chat_metadata = {
    customer_id: 3,
    customer_name: "Test Customer A",
    product_id: 1,
    product_name: "Test Product",
  };

  const messages = [
    {
      senderid: 3,
      reciverid: 1,
      message: "Hallo Ich habe ein Problem",
      timestamp: "2023-11-19T21:09:16Z",
    },
    {
      senderid: 1,
      reciverid: 3,
      message: "Was für ein Problem haben sie denn?",
      timestamp: "2023-11-19T21:09:16Z",
    },
    {
      senderid: 3,
      reciverid: 1,
      message:
        "Mein Monitor funktioniert nicht mehr, nach dem ich ihn aus dem 3. Stock geworfen habe",
      timestamp: "2023-11-19T21:09:16Z",
    },
    {
      senderid: 1,
      reciverid: 3,
      message: "Da können wir leider nichts machen das ist ihre eigene schuld ",
      timestamp: "2023-11-19T21:09:16Z",
    },
  ];

  return (
    <div className="flex flex-col w-3/4 h-2/3 bg-white rounded-md shadow-xl p-5">


      <div className="mb-5">
      <h1 className="text-xl font-bold">Customer Support</h1>
    </div>
    <div id="chat-window" className="flex flex-grow">
      <div className="w-1/3 h-full border-2 border-gray-400 rounded-l-md">
        <h1 className="p-2 font-semibold border-gray-300 border-b-2">
          Customer Contacts
        </h1>
      </div>
      <div className="p-5 w-2/3 h-full border-y-2 border-r-2 border-gray-400 rounded-r-md">
        <div className="w-full h-18 mb-5 border-b-2 border-gray-300">
          <h1 className="text-lg font-semibold">
            {chat_metadata.customer_name}
          </h1>
          <h3 className="pb-5 text-md">{chat_metadata.product_name}</h3>
        </div>

        <div className="w-full">
          {messages.map((message) => (
            <div
              key={message.timestamp}
              className={`flex mb-2 ${
                message.senderid === 1 ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-2 py-1 min-w-48 max-w-2/5 ${
                  message.senderid === 1
                    ? "rounded-l-lg rounded-br-lg bg-green-800"
                    : "rounded-r-lg rounded-bl-lg bg-gray-500"
                }`}
              >
                {message.message}
                <span
                  className={`flex ${
                    message.senderid === 1 ? "justify-start" : "justify-end"
                  } text-xs`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
  
}
