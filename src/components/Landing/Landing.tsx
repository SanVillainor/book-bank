import React, { useState } from "react";
import Link from "next/link";

const landing = () => {
  const [query, setQuery] = useState("");
  return (
    <div
      className=" h-screen "
      style={{
        background: "#A8E4A0",
      }}
    >
      <div className="px-80 py-24">
        <div className="border rounded-lg m-auto bg-white  mx-30 p-10 ">
          <h1 className="text-center mb-8">Book Bank</h1>
          <div className="relative flex items-center col-span-6 w-2/5 border-2 border-green-700 content-center m-auto">
            <input
              //   className="w-full px-4 py-2 text-sm border-b rounded-lg bg-gray-100 focus:border-b-blue-400 focus:outline-none focus:ring-1 focus:ring-green-600"
              className="w-full px-2 py-2 bg-white  text-md  ring-transparent focus:outline-none placeholder-green-700 focus:border-b-green-600"
              placeholder="Search"
              name="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              required
            />
            <Link href={`/search/${query}`}>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-5 h-5 right-2 bottom-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ color: "green" }}
                  // onClick={sendDataToParent}
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
          </div>
          <div className="mt-8">
            <p className="text-center">
              Looking for a book? In our extensive book database of millions of
              books you can find almost all the books in the world. Do you know
              the ISBN number of the book? Then you can search on the ISBN
              number; you will directly get the right book information you seek.
              Searching for a part of the title is also possible. Even searching
              for a part of the subtitle or the author often yields the result
              you are looking for. On the result page you can continue filtering
              to actually find the book you are looking for.
            </p>
          </div>
          <div className="text-green-700 flex items-center justify-around px-20 pt-10 ">
            <Link href={`/collection`}>
              <button className="font-semibold">Collection</button>
            </Link>
            <Link href={`/wishlist`}>
              <button className="font-semibold">Wishlist</button>
            </Link>
            <Link href={`/readbooks`}>
              <button className="font-semibold">Bookmark</button>
            </Link>
            <Link href={`/contact`}>
              <button className="font-semibold">Contact</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default landing;
