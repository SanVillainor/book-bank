import React, { useState } from "react";
import { RiBarChart2Fill } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { IoHeartSharp } from "react-icons/io5";
import { AiFillBook } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
// import "../../../styles/globals.css"

function LoggedInNavBar(props) {
  const [query, setQuery] = useState("");
  const [ham, setHam] = useState(false)
  const toggleHandler = ()=>{
    setHam(prev=> !prev)
  }

  const sendDataToParent = () => props.getFromChild(query);

  return (
    <div className="h-24 w-full flex items-center justify-between bg-white shadow-md">
      <div className="ml-16 h-12 w-12 flex items-center">
        <Link href="/">
          <a>
            <BsBook className="h-full w-full" style={{ color: "green" }} />
          </a>
        </Link>
      </div>

      {/* <div className="relative flex items-center col-span-6 w-2/5  ">
        <input
          //   className="w-full px-4 py-2 text-sm border-b rounded-lg bg-gray-100 focus:border-b-blue-400 focus:outline-none focus:ring-1 focus:ring-green-600"
          className="w-full px-2 py-2 bg-white  text-md border-b-2 border-green-700 ring-transparent focus:outline-none placeholder-green-700 focus:border-b-green-600"
          placeholder="Search"
          name="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          required
        />
        <Link href={`/search`}>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-5 h-5 right-2 bottom-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ color: "green" }}
              onClick={sendDataToParent}
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </Link>
      </div> */}
      <div className="relative flex items-center col-span-6 w-2/5 border-b-2 border-green-700 content-center m-auto">
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
      {/* <div className="mr-16 flex items-center divide-x-2 divide-black">
        <div className="h-6 flex items-center justify-between">
          <div className="h-full w-full">
            <Link href="/collection">
              <a>
                <RiBarChart2Fill
                  className="h-full w-full cursor-pointer"
                  style={{ color: "green" }}
                />
              </a>
            </Link>
          </div>
          <div className="ml-10 h-full w-full">
            <Link href="/wishlist">
              <a>
                <IoHeartSharp
                  className="h-full w-full cursor-pointer"
                  style={{ color: "green" }}
                />
              </a>
            </Link>
          </div>
          <div className=" ml-10 h-full w-full">
            <Link href="/readbooks">
              <a>
                <AiFillBook
                  className="h-full w-full cursor-pointer"
                  style={{ color: "green" }}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className=" ml-10 h-6 w-20 pl-10">
          <Link href="/login">
            <a>
              <BsPersonFill
                className="h-full w-full cursor-pointer"
                style={{ color: "green" }}
              />
            </a>
          </Link>
        </div>
      </div> */}
      <div className="mr-16">
        <button onClick={toggleHandler}>
        <GiHamburgerMenu />
        </button>
        <ul className={`menuNav ${ham ? "showMenu" : ""} `}>
            <li>
              <Link href="/about">
                <a>
                About Us
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>
                Contact Us
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                Logout
                </a>
              </Link>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default LoggedInNavBar;
