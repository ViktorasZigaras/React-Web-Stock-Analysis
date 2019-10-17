import React from 'react';
import { connect } from 'react-redux';
import './fondList.scss';
import onFondClick from './onFondClick';
import Actions from '../../redux/actions';

function FondListView(props) {
  /*const fonds = [];
  this.props.setList.forEach((entry) => { 
    fonds.push(
    <p key={entry.fundName} className="hover-item" onClick={()=>this.onClickFond(entry)}>
      {entry.fundName} ({entry.fundId})
    </p>);
  });*///alternative to map?

  const fonds = props.list.map(
    (entry) => {
      return <p key={entry.fundName} className="hover-item" onClick={() => onFondClick(entry, props)}>
        {entry.fundName} ({entry.fundId})</p>;
    }
  );
      
  return (
    <div className="left-section">{fonds}</div>
  );
}

function mapDispatchToProps(dispatch) {
  return {setSelectedFund: (item) => dispatch(Actions.setSelectedFund(item))};
}

const mapStateToProps = (state) => {
  return {list: state.list};
};

export default connect(mapStateToProps, mapDispatchToProps)(FondListView);