import * as Helpers from './controlsHelpers';
import Numeric from '../../helpers';

export default function onDeleteItem(props) {
  if (props.selectedItem) {
    let selectedFund = {...props.selectedFund};
    const entries = selectedFund.entries;
    let item;
    for (let i = 0; i < entries.length; i++) {
      item = entries[i];
      if (
        item.date === props.itemDate 
        && item.cost === props.itemAmount 
        && item.quantity === props.itemQuantity 
        && item.tax === props.itemTax
      ) {
        selectedFund.cost = Numeric.substractNumbers(selectedFund.cost, item.cost);
        selectedFund.quantity = Numeric.substractNumbers(selectedFund.quantity, item.quantity, 4);
        selectedFund.tax = Numeric.substractNumbers(selectedFund.tax, item.tax);
        selectedFund.value = Numeric.substractNumbers(selectedFund.value, item.value);
        Helpers.recalculateList(selectedFund);
        entries.splice(i, 1);
        Helpers.updateLists(selectedFund, props);
        return;
      }
    }  
  }
  else alert('No Purchase is selected, please do that first.');
}