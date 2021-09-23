import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import {Card,Button} from 'react-bootstrap/';

class ComponentCard extends React.Component {
 
addFavorite=()=>{


let itemObj = {
email:this.props.auth0.user.email,
title:this.props.title,
url:this.props.url,
}

this.props.addFavorite(itemObj)
}

    render() { 
    return(
         <>
        <Card  style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.url} alt={this.props.title} />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
        
          <Button onClick={this.addFavorite} variant="primary">Add to Favorite</Button>
        </Card.Body>
      </Card>
      </>
)
   }
}

export default withAuth0(ComponentCard);