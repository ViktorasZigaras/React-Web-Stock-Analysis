import React, { PureComponent } from 'react';
import './FondInfo.css';

class FondInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let fondInfo = null;
    if (this.props.selectedFond) {
      const fond = this.props.selectedFond;
      const currency = 'EUR'; //&nbsp;
      let changeTrajectory = '';
      if (fond.valueChange > 0) {changeTrajectory = '+';}
      if (fond.value < 0) {fond.valuePercentChange *= -1;}
      fondInfo = 
        <div>
          <p className="main-label">
            {fond.fundName} ({fond.fundId})</p>
          <p className="main-label">
            Value: {fond.value} {currency} (Spent: {fond.cost} {currency}, Tax: {fond.tax} {currency})</p>
          <p className="main-label">
            Shares Owned: x{fond.quantity}</p>
          <p className="main-label">
            Share Value: {fond.shareValue} {currency}</p>
          <p className="main-label">
            Total Value: {fond.totalValue} {currency}</p>
          <p style={fond.valueChange > 0 ? {color:'green'}: {color:'red'}} className="main-label">
            Total Value Change: {changeTrajectory}{fond.valueChange} {currency}</p>
          <p style={fond.valuePercentChange > 0 ? {color:'green'}: {color:'red'}} className="main-label">
            Change: {changeTrajectory}{fond.valuePercentChange}%</p>
        </div>
      ;
    }
      
    return (
      <div className="right-section">{fondInfo}</div>
    );
  }
}

export default FondInfo;