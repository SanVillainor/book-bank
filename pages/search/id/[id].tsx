import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import config from "../../../config";
import makeRequest from "../../../axios";
import DetailTile from "../../../src/components/DetailTile/DetailTile";
// const { url } = config;
// const { key } = config;

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [query, setQuery] = useState("");
  const [res, setRes] = useState();

  let requestURL = "https://api2.isbndb.com/" + `search/${id}`;
  let headers = {
    "Content-Type": "application/json",
    Authorization: "46306_ff3665e78e98ea2774e3394d0fd99d5a",
  };

  useEffect(() => {
    if (id) {
      let getBooks = async () => {
        fetch("https://api2.isbndb.com/search/books", {
          headers: headers,
        })
          .then((response) => console.log(response.json()))
          .catch((error) => console.log("err", error));
      };
      getBooks();
    }
  }, [id]);
  console.log("final state", res);
  return (
    <div className="">
      <DetailTile />
    </div>
  );
}
