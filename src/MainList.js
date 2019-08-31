import React, { Component } from 'react';
import '../src/MainList.css';
//import '../src/App.js';

class MainList extends Component {

  render() {

    var rows = [];
      
    this.state.funds.forEach((entry) => { 

      rows.push(<p key={entry.fundName} className="hover-item" onClick={()=>this.onClickCustomer(
        entry.fundName, entry.fundId, entry.cost, entry.quantity, entry.tax)}>
        {entry.fundName}, {entry.fundId}</p>);
        
    });
      
    return (
      <div>{rows}</div>
    );

  }

  constructor(props) {

    super(props);
    this.state = {funds: []};

  }
  
  onClickCustomer(fundName, fundId, cost, quantity, tax) {
      
    document.getElementsByName('fundName')[0].innerHTML = 'Fund Name: ' + fundName;
    document.getElementsByName('fundId')[0].innerHTML = 'Fund Id: ' + fundId;
    document.getElementsByName('cost')[0].innerHTML = 'Amount Spent: ' + cost;
    document.getElementsByName('quantity')[0].innerHTML = 'Quantity: ' + quantity;
    document.getElementsByName('tax')[0].innerHTML = 'Tax: ' + tax;
      
  }
  
}

export default MainList;