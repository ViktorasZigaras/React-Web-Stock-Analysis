import React, { PureComponent } from 'react';
//import { /*Col, */Row } from 'reactstrap';
import './FondInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class FondInfo extends PureComponent {
  
  constructor(props) {

    super(props);
    this.state = {
      //selectedFond: null
    }

  };

  render() {

    let fondInfo = null;
    const currency = 'EUR'; //&nbsp;
    let changeTrajectory = '';

    if (this.props.selectedFond) {
      const fond = this.props.selectedFond;

      if (fond.valueChange > 0) {
        changeTrajectory = '+';
      }
  
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
          Total Value Change: {changeTrajectory}{fond.valueChange} {currency}
        </p>
        <p style={fond.valueChange > 0 ? {color:'green'}: {color:'red'}} className="main-label">
          Change: {changeTrajectory}{fond.valuePercentChange}%
        </p>
      </div>;

    }
      
    return (
      <div className="right-section">
        {fondInfo}
      </div>
      
    );

  }

}

export default FondInfo;