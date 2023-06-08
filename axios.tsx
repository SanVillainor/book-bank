import axios from "axios";
// const key = process.env.NEXT_PUBLIC_API_KEY;
const key = "46306_ff3665e78e98ea2774e3394d0fd99d5a";
/**
 * Make request using any type of method headers etc
 * @param url URL of the request
 * @param method Method of the request
 * @param headers Headers of the request
 * @param body Body of the request
 * @param auth Auth if any
 * @returns
 */

const makeRequest = async (
  url,
  method,
  headers = {
    Authorization: key,
    "Content-Type": "application/json",
  },
  body = "",
  auth = ""
) => {
  let response = {
    success: true,
    data: {},
    err: "",
  };

  let params = {
    url: url,
    method: method,
    headers: headers,
    body: body,
    json: true,
  };

  try {
    let axiosData = await axios(params);
    response.data = axiosData.data;
  } catch (err) {
    response.success = false;
    response.err = err;
  }
  return response;
};

export default makeRequest;
