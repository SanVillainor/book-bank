import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/auth";
import firebase from "firebase/app";


const ProductView = ({ book }) => {
  // @ts-ignore
  const {user} = useAuth()
  console.log("product render and books are",book)

  const addToWishlist = async() =>{
    if(user)
        await firebase.firestore().collection("users").doc(user.uid).update({
          wishlist: firebase.firestore.FieldValue.arrayUnion(book)
        })
  }
  

  const addToCollection = async() =>{
    if(user)
        await firebase.firestore().collection("users").doc(user.uid).update({
          collection: firebase.firestore.FieldValue.arrayUnion(book)
        })
  }
  
  const addToReadBooks = async() =>{
    if(user)
        await firebase.firestore().collection("users").doc(user.uid).update({
          rdBooks: firebase.firestore.FieldValue.arrayUnion(book)
        })
  }

  
  return (
    <>
      <h1 className="text-4xl font-medium tracking-tight text-gray-900 pb-4 mb-6 border-b border-gray-200">
        {book.title}
      </h1>
      <Row>
        <Col md={6} style={{ textAlign: "center" }}>
          <img src={book.image} className="img-fluid w-full" alt="" />
          <Row>
            <Col md={4}>
              <Button variant="success" className="mt-4 w-full py-3" size="sm"onClick={addToWishlist} >
                Add to wishlist
              </Button>
            </Col>
            <Col md={4}>
              <Button
                variant="outline-success"
                className="mt-4 w-full py-3"
                size="sm"
                onClick={addToCollection}
              >
                Add to Collection
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="success" className="mt-4 w-full py-3" size="sm" onClick={addToReadBooks}>
                Add to read book list
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <div className="bg-white border overflow-hidden ">
            <div className="px-4 py-4 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {book.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="">
              <dl>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Author</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {book.authors}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">ISBN</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {book.isbn}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">ISBN10</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {book.isbn13}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">
                    Language
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {book.language}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Binding</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {book.binding}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">
                    Illustrated:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {book.date_published}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductView;
