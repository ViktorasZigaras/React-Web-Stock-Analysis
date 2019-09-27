import React, { PureComponent } from 'react';
//import { /*Col, */Row } from 'reactstrap';
import './Purchases.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Purchases extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortDirection: 'asc', 
      lastSortColumn: ''
    }
  };

  onClickPurchase(purchase) {
    this.props.selectedItem(purchase);
  }

  onClickSort(field) {
    let sortDirection = 'asc';
    let direction = 1;
    if (this.state.lastSortColumn === field && this.state.sortDirection === 'asc') {
      sortDirection = 'desc';
      direction = -1;
    }

    if (field === 'date') {
      this.props.selectedFond.entries.sort((a, b) => (a[field] > b[field]) ? direction : -direction);
    }
    else {
      this.props.selectedFond.entries.sort((a, b) => (Number(a[field]) > Number(b[field])) ? direction : -direction);
    }

    this.setState({lastSortColumn: field});
    this.setState({sortDirection: sortDirection});
  }

  render() {
    const purchases = [];

    if (this.props.selectedFond) {
      const fond = {...this.props.selectedFond};
      const currency = 'EUR'; //&nbsp;

      purchases.push(
      <div key='header' className="row-mix">
        <div className="cell-mix cell-mix-header" onClick={()=>this.onClickSort('date')}>
          Date
        </div>
        <div className="cell-mix cell-mix-header" onClick={()=>this.onClickSort('cost')}>
          Amount ({currency})
        </div>
        <div className="cell-mix cell-mix-header" onClick={()=>this.onClickSort('quantity')}>
          Quantity
        </div>
        <div className="cell-mix cell-mix-header" onClick={()=>this.onClickSort('tax')}>
          Tax ({currency})
        </div>
        <div className="cell-mix cell-mix-header" onClick={()=>this.onClickSort('value')}>
          Value ({currency})
        </div>
        <div className="cell-mix cell-mix-header" onClick={()=>this.onClickSort('totalValue')}>
          Total Value
        </div>
        <div className="cell-mix cell-mix-header" onClick={()=>this.onClickSort('valueChange')}>
          Value Change
        </div>
        <div className="cell-mix cell-mix-header" onClick={()=>this.onClickSort('valuePercentChange')}>
          Percent Change
        </div>
      </div>);

      if (fond.entries) {
        let changeTrajectory = '';
        let i = 0;

        fond.entries.forEach((entry) => { 
          i++;
          entry.totalValue = Number(entry.quantity * fond.shareValue).toFixed(2);
          entry.valueChange = Number(entry.totalValue - entry.value).toFixed(2);
          entry.valuePercentChange = Number((entry.valueChange/entry.value) * 100).toFixed(2);
          
          if (entry.value < 0) {
            entry.valuePercentChange *= -1;
          }

          changeTrajectory = '';
          if (entry.valueChange > 0) {
            changeTrajectory = '+';
          }

          purchases.push(
          <div key={i} className="row-mix" onClick={()=>this.onClickPurchase(entry)}>
            <div className="cell-mix">
              {entry.date}
            </div>
            <div className="cell-mix">
              {entry.cost}
            </div>
            <div className="cell-mix">
              x{entry.quantity}
            </div>
            <div className="cell-mix">
              {entry.tax}
            </div>
            <div className="cell-mix">
              {entry.value}
            </div>
            <div className="cell-mix">
              {entry.totalValue}
            </div>
            <div className="cell-mix" style={entry.valueChange > 0 ? {color:'green'}: {color:'red'}}>
              {changeTrajectory}{entry.valueChange}
            </div>
            <div className="cell-mix" style={entry.valuePercentChange > 0 ? {color:'green'}: {color:'red'}}>
              {changeTrajectory}{entry.valuePercentChange}%
            </div>
          </div>);
            
        });
      }

      //https://reactstrap.github.io/components/tables/

    }
      
    return (
      <div className="purchase-display-section">
        <div className="table-mix">
          {purchases}
        </div>
      </div>
    );
  }
}

export default Purchases;