import * as Helpers from './controlsHelpers';
import Numeric from '../../helpers';

export default function onCreateItem(props) {
  if (props.selectedFund) {
    let selectedFund = {...props.selectedFund};
    let item = Helpers.setUpItem({}, props);
    selectedFund.cost = Numeric.addNumbers(selectedFund.cost, item.cost);
    selectedFund.quantity = Numeric.addNumbers(selectedFund.quantity, item.quantity, 4);
    selectedFund.tax = Numeric.addNumbers(selectedFund.tax, item.tax);
    selectedFund.value = Numeric.addNumbers(selectedFund.value, item.value);
    Helpers.recalculateList(selectedFund);
    selectedFund.entries.push(item);
    selectedFund.entries.sort((a, b) => (a['date'] > b['date']) ? 1 : -1);
    Helpers.updateLists(selectedFund, props);
  }
  else alert('No Fund is selected, please do that first.');
}