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

        <div className="w-2/5 mb-4">
          <p className="block mb-1">Company ID</p>
          <p className="border border-gray-300 rounded-md p-2">
            {accountdata.account_id}
          </p>
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

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [Tags, setTags] = useState([]);

  const displayItems = items.slice(start, start + 3);
  const listedItems = items.filter((item) => item.listed === true);
  const nonlistedItems = items.filter((item) => item.listed === false);
  const [productView, setProductView] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);

  async function getproducts() {
    let url = `${env.API_URL}products/business?brandid=${accountdata.account_id}`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setItems(data));
  }

  async function getproduct(product_id) {
    let url = `${env.API_URL}products/${product_id}`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProductName(data.name);
        setDescription(data.description);
        setType(data.type);
        setPrice(data.price);
        setDeliveryTime(data.delivery_time);
        setStock(data.stock);
        setDiscount(data.discount);
        setTags(data.tags);
      });
  }

  async function publishProduct(product_id) {
    let url = `${env.API_URL}products/${product_id}/publish`;

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === product_id ? updatedProduct : item
          )
        );
      });
  }

  async function createProduct() {
    setProductView(false);
  }

  async function editProduct(id) {
    setProductView(false);
  }

  async function openProductView(createMode, id) {
    if (createMode === true) {
      setProductView(true);
      setCreateMode(true);
      console.log("create product");
    } else {
      setProductView(true);
      setCreateMode(false);
      console.log(id);
      getproduct(id);
      console.log("edit");
    }
  }

  useEffect(() => {
    getproducts();
  }, []);

  const handlePrev = () => {
    setStart((oldStart) => (oldStart === 0 ? items.length - 3 : oldStart - 1));
  };

  const handleNext = () => {
    setStart((oldStart) => (oldStart === items.length - 3 ? 0 : oldStart + 1));
  };

  return (
    <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
      <div className="mb-5 h-full">
        <h1 className="text-xl font-bold mb-5">Company Owned Products</h1>
        <div id="basic_view" className={productView ? "hidden" : "block"}>
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
          <div className="flex items-center mb-5">
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
                  className="p-2 border-2 rounded-md border-black cursor-pointer"
                  onClick={() => openProductView(false, item.id)}
                >
                  <label>Status: </label>
                  <label
                    className={
                      item.listed === true ? "text-green-500" : "text-red-500"
                    }
                  >
                    {item.listed === true ? "listed" : "non-listed"}
                  </label>
                  <div className="flex justify-center">
                    <img
                      src="assets/Example_Product.jpg"
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
          <div className="flex justify-end items-center mb-5">
            <button
              className="p-2 bg-gray-500 rounded-md"
              onClick={() => openProductView(true, -12321)}
            >
              Add Product
            </button>
          </div>
        </div>

        <div
          id="product_view"
          className={!productView ? "hidden flex-col" : "block flex-col"}
        >
          <div id="first_layer" className="flex-col mb-5">
            <div className="flex">
              <div className="flex flex-col w-2/5 mr-4 mb-4">
                <p className="block mb-1">Name</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2 outline-none bg-transparent"
                  type="text"
                  id="product_Name"
                  placeholder="Enter Product Name"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  readOnly={isReadOnly}
                />
              </div>
              <div className="flex flex-col w-2/5 mr-4 mb-4">
                <p className="block mb-1">Description</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2 outline-none bg-transparent"
                  type="text"
                  id="product_Description"
                  placeholder="Enter Product Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  readOnly={isReadOnly}
                />
              </div>
            </div>
            <div className="flex flex-col w-2/5 mr-4 mb-4">
              <p className="block mb-1">type</p>
              <input
                className="w-full border border-gray-300 rounded-md p-2 outline-none bg-transparent"
                type="text"
                id="product_Type"
                value={type}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          <div id="second_layer" className="flex-col mb-5">
            <div className="flex">
              <div className="flex flex-col w-1/5 mr-4 mb-4">
                <p className="block mb-1">Price</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2 outline-none bg-transparent"
                  type="number"
                  id="product_Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  readOnly={isReadOnly}
                />
              </div>
              <div className="flex flex-col w-1/5 mb-4">
                <p className="block mb-1">Delivery Time</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2 outline-none bg-transparent"
                  type="number"
                  id="product_DeliveryTime"
                  placeholder="Average Delivery Time"
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  value={deliveryTime}
                  readOnly={isReadOnly}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/5 mr-4 mb-4">
              <p className="block mb-1">In Stock</p>
              <input
                className="w-full border border-gray-300 rounded-md p-2 outline-none bg-transparent"
                type="number"
                id="product_Stock"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          <div id="third_layer" className="flex-col mb-5">
            <div className="flex flex-col w-1/5 mr-4 mb-4">
              <p className="block mb-1">Dicount</p>
              <input
                className="w-full border border-gray-300 rounded-md p-2 outline-none bg-transparent"
                type="number"
                id="product_Discount"
                placeholder="1-100"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                readOnly={isReadOnly}
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <p className="block mb-1">Tags</p>
              <input
                className="w-full border border-gray-300 rounded-md p-2 outline-none bg-transparent"
                type="text"
                id="product_Tags"
                placeholder="Enter Product Description"
                value={Tags}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col w-2/5 mr-4 mb-4">
              <button
                className="w-full border border-gray-300 rounded-md p-2 bg-transparent hover:bg-slate-300 duration-300 hover:text-green-500"
                type="button"
                onClick={createMode ? createProduct : editProduct}
              >
                OK
              </button>
            </div>
            <div className="flex flex-col w-2/5 mr-4 mb-4">
              <button
                className="w-full border border-gray-300 rounded-md p-2 bg-transparent hover:bg-slate-300 duration-300 hover:text-red-500"
                type="button"
                onClick={() => setProductView(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompanyOrders() {
  const [orders, setOrders] = useState([]);

  async function getorders() {
    let url = `${env.API_URL}orders`;

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
        <h1 className="text-xl font-bold mb-5">Company Ordered Products</h1>
        {orders.length <= 0 ? (
          <div key="0" className="bg-white shadow-md rounded-md p-2 mb-2">
            <div className="flex ">
              <p className="mr-5">
                <span className="font-semibold">
                  You currently have no orders in your account
                </span>
              </p>
            </div>
          </div>
        ) : (
          orders.map((order, index) => {
            let date = new Date(order.date);
            let formattedDate = date.toISOString().substring(0, 10);
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-2 mb-2"
              >
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
                {order.items.map((item) => {
                  const truncatedName =
                    item.name.length > 30
                      ? item.name.substring(0, 30) + "..."
                      : item.name;
                  return (
                    <div>
                      <p>
                        <span className="mr-5">
                          <span className="font-semibold">Product Name:</span>
                          <span> {truncatedName}</span>
                        </span>
                        <span className="mr-5">
                          <span className="font-semibold">
                            {" "}
                            Cost per Item:{" "}
                          </span>
                          <span>{item.price}€</span>
                        </span>
                        <span className="mr-5">
                          <span className="font-semibold">Amount: </span>
                          <span>{item.amount}</span>
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function ProductOrders() {
  const [items, setItems] = useState([]);

  async function getorders() {
    let url = `${env.API_URL}orders/business`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        Array.isArray(data) ? setItems(data) : setItems([data])
      );
  }

  useEffect(() => {
    getorders();
  });

  return (
    <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
      <div className="mb-5">
        <h1 className="text-xl font-bold mb-5">Product Orders</h1>
        {items.length < 0 ? (
          <div key="0" className="bg-white shadow-md rounded-md p-2 mb-2">
            <div className="flex ">
              <p className="mr-5">
                <span className="font-semibold">
                  You currently have no orders in your account
                </span>
              </p>
            </div>
          </div>
        ) : (
          items.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-2 mb-2"
              >
                <div className="flex ">
                  <p className="mr-5">
                    <span className="font-semibold">Item ID: </span>
                    <span className="font-semibold">{item.productid}</span>
                  </p>
                  <p className="mr-5">
                    <span className="font-semibold">Order Date: </span>
                    <span className="font-semibold">{item.orderDate}</span>
                  </p>
                  <p className="mr-5">
                    <span className="font-semibold">Amount of Items: </span>
                    <span className="font-semibold">{item.amount}</span>
                  </p>
                  <p className="mr-5">
                    <span className="font-semibold">Turnover: </span>
                    <span className="text-green-500 font-semibold">
                      {item.amount * item.price} $
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function Payments() {
  const [payments, setPayments] = useState([]);

  const [billings, setBillings] = useState({
    companySoldItems: [],
    companyOrders: [],
  });

  async function getorders() {
    let url = `${env.API_URL}orders/business/billings`;

    fetch(url, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBillings(data));
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
        {billings.companySoldItems.length < 0 ||
        billings.companyOrders.length < 0 ? (
          <div key="0" className="bg-white shadow-md rounded-md p-2 mb-2">
            <div className="flex ">
              <p className="mr-5">
                <span className="font-semibold">
                  You currently have no orders in your account
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div>
            {billings.companySoldItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-2 mb-2"
              >
                <div className="flex ">
                  <p className="mr-5">
                    <span className="font-semibold">Item ID: </span>
                    <span className="font-semibold">{item.productid}</span>
                  </p>
                  <p className="mr-5">
                    <span className="font-semibold">Order Date: </span>
                    <span className="font-semibold">{item.orderDate}</span>
                  </p>
                  <p className="mr-5">
                    <span className="font-semibold">Amount of Items: </span>
                    <span className="font-semibold">{item.amount}</span>
                  </p>
                  <p className="mr-5">
                    <span className="font-semibold">Turnover: </span>
                    <span className="text-green-500 font-semibold">
                      {item.amount * item.price} $
                    </span>
                  </p>
                </div>
              </div>
            ))}

            {billings.companyOrders.map((order, index) => {
              const formattedDate = new Date(order.date)
                .toISOString()
                .split("T")[0];

              return (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-md p-2 mb-2"
                >
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
                      <span className="font-semibold">
                        {order.items.length}
                      </span>
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
                  {order.items.map((item) => {
                    const truncatedName =
                      item.name.length > 30
                        ? item.name.substring(0, 30) + "..."
                        : item.name;
                    return (
                      <div>
                        <p>
                          <span className="mr-5">
                            <span className="font-semibold">Product Name:</span>
                            <span> {truncatedName}</span>
                          </span>
                          <span className="mr-5">
                            <span className="font-semibold">
                              {" "}
                              Cost per Item:{" "}
                            </span>
                            <span>{item.price}€</span>
                          </span>
                          <span className="mr-5">
                            <span className="font-semibold">Amount: </span>
                            <span>{item.amount}</span>
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
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
    product_order_date: "23-02-2023",
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
      message: "Mein Monitor hat einen Wasser Schaden",
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
            <h3 className="text-md">
              <span className="font-semibold">Product: </span>
              {chat_metadata.product_name}{" "}
              <span className="font-semibold">Date of purchase: </span>
              {chat_metadata.product_order_date}
            </h3>
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
