import React, { useEffect, useState } from 'react'
import LoggedInNavBar from '../../src/components/LoggedInNavBar/LoggedInNavBar'
import { useAuth } from "../../src/contexts/auth";
import client from "../../src/firebase/client"
import firebase from "firebase/app";
// interface contactProps{
//   user:any
// } 



const contact = () => {
  const {user}= useAuth();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [validation, setValidation] = useState(false)

  const EMAIL_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

  useEffect(()=>{
    client();
    const createDb = async()=>{
      if(user)
      {
        const userDoc = await firebase.firestore().collection("contacts").doc(user.uid);
        if((await userDoc.get()).exists){
          //  let data = (await userDoc.get()).data());
        }
        else{
          userDoc.set({
            name: "",
            email: "",
            message: ""
          })
        }
      }
    }
    createDb();
  }, [user]);

  const handleEmail = (e) => {
    //Validates the email address
    var emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!emailRegex.test(e.target.value)) {
      setValidation(false);
    } else {
      setValidation(true);
      setEmail(e.target.value)
    }
  };


  const addToContact = async() =>{
    if(user)
        await firebase.firestore().collection("contacts").doc(user.uid).update({
          name:name,
          email:email,
          message:msg
        })
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    // console.log("j" , name , email)
    addToContact();
  }

  return (
    <div className='bg-gray-50 h-screen '>
      <LoggedInNavBar/>
      <div className='px-20'>
      <div className='border rounded-lg m-auto bg-white mt-4 mx-30  p-10 '>
        <h1>Contact Form</h1>
        <p>Get in contact with us with this form. We will reply to you as soon as possible.</p>

        <form className='flex flex-col' onSubmit={submitHandler}>
          <label className='my-2'>Your Name:</label>
          <input type="text" placeholder='Your Name' className='border-1 p-2' onChange={(e)=>setName(e.target.value)}/>
          <label className='mt-4 mb-2'>Your E-mail Address:</label>
          <input type="text" placeholder='Your E-mail Address' className='border-1 p-2' onChange={handleEmail} />
          <label className='mt-4 mb-2'>Your Message</label>
          <textarea rows={4} cols={5} placeholder='Your Message' className='border-1 p-2' onChange={(e)=>setMsg(e.target.value)}></textarea>
          {name && email && msg?<button className='bg-green-700 text-white py-2 px-4 mt-5 rounded-sm' type="submit">Send</button>: <button style={{cursor:"not-allowed"}} className='bg-green-100 text-white py-2 px-4 mt-5 rounded-sm' disabled>Send</button>}

        </form>
      </div>
      </div>
    </div>
  )
}

export default contact
