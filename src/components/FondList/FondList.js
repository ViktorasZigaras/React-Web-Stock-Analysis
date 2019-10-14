import React from 'react';
import './fondList.scss';
import onFondClick from './onFondClick.js';
import {connect} from "react-redux";
import * as Actions from '../../actions/index.js';

function FondListView(props) {
  /*const fonds = [];
  this.props.setList.forEach((entry) => { 
    fonds.push(
    <p key={entry.fundName} className="hover-item" onClick={()=>this.onClickFond(entry)}>
      {entry.fundName} ({entry.fundId})
    </p>);
  });*///alternative to map?

  const fonds = props.list.map(function(entry) {
    return <p key={entry.fundName} className="hover-item" onClick={()=>onFondClick(entry, props)}>
      {entry.fundName} ({entry.fundId})</p>;
  }/*.bind(this)*/);
      
  return (
    <div className="left-section">{fonds}</div>
  );
}

function mapDispatchToProps(dispatch) {
  return {setSelectedFund: item => dispatch(Actions.setSelectedFund(item))};
}

const mapStateToProps = state => {
  return {list: state.list};
};

const FondList = connect(mapStateToProps, mapDispatchToProps)(FondListView);
export default FondList;