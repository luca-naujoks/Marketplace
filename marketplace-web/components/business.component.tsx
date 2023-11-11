import Cookies from "js-cookie";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { useCreate } from "../components/auth.component";
import { env } from "../env"

interface AccountJwtPayload extends JwtPayload {
  company_id: number;
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

  const toggleReadOnly = async() => {
    let url = `${env.API_URL}accounts`;

    const request_data = {
      where: { id: accountdata.company_id },
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
          'Content-Type': 'application/json',

          Authorization: `Bearer ${Cookies.get("auth")}`,
        },
        body: JSON.stringify(request_data)
      })

      const data = await response.json();
      if(data.statusCode === 200) {
        useCreate(data.access_token)
        refreshPage()
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
              {accountdata.company_id}
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
            {isreadOnly ? <img src="/assets/edit_pen.svg" alt="edit" className="w-6 h-6" />: <img src="/assets/check_mark.svg" alt="save" className="w-6 h-6" />}
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

  const [items, setItems] = useState([])

  async function getproducts() {
    let url = `http://localhost:3000/products?brandid=${accountdata.company_id}`

    fetch(url)
    .then((response) => response.json())
    .then((data) => setItems(data));
  }

  useEffect(() => {
    getproducts();
  })

  return <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
    <div className="mb-5">
      <h1 className="text-xl font-bold">Company Owned Products</h1>

    </div>
  </div>;
}

export function CompanyOrders() {
  return <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
    <div className="mb-5">
      <h1 className="text-xl font-bold">Ordered Products</h1>
      
    </div>
  </div>;
}

export function ProductOrders() {
  return <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
    <div className="mb-5">
      <h1 className="text-xl font-bold">Product Orders</h1>
      
    </div>
  </div>;
}

export function Payments() {
  return <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
    <div className="mb-5">
      <h1 className="text-xl font-bold">Payment methods</h1>
      
    </div>
  </div>;
}

export function CustomerSupport() {
  return <div className="flex-col w-3/4 bg-white rounded-md shadow-xl p-5">
    <div className="mb-5">
      <h1 className="text-xl font-bold">Customer Support</h1>
      
    </div>
  </div>;
}
