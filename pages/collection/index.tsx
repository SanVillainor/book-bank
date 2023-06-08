import * as React from "react";
import { Component } from "react";
import LoggedInNavBar from "../../src/components/LoggedInNavBar/LoggedInNavBar";
import ReadBookTable from "../../src/components/CommonTable/BookTable";
export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50">
      <LoggedInNavBar />
      <p className="text-lg font-medium px-16 py-5">My collection of books</p>
      <ReadBookTable />
    </div>
  );
}
