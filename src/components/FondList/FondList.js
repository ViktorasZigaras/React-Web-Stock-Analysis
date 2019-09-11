import React, { PureComponent } from 'react';
import { /*Col, */Row } from 'reactstrap';
import './FondList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import location from '../../config.js';

class FondList extends PureComponent {
  
  constructor(props) {

    super(props);
    this.state = {selectedFond: null, newValues: false};

  }

  componentDidMount(){
    
    console.log(location);
    
  }

  onClickCustomer(fond) {

    if (!fond.shareValue) {
      //
      const newDate = new Date()
      const date = newDate.getDate();
      let prevDate = date;
      const month = newDate.getMonth() + 1;
      let prevMonth = month - 1;
      const year = newDate.getFullYear();
      let prevYear = year;

      if (prevDate > 30) {
        prevDate = 30;

        if (prevMonth === 2) {
          prevDate = 28;
        }
      }

      if (prevMonth === 0) {
        prevMonth = 12;
        prevYear = prevYear - 1;
      }

      const url = location + 'http://luminor-funds.metasite.lt/funds/funds/getJson/' +
      prevYear + '-' + prevMonth + '-' + date + '/' + year + '-' + month + '-' + date + '/fund_' + fond.fundId;
      console.log(url);

      axios.get(url)
      .then((res) => {
        const data = res.data.funds[fond.fundId].day;
        const value = data[data.length-1].price;
        console.log(value);
        fond.shareValue = Number(value).toFixed(2);
        fond.totalValue = Number(fond.quantity * fond.shareValue).toFixed(2);
        fond.valueChange = Number(fond.totalValue - fond.cost).toFixed(2);
        fond.valuePercentChange = Number((fond.valueChange/fond.cost) * 100).toFixed(2);
        if (fond.valuePercentChange > 0) {fond.valuePercentChange = '+' + fond.valuePercentChange;}
        fond.valuePercentChange += '%';
        this.setState({selectedFond: null});
        this.setState({selectedFond: fond});
      })
      .catch((error) => {
        console.error('Error: ' + error)
      });

    }

    this.setState({selectedFond: fond});
  }

  render() {

    const rows = [];
    let fondInfo = null;

    if (this.state.selectedFond) {
      const fond = this.state.selectedFond;
  
      fondInfo = 
      <div>
        <p className="main-label">Fund Name: {fond.fundName}</p>
        <p className="main-label">Fund Id: {fond.fundId}</p>
        <p className="main-label">Amount Spent: {fond.cost}</p>
        <p className="main-label">Quantity: {fond.quantity}</p>
        <p className="main-label">Tax: {fond.tax}</p>
        <p className="main-label">Share Value: {fond.shareValue}</p>
        <p className="main-label">Total Value: {fond.totalValue}</p>
        <div className="flex">
          <p className="main-label">Change %:&nbsp;</p>
          <p style={fond.valueChange > 0 ? {color:'green'}: {color:'red'}} className="main-label">
            {fond.valuePercentChange}
          </p>
        </div>
        <div className="flex">
          <p className="main-label">Total Change:&nbsp;</p>
          <p style={fond.valueChange > 0 ? {color:'green'}: {color:'red'}} className="main-label">
            {fond.valueChange}
          </p>
        </div>
      </div>;

      //Row main-row 

    }

    this.props.setList.forEach((entry) => { 

      rows.push(<p key={entry.fundName} className="hover-item" onClick={()=>this.onClickCustomer(
        entry)}>{entry.fundName}, {entry.fundId}</p>);
        
    });
      
    return (
      <Row>
        <div className="left-section">
          {rows}
        </div>
        <div className="right-section">
          {fondInfo}
        </div>
      </Row>
    );

  }

}

export default FondList;