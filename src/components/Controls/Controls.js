import React, { PureComponent } from 'react';
import './Controls.css';
import { Input, Button, Row } from 'reactstrap';
import {
  substractNumbers, 
  addNumbers, 
  multiplyNumbers,
  removeAndAddNumbers,
  percentDivisionNumbers} from '../../Helpers/NumericHelper.js';

class Controls extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {fundName: '', fundId: '', itemDate: '', itemAmount: '', itemQuantity: '', itemTax: ''};
  }

  onChangedHandler(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  onCreateFund() {
    const funds = [...this.props.setList];
    if (funds.find(obj => obj.fundName === this.state.fundName && obj.fundId === this.state.fundId)) {
      alert('Duplicate fund found. Change either name or ID or both.');
    }
    else {
      funds.push({fundName: this.state.fundName, fundId: this.state.fundId, entries: []});
      this.props.callbackFromParent(funds);
    }
  }

  onUpdateFund() {
    if (this.props.selectedFond) {this.props.updateFund(this.state.fundName, this.state.fundId);}
    else {alert('No Fund is selected, please do that first.');}
  }

  onDeleteFund() {
    if (this.props.selectedFond) {
      const funds = [...this.props.setList];
      let fund;
      for (let i = 0; i < funds.length; i++) {
        fund = funds[i];
        if (fund.fundName === this.state.fundName && fund.fundId === this.state.fundId) {
          funds.splice(i, 1);
          this.props.callbackFromParent(funds);
          this.props.clearLists();
          return;
        }
      }
    }
    else {alert('No Fund is selected, please do that first.');}
  }

  onCreateItem() {
    if (this.props.selectedFond) {
      let list = {...this.props.selectedFond};
      let item = this.setUpItem({});
      list.cost = addNumbers(list.cost, item.cost);
      list.quantity = addNumbers(list.quantity, item.quantity, 4);
      list.tax = addNumbers(list.tax, item.tax);
      list.value = addNumbers(list.value, item.value);
      this.recalculateList(list);
      list.entries.push(item);
      list.entries.sort((a, b) => (a['date'] > b['date']) ? 1 : -1);
      this.props.selectedUpdated(list);
    }
    else {alert('No Fund is selected, please do that first.');}
  }

  onUpdateItem() {
    if (this.props.selectedEntry) {
      let list = {...this.props.selectedFond};
      const funds = list.entries;
      let item = funds.find(obj => 
        obj.date === this.props.selectedEntry.date 
        && obj.cost === this.props.selectedEntry.cost 
        && obj.quantity === this.props.selectedEntry.quantity 
        && obj.tax === this.props.selectedEntry.tax);
      if (item) {
        let value = this.state.itemAmount - this.state.itemTax;
        list.cost = removeAndAddNumbers(list.cost, item.cost, this.state.itemAmount);
        list.quantity = removeAndAddNumbers(list.quantity, item.quantity, this.state.itemQuantity, 4);
        list.tax = removeAndAddNumbers(list.tax, item.tax, this.state.itemTax);
        list.value = removeAndAddNumbers(list.value, item.value, value);
        this.setUpItem(item);
        this.recalculateList(list);
        this.props.selectedUpdated(list);
      }
    }
    else {alert('No Purchase is selected, please do that first.');}
  }

  onDeleteItem() {
    if (this.props.selectedEntry) {
      let list = {...this.props.selectedFond};
      const funds = list.entries;
      let item;
      for (let i = 0; i < funds.length; i++) {
        item = funds[i];
        if (item.date === this.state.itemDate 
          && item.cost === this.state.itemAmount 
          && item.quantity === this.state.itemQuantity 
          && item.tax === this.state.itemTax) 
        {
          list.cost = substractNumbers(list.cost, item.cost);
          list.quantity = substractNumbers(list.quantity, item.quantity, 4);
          list.tax = substractNumbers(list.tax, item.tax);
          list.value = substractNumbers(list.value, item.value);
          this.recalculateList(list);
          funds.splice(i, 1);
          this.props.selectedUpdated(list);
          return;
        }
      }  
    }
    else {alert('No Purchase is selected, please do that first.');}   
  }

  setUpItem(item) {
    item.date = this.state.itemDate;
    item.cost = this.state.itemAmount;
    item.quantity = this.state.itemQuantity;
    item.tax = this.state.itemTax;
    item.value = substractNumbers(item.cost, item.tax);
    return item;
  }

  recalculateList(list) {
    list.totalValue = multiplyNumbers(list.quantity, list.shareValue);
    list.valueChange = substractNumbers(list.totalValue, list.value);
    list.valuePercentChange = percentDivisionNumbers(list.valueChange, list.value);
    //return list;
  }

  render() {
    return (
      <div className="control-section">
        <Input 
          value={this.state.fundName} 
          onChange={this.onChangedHandler.bind(this)} 
          className="spacing"
          id="fundName"
          placeholder="Fund Name"/>
        <Input 
          value={this.state.fundId} 
          onChange={this.onChangedHandler.bind(this)} 
          className="spacing"
          id="fundId"
          placeholder="Fund ID"/>
        <Row>
          <Button 
            color="primary" 
            className="spacing right" 
            onClick={()=>this.onCreateFund()}>Create Fund</Button>
          <Button 
            color="primary" 
            className="spacing" 
            onClick={()=>this.onUpdateFund()}>Update Fund</Button>
        </Row>
        <Button 
          color="primary" 
          className="spacing" 
          onClick={()=>this.onDeleteFund()}>Delete Fund</Button>
        <Input 
          value={this.state.itemDate} 
          onChange={this.onChangedHandler.bind(this)} 
          className="spacing"
          id="itemDate"
          placeholder="Item Date"/>
        <Input 
          value={this.state.itemAmount} 
          onChange={this.onChangedHandler.bind(this)} 
          className="spacing"
          id="itemAmount"
          placeholder="Item Amount"/>
        <Input 
          value={this.state.itemQuantity} 
          onChange={this.onChangedHandler.bind(this)} 
          className="spacing"
          id="itemQuantity"
          placeholder="Item Quantity"/>
        <Input 
          value={this.state.itemTax} 
          onChange={this.onChangedHandler.bind(this)} 
          className="spacing"
          id="itemTax"
          placeholder="Item Tax"/>
        <Row>
          <Button 
            color="primary" 
            className="spacing right" 
            onClick={()=>this.onCreateItem()}>Create Item</Button>
          <Button 
            color="primary" 
            className="spacing" 
            onClick={()=>this.onUpdateItem()}>Update Item</Button>
        </Row>
        <Button 
          color="primary" 
          className="spacing" 
          onClick={()=>this.onDeleteItem()}>Delete Item</Button>
      </div>
    );
  }
}

export default Controls;