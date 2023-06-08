import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import config from "../../config";
import makeRequest from "../../axios";
import DetailTile from "../../src/components/DetailTile/DetailTile";
import Link from "next/link";
import LoggedInNavBar from "../../src/components/LoggedInNavBar/LoggedInNavBar";
import DashBoard from "../../src/components/DashBoard/DashBoard";
// const { url } = config;
// const { key } = config;

export default function Home() {
  const router = useRouter();
  const { search } = router.query;
  const [query, setQuery] = useState("");
  const [res, setRes] = useState([]);

  let requestURL = "https://api2.isbndb.com/" + `books/${search}`;
  // let headers = {
  //   "Content-Type": "application/json",
  //   Authorization: "46306_ff3665e78e98ea2774e3394d0fd99d5a",
  // };
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "46306_ff3665e78e98ea2774e3394d0fd99d5a");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append(
    "Access-Control-Allow-Methods",
    "DELETE, POST, GET, OPTIONS"
  );
  myHeaders.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  useEffect(() => {
    if (search) {
      let getBooks = async () => {
        // fetch(requestURL, requestOptions)
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw Error("ERROR");
        //     }
        //     return response.json();
        //   })
        //   .then((data) => console.log("data", data))
        //   .catch((error) => {
        //     console.log("error", error);
        //   });
        const res = await makeRequest(requestURL, "GET");
        // @ts-ignore
        console.log(res);
        setRes(res.data.books);
      };
      getBooks();
    }
  }, [search]);
  return (
    <div className="bg-gray-50">
      <LoggedInNavBar />
      {/* <h1>DashBoard</h1> */}
      <br />
      {(res.length!==0)?<DashBoard books={res} />:<h1>Loading....</h1>}
    </div>
  );
}
