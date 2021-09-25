import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ComponentCard from './ComponentCard';

class AllDataAPI extends Component {

constructor(props) {
super(props);

this.state = {
cohcolatearray:[],
};

}

//===============================DidMount FUNCTION =================
 componentDidMount = async () =>{ 


    let url=(`${process.env.REACT_APP_SERVER}/chocolate`);
    
    let resultData = await axios.get(url);

    await this.setState ({
      cohcolatearray:resultData.data,
  })
  console.log('dddddd',this.state.cohcolatearray)
}

//====================ADD FUNCTION===============


 addFavorite = async(itemObj)=>{


let chocolateAdd = await axios.post(`${process.env.REACT_APP_SERVER}/addData?email=${this.props.auth0.user.email}`,itemObj);

await this.setState({
  cohcolatearray:chocolateAdd.data,
})

}



  render() {
    return (
      <div>
        <h1>All Data from the API</h1>
        <h3>Select your favorites :)</h3>


        <>

        {this.state.cohcolatearray.length !==0 ? ( this.state.cohcolatearray.map(item =>{

       return (
        <ComponentCard title={item.title} url={item.url} addFavorite={this.addFavorite} />

       
             )     
        })

         


        ):(
          console.log('not exist any chocolate')
        )
        
        
        }
          
        </>
      </div>
    );
  }
}

export default withAuth0(AllDataAPI);