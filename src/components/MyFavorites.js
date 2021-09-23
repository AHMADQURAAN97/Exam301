import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Card,Button,Modal,Form} from 'react-bootstrap/';

class MyFavorites extends React.Component {

constructor(props) {
  super(props);

this.state = {
  chocolateFav:[],
  showModalForm:false,
  chocolateSelect:{},
}
}


  componentDidMount = async () => {
    
    const { user } =this.props.auth0;

    let url=(`${process.env.REACT_APP_SERVER}/getdata?email=${user.email}`)

    let resultData = await axios.get(url)

    await this.setState({ 
      chocolateFav:resultData.data
    })
    console.log("hhhhhhhhhhhhhhhhhhhh",this.state.chocolateFav)
  }

//======================================Delete Function======================

  deleteChocolate = async(chocoID)=>{
  
  let url = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteChoco/${chocoID}?email=${this.props.auth0.user.email}`)
  
  await this.setState({ 
    chocolateFav:url.data
  })
  }

//===================================Update Function==================

updateData = async(chocoID)=>{

await this.setState({
  showModalForm:false,
})

let chocolateItem = this.state.chocolateFav.find(item =>{

return item._id === chocoID;

})

await this.setState({
  showModalForm:true,
  chocolateSelect:chocolateItem,
})
console.log('kkkkkkkkkkkk',this.state.chocolateSelect)
}



updateDataFunction = async (e)=>{

e.preventDefault();

let chocoData = {

title:e.target.title.value,
url:e.target.url.value, 
email:this.props.auth0.user.email
}

let chocoID = this.state.chocolateSelect._id


let url = await axios.put(`${process.env.REACT_APP_SERVER}/updateData/${chocoID}`,chocoData)

await this.setState({
  chocolateFav:url.data
})
console.log('yyyyyyyyyyyyyyyy',this.state.chocolateFav)

}
handleClose=()=>{

  this.setState({
    showModalForm:false,
  })

}


  render() {
    return(
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        
        {this.state.chocolateFav.length !==0 ? (

         this.state.chocolateFav.map(item => {

           return (
            
            <Card  style={{ width: "18rem" }}>
            <Card.Img variant="top" src={item.url} alt={item.title} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Button onClick={()=>this.deleteChocolate(item._id)} > Delete</Button>
              <Button onClick={()=>this.updateData(item._id)} > Update </Button>
            </Card.Body>
          </Card>
            )

         })
        
        

           ):(console.log('not exist any favorite chocolate'))
      
        }
       
        
      {this.state.showModalForm &&

      <Modal show={this.state.showModalForm} onHide={this.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Enter Your Update</Modal.Title>
        </Modal.Header>

          
          <Form onSubmit={this.updateDataFunction}>
          <Form.Group>

    <Form.Label>Title</Form.Label>
    <Form.Control type="text" defaultValue={this.state.chocolateSelect.title} name="title" />

    <Form.Label>Image URL</Form.Label>
    <Form.Control type="text" defaultValue={this.state.chocolateSelect.url} name="url" />

  </Form.Group>
  <Button variant="primary" type="submit" >
    Submit
  </Button>
 
</Form>
<Modal.Footer>
    <Button onClick={this.handleClose} variant="secondary">Close</Button>
  </Modal.Footer>
      </Modal>
      
    }
      </>
    )
  }
}

export default withAuth0(MyFavorites);

