import React from 'react'
import LoggedInNavBar from '../../src/components/LoggedInNavBar/LoggedInNavBar'

const bookCollection = () => {
  return (
    <div className='bg-gray-50 h-screen m-0'>
      <LoggedInNavBar/>
      <div className='px-20 '>
      <div className='border rounded-lg m-auto bg-white mt-4 mx-30  p-10 '>
        <h1 className='mx-20'>Keep your own online book collection</h1>
        <p className='mt-4 mx-20'>
        Do you have a bookcase, a room or a house full of books? Or maybe even your own (small) library? Than it is possible that you own some books that you can't even remember you have. How handy would it be to have al those books in you own online book database?   
        <div className='mt-2'>
         On <a href='www.google.com'>Books2Search.com</a> it is possible to do just that! We will let you use our big database with millions of books to create your online collection. On each book detail page on this site are links to add that book to your own virtual book collection.
         </div>
        <div className='my-4'>
        <div className='font-semibold mb-2'>How do I add a book to my own virtual book collection?</div>

        By using the extensive search engine on this site you can find almost all books in the world with an ISBN number. Through this search engine you can find your book and check its information. Does the information on the page match with the book you have? On the book detail page you can use the 'Add to collection' button to add the book to your online collection.
        </div>
        <div className='my-4'>
        Don't you have an account? Register quickly with your name, e-mail address and password to get your own environment. We won't ask for any more information of you than necessary for an account. We will use this information only for your online collection and will never share this information with third parties.
        </div>

        <div  className='my-4'>
        You have an account? Then just log in with your e-mail address and password.
        </div>

        After registration or login the selected book will automatically be connected to your online collection. Through the menu you can view different collections. The books in your own possession can be viewed through 'My collection'.

        <div  className='my-4'>
        <div className='font-semibold mb-2'>Multiple collections</div>
      
        We have made a distinction between different collections. That's why it is also possible to keep track of books you would like to add to your book collection. This can be done by adding the book to the wish list.
        <div className='mt-2'>
        As a book fanatic you probably have read a lot of books, but do not own all those books in your own little library. Then it may happen that after reading a few pages in that nice new book you suddenly realize that you have already read that book. That is why we have also added the possibility to keep a collection of read books.
        </div>
        </div>

        <div className='my-4'>
        <div className='font-semibold pb-2'>Change input</div>
        On each collection page it is possible to change the input by clicking on the pencil at the end of the line. The book can be placed on a different list or an extra code / description can be added. This field can be used, among other things, to indicate where the book is located. It could also be used to indicate that the book has been loaned.
        </div>

        <div  className='my-4'>
        <div className='font-semibold pb-2'>Extra ideas</div>
        We have many more ideas that we will elaborate on for this site, but we would also like to hear your input. Do you have an improvement that we can add to this site? Let us know through the contact form and we will get started...
        </div>
        </p>
      </div>
      </div>
    </div>
  )
}

export default bookCollection
