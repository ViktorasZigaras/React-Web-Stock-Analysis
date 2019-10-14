import * as Helpers from './controlsHelpers.js';
import * as Numeric from '../../helpers/numericHelper.js';

export default function onCreateItem(props) {
  if (props.selectedItem) {
    let selectedFund = {...props.selectedFund};
    const entries = selectedFund.entries;
    let item = entries.find(obj => 
      obj.date === props.selectedItem.date
      && obj.cost === props.selectedItem.cost
      && obj.quantity === props.selectedItem.quantity
      && obj.tax === props.selectedItem.tax);
    if (item) {
      let value = props.itemAmount - props.itemTax;
      selectedFund.cost = Numeric.removeAndAddNumbers(selectedFund.cost, item.cost, props.itemAmount);
      selectedFund.quantity = Numeric.removeAndAddNumbers(selectedFund.quantity, item.quantity, props.itemQuantity, 4);
      selectedFund.tax = Numeric.removeAndAddNumbers(selectedFund.tax, item.tax, props.itemTax);
      selectedFund.value = Numeric.removeAndAddNumbers(selectedFund.value, item.value, value);
      Helpers.setUpItem(item, props);
      Helpers.recalculateList(selectedFund);
      Helpers.updateLists(selectedFund, props);
    }
  }
  else {alert('No Purchase is selected, please do that first.');}
}