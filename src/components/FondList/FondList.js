import React, { PureComponent } from 'react';
import { /*Col, */Row } from 'reactstrap';
import './FondList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import location from '../../config.js';

class FondList extends PureComponent {
  
  constructor(props) {

    super(props);
    this.state = {selectedFond: null};

  }
  
  /*componentDidMount(){
    //console.log(location);
  }*/

  onClickFond(fond) {

    if (fond.shareValue) {
      this.setState({selectedFond: fond});
      return;
    }

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
    //console.log(url);

    axios.get(url)
    .then((res) => {
      const data = res.data.funds[fond.fundId].day;
      const value = data[data.length-1].price;
      //console.log(value);
      fond.shareValue = Number(value).toFixed(2);
      fond.totalValue = Number(fond.quantity * fond.shareValue).toFixed(2);
      fond.valueChange = Number(fond.totalValue - fond.value).toFixed(2);
      fond.valuePercentChange = Number((fond.valueChange/fond.value) * 100).toFixed(2);
      if (fond.valuePercentChange > 0) {fond.valuePercentChange = '+' + fond.valuePercentChange;}
      //fond.valuePercentChange += '%';
      //this.setState({selectedFond: null});
      const updatedFond = { ...fond };
      this.setState({selectedFond: updatedFond});
    })
    .catch((error) => {
      console.error('Error: ' + error)
    });
    
  }

  onClickPurchase(purchase) {
    //
  }

  render() {

    const fonds = [];
    const purchases = [];
    let fondInfo = null;
    const currency = 'EUR'; //&nbsp;

    if (this.state.selectedFond) {
      const fond = this.state.selectedFond;
  
      //<div className="flex">
      fondInfo = 
      <div>
        <p className="main-label">
          {fond.fundName} ({fond.fundId})
        </p>
        <p className="main-label">
          Value: {fond.value} {currency} (Spent: {fond.cost} {currency}, Tax: {fond.tax} {currency})
        </p>
        <p className="main-label">
          Shares Owned: x{fond.quantity}
        </p>
        <p className="main-label">
          Share Value: {fond.shareValue} {currency}
        </p>
        <p className="main-label">
          Total Value: {fond.totalValue} {currency}
        </p>
        <p style={fond.valueChange > 0 ? {color:'green'}: {color:'red'}} className="main-label">
          Total Value Change: {fond.valueChange} {currency}
        </p>
        <p style={fond.valueChange > 0 ? {color:'green'}: {color:'red'}} className="main-label">
          Change: {fond.valuePercentChange}%
        </p>
        
      </div>;

      //Row main-row 

      fond.entries.forEach((entry) => { 

        entry.totalValue = Number(entry.quantity * fond.shareValue).toFixed(2);
        entry.valueChange = Number(entry.totalValue - entry.value).toFixed(2);
        entry.valuePercentChange = Number((entry.valueChange/entry.value) * 100).toFixed(2);

        purchases.push(
        <div key={entry.date} className="rowMix" onClick={()=>this.onClickPurchase(entry)}>
          <div className="cellMix">{entry.date}</div>
          <div className="cellMix">{entry.cost}</div>
          <div className="cellMix">{entry.quantity}</div>
          <div className="cellMix">{entry.tax}</div>
          <div className="cellMix">{entry.value}</div>
          <div className="cellMix">{entry.totalValue}</div>
          <div className="cellMix">{entry.valueChange}</div>
          <div className="cellMix">{entry.valuePercentChange}</div>
        </div>);
          
      });

    }

    this.props.setList.forEach((entry) => { 

      fonds.push(
      <p key={entry.fundName} className="hover-item" onClick={()=>this.onClickFond(entry)}>
        {entry.fundName} ({entry.fundId})
      </p>);
        
    });
      
    return (
      <div>
        <Row>
          <div className="left-section">
            {fonds}
          </div>
          <div className="right-section">
            {fondInfo}
          </div>
        </Row>
        <Row>
          <div className="tableMix">
            {purchases}
          </div>
        </Row>
      </div>
      
    );

  }

}

export default FondList;