import React, { PureComponent } from 'react';
import { /*Col, */Row } from 'reactstrap';
import './FondList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios';
import location from '../../config.js';

class FondList extends PureComponent {
  
  constructor(props) {

    super(props);
    this.state = {list: [], selectedFond: null};

  }

  componentDidMount(){
    
    console.log(location);
    
  }

  onClickCustomer(fond) {
    this.setState({selectedFond: fond});
    /*
    let url = 
      'http://localhost/web-test-json/json.php?url=' +
      'http://luminor-funds.metasite.lt/funds/funds/getJson/' +
      '2019-07-25/2019-08-25/fund_' +
      '22384';
      //console.log(getJson(url));
      //
    /*
    axios.get(url)
    .then((res) => {
      //const myObj = JSON.parse(res);
      //console.log(myObj);
      console.log(res.data.funds[22384].day[res.data.funds[22384].day.length-1]);
      console.log(res);
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    });
    */
  }

  render() {

    const rows = [];
    let fondInfo = null;

    if (this.state.selectedFond) {
      const fond = this.state.selectedFond;
   
      fondInfo = 
      <div className="right-section">
        <p className="main-label">Fund Name: {fond.fundName}</p>
        <p className="main-label">Fund Id: {fond.fundId}</p>
        <p className="main-label">Amount Spent: {fond.cost}</p>
        <p className="main-label">Quantity: {fond.quantity}</p>
        <p className="main-label">Tax: {fond.tax}</p>
      </div>;
    }
      
    this.state.list.forEach((entry) => { 

      rows.push(<p key={entry.fundName} className="hover-item" onClick={()=>this.onClickCustomer(
        entry)}>{entry.fundName}, {entry.fundId}</p>);
        
    });
      
    return (
      <Row>
        <div className="left-section">
          {rows}
        </div>
        <div>
          {fondInfo}
        </div>
      </Row>
    );

  }

}

export default FondList;