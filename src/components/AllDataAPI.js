import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import {Card,Button} from 'react-bootstrap/';
import axios from "axios";
class AllDataAPI extends Component {

constructor(props) {
super(props);
this.state = {

cohcolatearray:[],
showData:false
};

}


 componentDidMount = async() =>{ 
    // const {user} = this.props.auth0
    //   let namee=user.name

    let url=(`${process.env.REACT_APP_SERVER}/chocolate`);
    
    let resultData = await axios.get(url);
    console.log("ffffffffffff",cohcolatearray)

     this.setState ({
        cohcolatearray:resultData.data,
        showData:true

    })
}











  render() {
    return (
      <div>
        <h1>All Data from the API</h1>
        <h3>Select your favorites :)</h3>


        <>
          <Card onSubmit={this.selectChocalate} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={this.state.cohcolatearray.imageUrl} />
            <Card.Body>
              <Card.Title>{this.state.cohcolatearray.title}</Card.Title>
            
              <Button variant="primary">Add-to-favorite</Button>
            </Card.Body>
          </Card>
        </>
      </div>
    );
  }
}

export default withAuth0(AllDataAPI);
