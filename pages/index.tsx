import React from "react";
import Link from "next/link";
import LoggedInNavBar from "../src/components/LoggedInNavBar/LoggedInNavBar";
// import NavBar from "../src/components/NavBar/NavBar";
import DashBoard from "../src/components/DashBoard/DashBoard";
import Landing from "../src/components/Landing/Landing";

export default function Home() {
  // const { query } = router.query;

  return (
    <div className="bg-gray-50">
      <Landing />
    </div>
  );
}
