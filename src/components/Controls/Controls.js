import React from 'react';
import { Input, Button, Row } from 'reactstrap';
import { connect } from 'react-redux';
import './controls.scss';
import onCreateFund from './onCreateFund';
import onUpdateFund from './onUpdateFund';
import onDeleteFund from './onDeleteFund';
import onCreateItem from './onCreateItem';
import onUpdateItem from './onUpdateItem';
import onDeleteItem from './onDeleteItem';
import Actions from '../../redux/actions';

function ControlsView(props) {
  const onChangedHandler = (event) => {props[event.target.id](event.target.value);}
  return (
    <div className="control-section">
      <Input 
        value={props.fundName}
        onChange={onChangedHandler} 
        className="spacing"
        id="setFundName"
        placeholder="Fund Name" />
      <Input 
        value={props.fundId}
        onChange={onChangedHandler} 
        className="spacing"
        id="setFundId"
        placeholder="Fund ID" />
      <Row>
        <Button 
          color="primary" 
          className="spacing right" 
          onClick={() => onCreateFund(props)}>Create Fund</Button>
        <Button 
          color="primary" 
          className="spacing" 
          onClick={() => onUpdateFund(props)}>Update Fund</Button>
      </Row>
      <Button 
        color="primary" 
        className="spacing" 
        onClick={() => onDeleteFund(props)}>Delete Fund</Button>
      <Input 
        value={props.itemDate}
        onChange={onChangedHandler} 
        className="spacing"
        id="setItemDate"
        placeholder="Item Date" />
      <Input 
        value={props.itemAmount}
        onChange={onChangedHandler} 
        className="spacing"
        id="setItemAmount"
        placeholder="Item Amount" />
      <Input 
        value={props.itemQuantity}
        onChange={onChangedHandler} 
        className="spacing"
        id="setItemQuantity"
        placeholder="Item Quantity" />
      <Input 
        value={props.itemTax}
        onChange={onChangedHandler} 
        className="spacing"
        id="setItemTax"
        placeholder="Item Tax" />
      <Row>
        <Button 
          color="primary" 
          className="spacing right" 
          onClick={() => onCreateItem(props)}>Create Item</Button>
        <Button 
          color="primary" 
          className="spacing" 
          onClick={() => onUpdateItem(props)}>Update Item</Button>
      </Row>
      <Button 
        color="primary" 
        className="spacing" 
        onClick={() => onDeleteItem(props)}>Delete Item</Button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setFundName: (item) => dispatch(Actions.setFundName(item)),
    setFundId: (item) => dispatch(Actions.setFundId(item)),
    setItemDate: (item) => dispatch(Actions.setItemDate(item)),
    setItemAmount: (item) => dispatch(Actions.setItemAmount(item)),
    setItemQuantity: (item) => dispatch(Actions.setItemQuantity(item)),
    setItemTax: (item) => dispatch(Actions.setItemTax(item)),
    setList: (item) => dispatch(Actions.setList(item)),
    setSelectedFund: (item) => dispatch(Actions.setSelectedFund(item))
  };
}

const mapStateToProps = (state) => {
  return {
    fundName: state.fundName,
    fundId: state.fundId,
    itemDate: state.itemDate,
    itemAmount: state.itemAmount,
    itemQuantity: state.itemQuantity,
    itemTax: state.itemTax,
    list: state.list,
    selectedFund: state.selectedFund,
    selectedItem: state.selectedItem
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlsView);