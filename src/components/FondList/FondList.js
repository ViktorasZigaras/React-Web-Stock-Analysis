import React, { PureComponent } from 'react';
import './FondList.css';
import axios from 'axios';
import location from '../../config.js';
import {
  multiplyNumbers, 
  substractNumbers, 
  percentDivisionNumbers, 
  convertNumbers} from '../../Helpers/NumericHelper.js';

class FondList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {sortDirection: 'asc', lastSortColumn: ''}
  };

  onClickFond(fond) {
    if (fond.shareValue) {
      this.props.callbackFromParent(fond);
      return;
    }
    const newDate = new Date()
    const date = newDate.getDate();
    let prevDate = date;
    const month = newDate.getMonth() + 1;
    let prevMonth = month - 1;
    const year = newDate.getFullYear();
    let prevYear = year;
    if (prevDate > 30) {
      prevDate = 30;
      if (prevMonth === 2) {prevDate = 28;}
    }
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear = prevYear - 1;
    }
    const url = 
      location + 
      'http://luminor-funds.metasite.lt/funds/funds/getJson/' +
      prevYear + '-' + 
      prevMonth + '-' + 
      date + '/' + 
      year + '-' + 
      month + '-' + 
      date + '/fund_' + 
      fond.fundId
    ;
    //console.log(url);
    axios.get(url)
    .then((res) => {
      const data = res.data.funds[fond.fundId].day;
      const value = data[data.length-1].price;
      fond.shareValue = convertNumbers(value);
      fond.totalValue = multiplyNumbers(fond.quantity, fond.shareValue);
      fond.valueChange = substractNumbers(fond.totalValue, fond.value);
      fond.valuePercentChange = percentDivisionNumbers(fond.valueChange, fond.value);
      const updatedFond = {...fond};
      this.props.callbackFromParent(updatedFond);
    })
    .catch((error) => {
      console.error('Error: ' + error);
      alert('Wrong ID number! Please find correct one and change to it.');
      const updatedFond = {...fond};
      this.props.callbackFromParent(updatedFond);
    });
  }

  render() {
    /*const fonds = [];
    this.props.setList.forEach((entry) => { 
      fonds.push(
      <p key={entry.fundName} className="hover-item" onClick={()=>this.onClickFond(entry)}>
        {entry.fundName} ({entry.fundId})
      </p>);
    });*///alternative to map?

    const fonds = this.props.setList.map(function(entry) { 
      return <p key={entry.fundName} className="hover-item" onClick={()=>this.onClickFond(entry)}>
        {entry.fundName} ({entry.fundId})</p>;
    }.bind(this));
      
    return (
      <div className="left-section">{fonds}</div>
    );
  }
}

export default FondList;