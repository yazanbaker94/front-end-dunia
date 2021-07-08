import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import  UpdateFormModal from './UpdateFormModal';
import { Button } from 'react-bootstrap';
class BestBooks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bookData: [],
     bookName:'',
      bookDescription:'',
      bookStatus:'',
       showUpdateForm:false,
      index:0

    };
  };

  



  componentDidMount = async () => {
    const { user } = this.props.auth0;
    console.log(user);
  

    const bookData = await axios.get(`http://localhost:3001/books?email=${user.email}`);
    console.log('book data exists!', bookData.data.books);

    this.setState({
      bookData: bookData.data.books
    });
  };



 

  getAdd=async(e)=>{
    e.preventDefault();
    
    const { user } = this.props.auth0;
    const bodydata={
      name:this.state.bookName,
    description:this.state.bookDescription,
     status:this.state.bookStatus,
     email:user.email

  }
  const addbook=await axios.post(`http://localhost:3001/books`,bodydata)
  this.setState({
    bookData:addbook.data

  })}


  addbookname=(e)=>{
    this.setState({
      bookName:e.target.value
    })
  }
  addbookdes=(e)=>{
    this.setState({
      bookDescription:e.target.value
    })
  }
  addstatus=(e)=>{
    this.setState({
      bookStatus:e.target.value
    }) 
  } ;


  deleteBook=async(index)=>{
    const newArrbook=this.state.bookData.filter((bok,idx)=>{
      return idx !== index;
    })
    console.log(newArrbook);
    this.setState({
      bookData:newArrbook
    })
  
    const { user } = this.props.auth0;
  const queryParams={
    email:user.email
  }
  await axios.delete(`http://localhost:3001/books/${index}`,{params:queryParams})
  };


  showUpdateForm=(idx)=>{
    const newArr=this.state.bookData.filter((value,index)=>{
      return idx ===index
    });

    this.setState({
      index:idx,
      bookName :newArr.name,
      bookDescription:newArr.description,
      bookStatus :newArr.status,
      showUpdateForm:true,
    })
      };



  Updatebook=async(e)=>{
    const { user } = this.props.auth0;
    e.preventDefault();
    const bodydata= {
      name:this.state.bookName,
       description:this.state.bookDescription,
      status:this.state.bookStatus,
       email:user.email}
    const updateBook=await axios.put(`http://localhost:3001/book/${this.state.index}`,bodydata)
  this.setState({
    bookData:updateBook.data
  })
  };



  render() {


    return(
      // <Jumbotron>
      <Jumbotron>
       
     < BookFormModal getAdd={this.getAdd}
     addbookname={this.addbookname}
      addbookdes={this.addbookdes}
       addstatus={this.addstatus}
      />


         <h1>My Favorite Books</h1>
         <p>
           This is a collection of my favorite books
         </p>


         {this.state.showUpdateForm&& 
        
        <UpdateFormModal
        addbookname={this.addbookname}
        addbookdes={this.addbookdes}
        addstatus ={this.addstatus}
        description={this.state.bookDescription}
     status={this.state.bookStatus}
        Updatebook={this.Updatebook}

        />
        }








       <Carousel>
       {this.state.bookData.map((book,index)=>{
         return(
           
         
           <Carousel.Item >

<img
                  className="d-block w-100"
                   src="https://via.placeholder.com/800x400/111111/111111?text=' '"
                  alt={`slide`}
                />
     <Carousel.Caption >
     <>
       <Button onClick={()=>this.deleteBook(index)}>remove book from shelf</Button>
     
       
       <Button  variant="warning" onClick={() =>this.showUpdateForm (index)} class='button'>update this book</Button>
       </>
       <h3>{book.name}</h3>
       <p>{book.description}</p>
       <p>{book.status}</p>
     </Carousel.Caption>
     </Carousel.Item>
          )
        })
        
      }
      </Carousel>
      </Jumbotron>
     
     
   
    )
  }
}

export default withAuth0(BestBooks);
























//     return(
      

// <Jumbotron>


//         <h1>My Favorite Books</h1>
//         <p>
//           This is a collection of my favorite books
//         </p>

      



    
      
//         <Carousel >
//         {this.state.bookData.map(book, index)=>{
       
      
//  <Carousel.Item>
//    
//                  <Carousel.Caption >
//                  <>   
//       <Button onClick={() =>this.deleteBook (index)} >remove</Button>
//        </>
            
                  
              
//                    <h3>{book.name}</h3>
//        <p>{book.description}</p>
//        <p>{book.status}</p>
//              </Carousel.Caption>
  
//  </Carousel.Item>
  
//         }
        
      
       
        
      
//    </Carousel>
//       </Jumbotron>
   
     
//    )
//   }
// }

// export default withAuth0(BestBooks );
