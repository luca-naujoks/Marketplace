"use client";

export function ProductCard(item, time, index) {
  console.log(time)
  return (
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
          {time >= 7
            ? Math.floor(time / 7) + " weeks"
            : time + " days"}
        </p>
        <span>Rating: {Array(item.rating).fill("★").join("")}</span>
      </div>
    </div>
  );
}
