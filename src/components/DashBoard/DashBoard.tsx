/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import config from "../../../config";
const { url } = config;

// import { useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import Card from "./Card/Card";
import { Row } from "react-bootstrap";
import makeRequest from "../../../axios";
import { get } from "http";
import ListItem from "./Card/Card";
// import { config } from "process";

const sortOptions = [
  { name: "Most Popular", href: "#", checked: true },
  { name: "Best Rating", href: "#", checked: false },
  { name: "Newest", href: "#", checked: false },
  { name: "Price: Low to High", href: "#", checked: false },
  { name: "Price: High to Low", href: "#", checked: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  // {
  //   id: "color",
  //   name: "Color",
  //   options: [
  //     { value: "white", label: "White", checked: false },
  //     { value: "beige", label: "Beige", checked: false },
  //     { value: "blue", label: "Blue", checked: true },
  //     { value: "brown", label: "Brown", checked: false },
  //     { value: "green", label: "Green", checked: false },
  //     { value: "purple", label: "Purple", checked: false },
  //   ],
  // },
  // {
  //   id: "category",
  //   name: "Category",
  //   options: [
  //     { value: "new-arrivals", label: "New Arrivals", checked: false },
  //     { value: "sale", label: "Sale", checked: false },
  //     { value: "travel", label: "Travel", checked: true },
  //     { value: "organization", label: "Organization", checked: false },
  //     { value: "accessories", label: "Accessories", checked: false },
  //   ],
  // },
  
  {
    id: "binding",
    name: "Binding",
    options: [
      { value: "Hardcover", label: "Hardcover", checked: false },
      { value: "Paperback", label: "Paperback", checked: false },
    ],
  },
  {
    id: "year",
    name: "Year",
    options: [
      { value: "2000", label: "2015", checked: false },
      { value: "2016", label: "2016", checked: false },
      { value: "2017", label: "2017", checked: false },
      { value: "2018", label: "2018", checked: false },
      { value: "2019", label: "2019", checked: false },
      { value: "2020", label: "2020", checked: false },
      { value: "2021", label: "2021", checked: false },
    ],
  },
];

// const dummy = [
//   {
//     image:
//       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYVGRUYFRwYGBgaHBwZGhUZGBgZGRkaGBkcIS4lHB4rHxgYJjgmKy8xNTU1GiQ+QDs0Py40NTEBDAwMEA8QGhISHjYsJCE2NDYxNDQ0MTQ0NDQ0NDQ0NDQxMTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NP/AABEIALcBFAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EAEMQAAECAgYGBwQJAwMFAAAAAAEAAgMRBBIhMUFRBWFxgZGhBhMiUrHB0RQyQvAjJGJygpKisuElw/FDc8IHFWOz0v/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAfEQEBAQACAwEBAQEAAAAAAAAAARECEiExQVFhcQP/2gAMAwEAAhEDEQA/APjKIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIC9NaSZAEnILypmi6YYMaHFE+w8OsxANo3iY3oJdF6O0l4mILw3vPFQbq0idygUyiuhuLHSmMl91isDmzFoImDmCLF8m6a0apGBzHh/lZnLbi45tXzujpEAR+sbIsr1apmNU5qhXcl09HN/wBkjg5wV5XMI4ZERVBERAREQEREBERAREQEREBERAREQEREBERAREQEREBFtgQXPIa0EuOAXul0R8N1V4keR2FBHREQEREH2noZTOtoUIm9jTDd+Ayb+mqd65H/AKiQh2XDB1p2qR/0vpkxHgE4CI0bOy//AIKX04gVoTjkJ8LVyvjk1PT5iuzgn+mj7j//AGPXGLrIR/pw2PH6yV05JHJoiKoIi9MaSQBebEErRlCMV4aLsTqX0bRnQyjvaK7DPMOcPOSrei+iw0DO8nMrr9JaTZRKO6K6RIEmNnKu8jst8zqBU3R886baDo1Ec1kJ8R0R3ac1xaQxtsrQ0GZPIawuTUmnUt0V7ojyS97i5x1nLIYAYAKMqCIiAiIgIiICIiAiIgIiICIiAiL2xhcQACSTIACZJNwAF6Dwr3QXR2JSO17sKdrzjK8NGJ5eC6Lo50IuiUkaxCB/eR+0b8l3LYIAAAAAEgBYABgApaOdomhYcFtVjZZk2udtKjU/RrXtLXNmPDYunfDUKks4rI+YaV0G+FNwm5meI2qnX1GPBNuK5nS2gA6b4fZdi3A7MlqUcoi9xIZaSCCCLwV4VF/0Kp3VUyESey93Vu2PsH6qp3L6D0jhzY4HIhfIobi0ggyIIIORFoK+v0yOIsJkQXPY1/5mzK5f9P1qPj72yJGRkulhO/p/4nDi4Kh0gyrEePtHnarpjvqH43fuaul9RlziIioK70HQpmscbtmarKJArOlgL12+iKNKXzJS0X2h6PVlKzNcL0x06aTGk0/Qw5tYMHH4n78NQGtX/S7S3UweoafpIre2e6w3ja60bJ6l89SAiIqCLLWk2C1W9D6O0iJaIdVt9ZxDQBrxQU6KVTKOGOqh7HyvLCSBqrECe6YUVAREQEREBERAREQEREBdv0K6NxS5lIc50NgtYBY5/G5p581UdFItEZFrUkOMiKkxOGDm8XnhLNfW6NSmPaHMe1zc2mYUtHprV7qry568GJL0WdXGIrsMVCiMntzU4Pa+428wtL4RHqiK6JCUGkUXJXTmf5WmJDsQcdpXRTYgtEni53rmFx1LojobpOGw4HYvqdIo08FRaU0e17arhsOIOpWUcCvo3RelV6E1pvhvcw7D2x+6W5cFTKI6G6q7ccCF0fQakydFhH42Bw2sPmHck5zeK8fal08yUZ2u1TGn6if9zzC19JmSiA6ka76kR/5B4/wpPUW+6pUARS6DBmZ8Fu+GVvoiiylz2rqoUVkGG6K73WCcu8cGjWSqvRtHuAVT0s0lXcILT2IZt+1EuJ3XcVieaqmp9LdFiOiPM3OMzqwAGoCQ3KMshs1Oo1ALr+C1bIiExhJkASdSudHaAe8itNoyFp/hW1BojGNrOqsaL3H5tKjU3pCSCyACxtxeffP3e6Nd+xZ7auLRzaLQx2hWiSsaLXHafhG3mqbSWkqTSBKVWHhDaZA/excdtmpQYTROZvJmSbSScSVbUR0lnvi45qLR3t95rm7QQtK+jwaYxo7ZEsjaT+Fc/pfSVDNjKO1zu8CWCesMIBW+PLUxzCIUWkEREBERAREQERXHRzQb6XFDG2NFr34Nb6nAehQTOiXR11KfWdMQWHtHvG+o0555DaF9PfQGVQGtqVQGtLOyWgXASw1GxSqFQmQWNhsaGsYJAeJOZJtJR6zfJFW+LFh3jrGZtkIg2tudulsSFTWRLWOtxFzhtBtW+kPwwxVTTaKx9pEnYObY4a5hYvG/GpZ9SYhcDMWyxuK30XSw91/5vUeYVA6lRYfvfSMzueB5/Nq2Q6VDi+6ZOyNjhuxWe1jXXXVmGCJtNh57CtD2Ln6PTYkE9k1mztabt2RXQ0GnsjDsntD3mmxw9RrW5ylZvHGiLDVdSoFlyuYkM42qLHhj5w1Ko4vS9ADmlpGw5Fc5oeKYNJYXWSfVdsd2SeBmvoFOo81xmn6F8YvF+sJL8HrpZDk4aiQoQd9UI+23mX+isOkcSvDhxO81rjtIkec1V1vq5H22f3E4+l5e1c0TKvNGwblVUVkyun0XAmQE5X4kb6dTeoglwPbf2WZg4u3DmQuOZCJVnpildbEJHuN7LdgvdvNuyS1UaCSbFNyGazR6PkFPfHbBHa7TsGDxccAotJpoh9lki7F14GoZnWq2HCc84km0m8lScd81f8bqVTHxTNxuuaLGt2DzvXujwS64I1rG2e+7utuG0+k1iLGJscZDuNsG8+qt8qltcxthNZ3dbbxNy8RdJEWCTdTb97/RQSSbBYMh55rLKMDmnWfU38eItJc682Zeua0KzOjwRYZHWoMaC5pk4S89i3M+JWpERVBERAREQEREEvR9BfGiNhQ2lz3GQGWZJwAzX2nQ2jYVDhNhN2vdK17sXHyGAXynonoyLHjhsNz2ACcSIwkFjMbRiZAAZ7CvrFL0dDlLtiQkCHvnZnMyJ2rPLfixJNJYbnt4ifBeXhcrTKCROrEdscGnmJKoiR4zLj+Vzmcplc+1/Gus/XZxoWUtigUhp5Wn0C5odIo7by47Q13OwrY3pR32DaKzfEEc1ex1qwjk+gx3qrpVGa624zvxmpjNNQn/ABS2yP7Zr04Mfa0g7DOXolynmKxlOiMsd22/qG/HfxUqFSGvNeG4h7bbLHN2j5C1UijyxG9V0eFIztBFzhYRsIWbx/Gpf12+jNOBxDIsmvuD7mv+93T86laRIcp/O5fOIWkDc8Vm94C38TfMLotFaZLAGuNeEbnXlg826sOSTl8qXj9i1pLJ/Ny5vStGmDYusiNBAc0gtNsxkfJU9PhTC0y4mkt+rVe49zdxIeP3FVxP0Evtt/uq6psOTYrcwHDcS0/uCpP9Ifeb/c9Vrj9K20BkyFdU+P1UGQ96J2W6m/EeFm9Q9EwKxAWjSEbrYxq2tb2W7Bed5meCzvnSRHo0EuIkvVKpUuxD2OIx1N1a8dl6LF/02fid4gHLM47L9LSB7srL3m4fdHyVZPtHlsANtcbcGi8+m9e4kUykey3utvP3j68FpMWXu34uN52ZeK0LeGtxi4DsjVedpRrV5aFsaFKj21q2ssWtoW1rDksiZR3qxbAY9tVwBHzdkqqFCdgFYwogb7zmt2kDxWVVukNBuZ2mTc3L4hux3KmXaDTcBt7pnJoJ53c1T6V0nR4trYJDu9WDTvABB3rrxt+sqNERUEREBF76s5HgVN0Ro58aMyG1hcXOEwZtFUWmbvhEp2oPo/RljoNEY6jwi6v2nveWsL3XTDTbUFw2TxWim6bpI96EBun4OXR6QfUaGNc1rWgANDZAACQA7VgXJ0+Me9Pd/K48r5dOMQ4unX/EzkR5lQ4ulwb2Hn6LXSX71XRT9nmVJWrMSolKYb5jd/CjOew3Pkoxee67iV5MU5O8fFakZ1ucyeLDtl/CMri1oeJdx0+SjGIO6fytWOsbj/y9ZK4atIel4jbC4O1PBafzKWzSzCO2xzdY7beItVII4wcd5mOFi9NdiKp1jsn9NnEpiaunQ2PFZjgdbcNuSjsc9hmLsR8LtowOsKuF8+0DniPxNu5qUymOl2pObnYHcRYd4Cl461LjptC6aqGVtT4mG9n2m5jx2roKS0ObXYQWkYYhfPGvDrWEgi2Vzm7sRyV9oDTNU1H+6eDT3hqzGCx5i2Tl5jTpSBa7W1zf0kjmAuWeOw0faB/cvoGl6NIE4TB3TtXERIfuN28nOC1LlZzwlw4nVwHPHvO7DdpvO4TVeRVbVFjiJvPdbltPzeplPfJzWi0Q21QMC9wm4nUABPYc1WvfvmZ2/Ee8dWQWuMT08vIAlaG4DF2s5BaHPJ3XAXBbzBxe4AnDHgF7Y5vwsc7WbBwHqtantGZBJwUqHQHHArJivza3V2Qedq1PAN8Se2s7yTzTEj2drfec0bwTwCdbCGLnbB6yUUQ2d/kfRZqs7x4FTBJFNaPdZxMuQCz7c7ANGwT8ZqOGs7/J3ovbWNwe3fMeITP4NvXude48ZDgFqdRgdR5LY2CDc5p3j1W9lHdlNZ3DFVFglt42HArUr0Msk4TGRUWkaNMqzJkYt+IbM/FbnLUxWIhCLSCIiD6J/wBuaLgvcGA5k6hkXCqbBMiYMhvAVt1akaPYwPBILnfC1omSczgANajPpsgdGoQYDFD3PlNxrvFpwABlZcq+laGo4ua787//AKVnpPSLxP6Nw+85g/aXLlafph9vZYN5d6Lnerrx1qplBYD2QQPvO9VVRoJFxPE+qR9IxTdLcB5zUJ8WKb3Abz5FZaensfm5aX18xvIQw3Yu5DxM1jqh3neA4hbR4Jf3m+PgsEuzbwd5LZUb/kzWKg7o5ojVM41D+bzWKoPwt3H+Fvq6hw/lKpy5BNMag3KsN4I5zS3UeIP8rdU1clmrq8R5ppjTPPC43EbCFtDzfO0Y3HeM9dyyGavA+iyIeSix1GiNIddCdCf77W2a23clQGx4cfhDnSz7RMloo8RzHte33mm7MYjeFupzwSSLnWjYST4y4LPXy1vhAjOnMk2YnMm08TbskM1rBN47OZ+I+TRwW5sAm3hq2a9di2iijG3b6XLpsY9oQlgLc5VjvnZ4r0YbjeD+J1nAKbUCyGhOxiC2A7CqNgn4rYIB7w/KFLsSYyCmmInUP7x4LyYTu9yU6YyWFNMQDDdmN4asVHZtO70CnyCwWfP+VdMQTDPdbwcF5uvDZ6nAeKndWPs8B5IYZ+S4eaaI7IxzcNjgfNSYVKcPidvE/Ca1uhap/lPiF4MEd0Dd6FSyUeqVR65rB1uIM57ibxtUX2I5qXDMsLN/mtpatSs8piu9kOaKwksq6y+kRnhjS51gF6Rqc2isrvYXRXiYaC0FjcAQTMcFH0xTmwQHOqudfDYbZu77h3RhmVxlJpL3uL3kuc4zJNs0t8eCcdst+LDSOn4kQ2Ma0a3Enkql8V5vPAAeKOnsWkxWi9zeI9VjHTXotOJ4nyQM1rS6lNHxDdb4BanU1uZOwequVdiZ1Y1rEm6lAdS8mu23eq1mkuyPPyV61OyzrjJeDE2cVWOivOB4fwvFZ2R5p1Oy0MXWF560Z8iqsk5fO9Yty5K9U1adaO8OBWRSW94c1VTOtZmdfNOpq3EZuY+dy2tINxCopHWgmLpp1hqypNNAsF6iwaY4G0zGXooywrkzGf6v2xJiYWCVWUSk1bDd4KU6mNGJWbxanJvkklENNGA5rHtuocVOtNTAEkoXtZ1c1n2p2Q4H0V6r2TaupJKEKWe6OfovQpgy5y8VOtO0SpbUO9aG0sa/FbW0gZplNjMliW3kfNew8ZhZkMvncoNfHn5Jbn871sqD5JWOq1qDWZ/Nq2NuXkw3IwEFVK2SRbQ0G1FphHj9a4zdFJMgJylYBIBRnQDi5x3rKKttZoo1nes9QMgiKKyIQyCyGoiBVWaqIgVViqsog81ViqiIFVKqIgVUqrCINboQOC8GjZFYRaZY9mOYXtkCRnNEQbOrGQWOqGQRFlo6kZBY6pvzNEVDqBr4p1Ot3FERGOo1lPZ9aIgwILu8vYa8XELCIj31sQYgrJpETIH52oigz7Y7Fo4rHt+beaIrkGPbx3TxREVxH//Z",
//     description: "Lorem ipsum dolor sit amet",
//     title: "Harry Potter and the half blood prince",
//     language: "language",
//     cover: "paperback",
//     author: "author",
//     rating: 5,
//     year: "year",
//     buyfrom: {
//       link: "https://www.amazon.nl/s/ref=as_li_ss_tl?k=7523700498401&tag=tadex-21&linkCode=ll2&linkId=6c3b3bc6ebcf8bde1c4618ae3c8ea06f",
//       title: "Harry Potter and the Half-Blood Prince- Engelse boek",
//       sub: "As an Amazon Associate I earn from qualifying purchases.",
//       img: "https://books2search.com/images/amazon.png",
//     },
//     para: "Harry potter and the Half-Blood prince is het zesde deel van de Harry potter boeken reeks van de Britse Schrijfster J.K. Rowling dit boek bevat in totaal 607 bladzijdes en is dus echt voor boekenliefhebbers ook heeft het een ander perspectief als je via het boek bekijkt in plaats van de film",
//   },
//   {
//     image:
//       "data:image/jpeg;base64,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",
//     description: "Lorem ipsum dolor sit amet",
//     title: "Harry Potter and the half blood prince",
//     language: "language",
//     cover: "paperback",
//     author: "author",
//     rating: 5,
//     year: "year",
//     buyfrom: {
//       link: "https://www.amazon.nl/s/ref=as_li_ss_tl?k=7523700498401&tag=tadex-21&linkCode=ll2&linkId=6c3b3bc6ebcf8bde1c4618ae3c8ea06f",
//       title: "Harry Potter and the Half-Blood Prince- Engelse boek",
//       sub: "As an Amazon Associate I earn from qualifying purchases.",
//       img: "https://books2search.com/images/amazon.png",
//     },
//     para: "Harry potter and the Half-Blood prince is het zesde deel van de Harry potter boeken reeks van de Britse Schrijfster J.K. Rowling dit boek bevat in totaal 607 bladzijdes en is dus echt voor boekenliefhebbers ook heeft het een ander perspectief als je via het boek bekijkt in plaats van de film",
//   },
// ];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashBoard(props) {
  const books = props.books
  const [change, setChange] = useState(false)


  // let filterChanged=""
  const [newfilter, setNewfilter] = useState(books)
  

  let bk =[], bkArr=[];

  let yr=[] , yrArr =[];

  // let fltItem=[]

  // useEffect(()=>{
  //   setNewfilter(props.books)
  //   // fltItem = props.books  
  // }
  //   , [props.books])


  useEffect(()=>{
    // console.log(filters[0])
    console.log(books)
    bk = filters[0].options.filter((el)=> el.checked)
    bkArr = bk.map(({value})=>value)
    let fltItem = books.filter(({binding})=> bkArr.some(el => el === binding));

    if(fltItem.length===0){
      fltItem=props.books
    }

    yr = filters[1].options.filter((el)=>el.checked)
    yrArr = yr.map(({value})=>value)
    let finalItm = fltItem.filter(({date_published})=>yrArr.some(el => el === date_published))

    
    if(yrArr.length===0){
      finalItm = fltItem;
    }
    
    console.log("finalitm" ,finalItm.length);
    (bkArr.length || yrArr.length)?setNewfilter(finalItm) : setNewfilter(props.books) 
  } , [change])




  // console.log("id", id);
  // useEffect(() => {
  //   if (id) {
  //     let getBooks = async () => {
  //       await makeRequest(requestURL, "GET").then((res) => {
  //         setRes(res.data);
  //         console.log("res", res);
  //       });
  //     };
  //     getBooks();
  //   }
  // }, [id]);
  // console.log("final state", res);

  // useEffect(() => {

  //     let getBooks = async () => {
  //       fetch("https://api2.isbndb.com/search/books/harry", {
  //         headers: headers,
  //       })
  //         .then((response) => console.log(response.json()))
  //         .catch((error) => console.log("err", error));
  //     };
  //     getBooks();

  // }, []);

  // useEffect(() => {
  //   // if () {
  //     let getBooks = async () => {
  //       fetch("https://api2.isbndb.com/search/books", {
  //         headers: headers,
  //       })
  //         .then((response) => console.log(response.json()))
  //         .catch((error) => console.log("err", error));
  //     };
  //     getBooks();
  //   // }
  // },[])

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // @ts-ignore
  // console.log(res, "res")
  return (
    <div className="">
      <div>
        {/* Mobile filter dialog
           => Deleted that portion
        */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  {/* <ul
                    role="list"
                    className="font-medium text-gray-900 px-2 py-3"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul> */}

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={()=> {
                                      option.checked = !option.checked
                                      // filterChanged=option.value
                                      // setNewfilter(option.value)
                                      setChange((prev)=>!prev)
                                      console.log(option)
                                    } }
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Search Results
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option:any) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* This is only visible when vh is of mobile */}

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                // onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="flex flex-row">
              {/* Filters */}
              <div className="hidden lg:block mr-20 ">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3  w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  // onChange={(option)=>filterChangeHandler}
                                  onChange={()=> {
                                    // filterChanged=option.value
                                    option.checked = !option.checked
                                    // setNewfilter(option.value)
                                    setChange((prev)=>!prev)
                                    console.log(option)
                                  } }
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>

              {/* Product grid */}
              {/* {response ? console.log(response) : console.log("not yet")} */}
              <div className="">
                <div className="grid grid-cols-3 ">
                  {/* {console.log("inrow", books)} */}
                  
                  {
                  (newfilter)
                    ? newfilter.map((el) => (
                        <ListItem
                          key={el.isbn}
                          isbn={el.isbn}
                          book={el}
                          image={el.image}
                          title={el.title}
                          cover={el.cover}
                          language={el.language}
                        />
                      ))
                    : "No Result Found"}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// export async function getStaticProps (){
//   const res = makeRequest("https://api2.isbndb.com" ,get)

//   return{
//     props:{
//       res
//     }
//   }
// }
