import React, { PureComponent } from 'react';
import './Controls.css';
import { Input, Button, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Controls extends PureComponent {

  constructor(props) {

    super(props);
    this.state = {
        fundName: '',
        fundId: '',
        itemDate: '',
        itemAmount: '',
        itemQuantity: '',
        itemTax: ''
    };
    
  }

  onNameChangedHandler (event) {
    this.setState({fundName: event.target.value});
  }

  onIdChangedHandler (event) {
    this.setState({fundId: event.target.value});
  }

  onDateChangedHandler (event) {
    this.setState({itemDate: event.target.value});
  }

  onAmountChangedHandler (event) {
    this.setState({itemAmount: event.target.value});
  }

  onQuantityChangedHandler (event) {
    this.setState({itemQuantity: event.target.value});
  }

  onTaxChangedHandler (event) {
    this.setState({itemTax: event.target.value});
  }

  onCreateFund () {

    const funds = [...this.props.setList];
    let matchFound = false;

    funds.forEach((fund) => { 
      if (fund.fundName === this.state.fundName || fund.fundId === this.state.fundId) {
        matchFound = true;
        console.warn('Duplicate fund found.');
        alert('Duplicate fund found. Change either name or ID or both.');
        return;
      }
    });

    if (!matchFound) {
      let newFund = {};
      newFund.fundName = this.state.fundName;
      newFund.fundId = this.state.fundId;
      
      funds.push(newFund);

      //console.log(newFund.fundName + ' ' + newFund.fundId);
      this.props.callbackFromParent(funds);
    }
    
  }

  onUpdateFund () {
    this.props.updateFund(this.state.fundName, this.state.fundId);
  }

  onDeleteFund () {
    const funds = [...this.props.setList];

    for (let i = 0; i < funds.length; i++) {
      if (funds[i].fundName === this.state.fundName && funds[i].fundId === this.state.fundId) {
        //console.log(funds[i].fundName + ' ' + funds[i].fundId);
        funds.splice(i, 1);
        
        //return;
      }
    }
    //console.log(funds.length);
    this.props.callbackFromParent(funds);
    this.props.clearLists();
  }

  /**/

  onCreateItem () {
    //
    const list = {...this.props.selectedFond};

    let item = {};
    item.date = this.state.itemDate;
    item.cost = this.state.itemAmount;
    item.quantity = this.state.itemQuantity;
    item.tax = this.state.itemTax;
    item.value = Number(item.cost - item.tax).toFixed(2);
    
    list.cost = Number(Number(list.cost) + Number(item.cost)).toFixed(2);
    list.quantity = Number(Number(list.quantity) + Number(item.quantity)).toFixed(4);
    list.tax = Number(Number(list.tax) + Number(item.tax)).toFixed(2);
    list.value = Number(Number(list.value) + Number(item.value)).toFixed(2);

    list.totalValue = Number(list.quantity * list.shareValue).toFixed(2);
    list.valueChange = Number(list.totalValue - list.value).toFixed(2);
    list.valuePercentChange = Number((list.valueChange/list.value) * 100).toFixed(2);
      
    list.entries.push(item);

    list.entries.sort((a, b) => (a['date'] > b['date']) ? 1 : -1);

    this.props.selectedUpdated(list);
  }

  onUpdateItem () {
    //
  }

  onDeleteItem () {
    //selectedEntry
    const list = {...this.props.selectedFond};

    const funds = list.entries;

    for (let i = 0; i < funds.length; i++) {
      if (funds[i].fundName === this.state.fundName && funds[i].fundId === this.state.fundId) {
        //console.log(funds[i].fundName + ' ' + funds[i].fundId);
        funds.splice(i, 1);
        
        //return;
      }
    }

    let item = {};
    item.date = this.state.itemDate;
    item.cost = this.state.itemAmount;
    item.quantity = this.state.itemQuantity;
    item.tax = this.state.itemTax;
    item.value = Number(item.cost - item.tax).toFixed(2);
    
    list.cost = Number(list.cost - item.cost).toFixed(2);
    list.quantity = Number(list.quantity - item.quantity).toFixed(4);
    list.tax = Number(list.tax - item.tax).toFixed(2);
    list.value = Number(list.value - item.value).toFixed(2);

    list.totalValue = Number(list.quantity * list.shareValue).toFixed(2);
    list.valueChange = Number(list.totalValue - list.value).toFixed(2);
    list.valuePercentChange = Number((list.valueChange/list.value) * 100).toFixed(2);

    this.props.selectedUpdated(list);
  }

  render() {
    //this.refs.name.getInputNode().value = fondName;

    return (
      <div className="control-section">
        
        <Input 
          value={this.state.fundName} 
          onChange={this.onNameChangedHandler.bind(this)} 
          className="spacing"
          placeholder="Fund Name"/>
        <Input 
          value={this.state.fundId} 
          onChange={this.onIdChangedHandler.bind(this)} 
          className="spacing"
          placeholder="Fund ID"/>

        <Row className="left">
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
          onChange={this.onDateChangedHandler.bind(this)} 
          className="spacing"
          placeholder="Item Date"/>
        <Input 
          value={this.state.itemAmount} 
          onChange={this.onAmountChangedHandler.bind(this)} 
          className="spacing"
          placeholder="Item Amount"/>
        <Input 
          value={this.state.itemQuantity} 
          onChange={this.onQuantityChangedHandler.bind(this)} 
          className="spacing"
          placeholder="Item Quantity"/>
        <Input 
          value={this.state.itemTax} 
          onChange={this.onTaxChangedHandler.bind(this)} 
          className="spacing"
          placeholder="Item Tax"/>

        <Row className="left">
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