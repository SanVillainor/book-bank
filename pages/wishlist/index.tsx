import React from "react";
import LoggedInNavBar from "../../src/components/LoggedInNavBar/LoggedInNavBar";
import ReadBookTable from "../../src/components/CommonTable/BookTable";

export default function Home() {
  return (
    <>
      <LoggedInNavBar />
      <p>My wishlist of Books</p>
      <ReadBookTable />

    </>
  );
}
