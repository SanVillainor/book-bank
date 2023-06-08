import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthProvider} from "../src/contexts/auth"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <AuthProvider>
    <Component {...pageProps} />;
  </AuthProvider>)
}

export default MyApp;
