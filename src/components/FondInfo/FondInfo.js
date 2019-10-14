import './fondInfo.scss';
import {connect} from "react-redux";
import React from 'react';

function FondInfoView (props) {
  let fondInfo = null;
  if (props.selectedFund) {
    const fond = props.selectedFund;
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

const mapStateToProps = state => {
  return {selectedFund: state.selectedFund};
};

const FondInfo = connect(mapStateToProps, null)(FondInfoView);
export default FondInfo;