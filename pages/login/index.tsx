import React from "react";
import LoggedInNavBar from "../../src/components/LoggedInNavBar/LoggedInNavBar";
import LoginPage from "../../src/components/LoginPage/LoginPage";
import NavBar from "../../src/components/NavBar/NavBar";
export default function Home() {
  return (
    <div className="bg-gray-50">
      <LoggedInNavBar />
      <LoginPage />
    </div>
  );
}
