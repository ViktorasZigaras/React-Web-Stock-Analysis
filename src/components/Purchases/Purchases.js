import React, {PureComponent} from 'react';
import './purchases.scss';
import {setSelectedItem} from '../../actions/index.js';
import {connect} from "react-redux";
import * as Numeric from '../../helpers/numericHelper.js';
import onClickSort from './onClickSort.js';

class PurchasesView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {sortDirection: 'asc', lastSortColumn: ''};
  };

  render() {
    const purchases = [];
    if (this.props.selectedFund) {
      const fond = {...this.props.selectedFund};
      const currency = 'EUR'; //&nbsp;
      purchases.push(
      <div key='header' className="row-mix">
        <div className="cell-mix cell-mix-header" 
          onClick={()=>onClickSort('date', this)}>
          Date</div>
        <div className="cell-mix cell-mix-header" 
          onClick={()=>onClickSort('cost', this)}>
          Amount ({currency})</div>
        <div className="cell-mix cell-mix-header" 
          onClick={()=>onClickSort('quantity', this)}>
          Quantity</div>
        <div className="cell-mix cell-mix-header" 
          onClick={()=>onClickSort('tax', this)}>
          Tax ({currency})</div>
        <div className="cell-mix cell-mix-header" 
          onClick={()=>onClickSort('value', this)}>
          Value ({currency})</div>
        <div className="cell-mix cell-mix-header" 
          onClick={()=>onClickSort('totalValue', this)}>
          Total Value</div>
        <div className="cell-mix cell-mix-header" 
          onClick={()=>onClickSort('valueChange', this)}>
          Value Change</div>
        <div className="cell-mix cell-mix-header" 
          onClick={()=>onClickSort('valuePercentChange', this)}>
          Percent Change</div>
      </div>);

      if (fond.entries) {
        let changeTrajectory;
        let i = 0;
        fond.entries.forEach((entry) => { 
          i++;
          entry.totalValue = Numeric.multiplyNumbers(entry.quantity, fond.shareValue);
          entry.valueChange = Numeric.substractNumbers(entry.totalValue, entry.value);
          entry.valuePercentChange = Numeric.percentDivisionNumbers(entry.valueChange, entry.value);
          if (entry.value < 0) {entry.valuePercentChange *= -1;}
          changeTrajectory = '';
          if (entry.valueChange > 0) {changeTrajectory = '+';}
          purchases.push(
            <div key={i} className="row-mix" onClick={() => this.props.setSelectedItem(entry)}>
              <div className="cell-mix">{entry.date}</div>
              <div className="cell-mix">{entry.cost}</div>
              <div className="cell-mix">x{entry.quantity}</div>
              <div className="cell-mix">{entry.tax}</div>
              <div className="cell-mix">{entry.value}</div>
              <div className="cell-mix">{entry.totalValue}</div>
              <div className="cell-mix" 
                style={entry.valueChange > 0 ? {color:'green'}: {color:'red'}}>
                {changeTrajectory}{entry.valueChange}</div>
              <div className="cell-mix" 
                style={entry.valuePercentChange > 0 ? {color:'green'}: {color:'red'}}>
                {changeTrajectory}{entry.valuePercentChange}%</div>
            </div>
          );
        });
      }//https://reactstrap.github.io/components/tables/
    }
      
    return (
      <div className="purchase-display-section">
        <div className="table-mix">{purchases}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {setSelectedItem: item => dispatch(setSelectedItem(item))};
}

const mapStateToProps = state => {
  return {selectedFund: state.selectedFund};
};

const Purchases = connect(mapStateToProps, mapDispatchToProps)(PurchasesView);
export default Purchases;