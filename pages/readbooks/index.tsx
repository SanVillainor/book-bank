import React from "react";
import LoggedInNavBar from "../../src/components/LoggedInNavBar/LoggedInNavBar";
import ReadBookTable from "../../src/components/CommonTable/BookTable";
export default function Home() {
  return (
    <div className="flex flex-col">
      <LoggedInNavBar />
      <p className="text-lg font-medium px-16 py-5">Not owned read books</p>
      <ReadBookTable />
    </div>
  );
}
