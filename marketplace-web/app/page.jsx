"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "../components/product.component";

export default function Home() {
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pricerating, setPricerating] = useState([
    { start: 0, end: 100 },
    { start: 100, end: 200 },
    { start: 200, end: 400 },
    { start: 400, end: 600 },
    { start: 600, end: 800 },
    { start: 800, end: 1000 },
    { start: 1000, end: "" },
  ]);
  const stars = ["1", "2", "3", "4", "5"];
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [startPrice, setStartPrice] = useState(null);
  const [endPrice, setEndPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  let queryParams = new URLSearchParams();
  useEffect(() => {
    if (typeof window !== "undefined") {
      let queryParams = new URLSearchParams(window.location.search);

      if (!queryParams.has("category")) {
        queryParams.set("category", "product");
        window.history.replaceState(null, null, "?" + queryParams.toString());
      }
    }
  }, []);
  const category = queryParams.get("category");

  const fetch_products = () => {
    let queryParams = new URLSearchParams(window.location.search);
    let url = "http://localhost:3000/products";

    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setItems(data));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetch_businessaccounts = () => {
        fetch("http://localhost:3000/accounts/business")
          .then((response) => response.json())
          .then((data) => setBrands(data));
      };
      fetch_products();
      fetch_businessaccounts();
    }
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const queriedItems = (items) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleBrandClick = (brandId) => {
    let queryParams = new URLSearchParams(window.location.search);
    if (selectedBrand === brandId) {
      setSelectedBrand(null);
      queryParams.delete("brandid");
    } else {
      setSelectedBrand(brandId);
      queryParams.set("brandid", brandId);
    }

    history.replaceState(null, null, "?" + queryParams.toString());
    fetch_products();
  };

  const handlePriceRangeClick = (start, end) => {
    let queryParams = new URLSearchParams(window.location.search);
    if ((startPrice === start) & (endPrice === end)) {
      setStartPrice(null);
      setEndPrice(null);
      queryParams.delete("startPrice");
      queryParams.delete("endPrice");
    } else {
      if (start !== "") {
        setStartPrice(start);
        queryParams.set("startPrice", start);
      } else {
        setStartPrice("");
        queryParams.delete("startPrice");
      }

      if (end !== "") {
        setEndPrice(end);
        queryParams.set("endPrice", end);
      } else {
        setEndPrice("");
        queryParams.delete("endPrice");
      }
    }
    history.replaceState(null, null, "?" + queryParams.toString());
    fetch_products();
  };

  const handleRatingClick = (rating) => {
    let queryParams = new URLSearchParams(window.location.search);
    if (selectedRating === rating) {
      setSelectedRating(null);
      queryParams.delete("rating");
    } else {
      setSelectedRating(rating);
      queryParams.set("rating", rating);
    }

    history.replaceState(null, null, "?" + queryParams.toString());
    fetch_products();
  };

  return (
    <main className="pt-24 w-full">
      <div className="flex mx-5">
        <div className="flex-none h-screen w-1/5" id="Filter">
          <div className="h-full border-2 rounded-md m-10 p-5">
            <span className="flex justify-center font-bold underline mb-5">
              Filter Options
            </span>
            <div>
              <input
                type="search"
                name="search"
                placeholder="Search Marketplace Items"
                id="1"
                className="border-2 w-full mb-5 outline-none pl-1"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            <span className="font-bold">Brands</span>
            <ol className="ml-5 mb-5">
              {brands.map((brand, index) => (
                <li className="" key={index}>
                  <span
                    className={`cursor-pointer ${
                      selectedBrand == brand.id ? "font-bold" : ""
                    }`}
                    onClick={() => handleBrandClick(brand.id)}
                  >
                    {brand.company_name}
                  </span>
                </li>
              ))}
            </ol>
            <span className="font-bold">Pricing Range</span>
            <ul className="ml-5 mb-5">
              {pricerating.map((item, index) => (
                <p
                  className={`cursor-pointer ${
                    (startPrice === item.start) & (endPrice === item.end)
                      ? "font-bold"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handlePriceRangeClick(item.start, item.end)}
                >
                  {item.end == "" ? "above" : item.start} -{" "}
                  {item.end == "" ? item.start : item.end}
                </p>
              ))}
            </ul>

            <span className="font-bold">Rating</span>
            <ul className="ml-5 mb-5">
              {stars.map((item, index) => (
                <li key={index}>
                  <span
                    className={`cursor-pointer ${
                      selectedRating == item ? "font-bold" : ""
                    }`}
                    key={index}
                    onClick={() => handleRatingClick(item)}
                  >
                    {item} {item > 1 ? " stars" : " star"}
                  </span>
                </li>
              ))}
            </ul>

            <span className="font-bold">Delivery Time</span>
            <ul className="ml-5 mb-5">
              <li key={"sameday"}>
                <span className="cursor-pointer">Same Day Delivery</span>
              </li>
              <li key={"1-3"}>
                <span className="cursor-pointer">1-3 Work Days</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-none h-screen w-4/5 mt-10" id="shopitems">
          <div className="grid 2xl:grid-cols-5 md:grid-cols-4 gap-4 px-4 justify-center">
            {items.length > 0 ? (
              queriedItems(items).map((item, index) => (
                <div
                  key={index}
                  className="p-2 border-2 rounded-md border-black hover:scale-105 duration-300"
                >
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
              ))
            ) : (
              <div
                key="01"
                className="p-2 border-2 rounded-md border-black hover:scale-105 duration-300"
              >
                <img src="" alt="No Items Found" className="w-full h-32" />
                <div className="flex mx-5 flex-col text-center">
                  <p className="mb-2 font-bold text-2xl">
                    {category === "selfmade"
                      ? "Sorry but we found No Matching selfmade items"
                      : category === "product"
                      ? `Sorry but we found No Matching ${category}s`
                      : `Sorry but we found No Matching ${category}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
