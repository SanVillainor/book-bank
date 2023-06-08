import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "../../../../styles/Home.module.css";
import Link from "next/link";
import firebase from "firebase/app";
import { useAuth } from "../../../contexts/auth";
import client from "../../../firebase/client"
import { firestore } from "firebase-admin";


export default function ListItem(props) {
  // console.log("card",props)
  // @ts-ignore
  const {user}= useAuth();


  // ================================
  // useEffect(()=>{
  //   client();
  //   const createDb = async()=>{
  //     if(user)
  //     {
  //       console.log(await firebase.firestore().collection("users").doc(user.uid).get());
  //       await firebase.firestore().collection("users").doc(user.uid).set({
  //       wishlist: [],
  //       collection: ["pasta sauce"],
  //       rdBooks: []
  //   })}
  //   }
  //   createDb();
  // }, [user]);

  useEffect(()=>{
    client();
    const createDb = async()=>{
      if(user)
      {
        const userDoc = await firebase.firestore().collection("users").doc(user.uid);
        if((await userDoc.get()).exists){
          //  let data = (await userDoc.get()).data());
        }
        else{
          userDoc.set({
            wishlist: [],
            collection: [],
            rdBooks: []
          })
        }
      }
    }
    createDb();
  }, [user]);



const addToWishlist = async() =>{
  if(user)
      await firebase.firestore().collection("users").doc(user.uid).update({
        wishlist: firebase.firestore.FieldValue.arrayUnion(props.book)
      })
}



  const clickWishlistHandler = ()=>{
    addToWishlist();
  }


  // ================================

  return (
    <div className="border rounded-lg bg-white flex flex-row justify-between pt-1 mb-4" style={{maxWidth:"90%" ,margin:"0"}}>
        <Col md={3} xs={12} style={{ paddingLeft: "0" }}>
          <img
            src={props.image}
            alt=""
            className="bg-gray-100 rounded-lg"
            height="100"
            style={{width:"100%"}}
          />
        </Col>
     <div className="mx-2">
        <div>
          <h2 className="text-base text-black mb-0.5 ">
            {props.title}
          </h2>
          <div className="flex flex-wrap text-sm font-medium whitespace-pre flex-col">
            <p className="my-1">{props.description}</p>
            <p className="my-1">
              {props.cover} | {props.language}
            </p>
          </div>
        </div>
        <div >
          {}
          <Link href={`/books/${props.isbn}`}>
            <button className="btn-cust-green w-full" >View Book</button>
          </Link >
          <button className="btn-cust-gray w-full" onClick={clickWishlistHandler}>Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
}
