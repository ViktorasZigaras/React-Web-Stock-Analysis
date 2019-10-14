import * as Numeric from '../../helpers/numericHelper.js';

export function updateLists(selectedFund, props) {
  props.setSelectedFund(selectedFund);
  const list = [...props.list];
  Object.assign(
    list.find(obj => obj.fundName === selectedFund.fundName && obj.fundId === selectedFund.fundId), 
    selectedFund);
  props.setList(list);
}

export function setUpItem(item, props) {
  item.date = props.itemDate;
  item.cost = props.itemAmount;
  item.quantity = props.itemQuantity;
  item.tax = props.itemTax;
  item.value = Numeric.substractNumbers(item.cost, item.tax);
  return item;
}

export function recalculateList(list) {
  list.totalValue = Numeric.multiplyNumbers(list.quantity, list.shareValue);
  list.valueChange = Numeric.substractNumbers(list.totalValue, list.value);
  list.valuePercentChange = Numeric.percentDivisionNumbers(list.valueChange, list.value);
  //return list;
}