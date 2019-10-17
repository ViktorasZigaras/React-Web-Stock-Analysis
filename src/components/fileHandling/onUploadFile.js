import Numeric from '../../helpers';
import cloneDeep from 'lodash/cloneDeep';

export default function onUploadFile(event, parent) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(){ 
    let result = reader.result;
    let index = result.indexOf(';');
    let chunk;
    let fields;
    let item;
    let createNew;
    let fundsGlobal = [];
    /*const iterate = (element) => {
      if (element.fundName === item.fundName && element.fundId === item.fundId) {
        element.cost = Numeric.addNumbers(element.cost, item.cost);
        element.quantity = Numeric.addNumbers(element.quantity, item.quantity, 4);
        element.tax = Numeric.addNumbers(element.tax, item.tax);
        element.value = Numeric.substractNumbers(element.cost, element.tax);
        createNew = false;
        element.entries.push(item);
      }
      else {
        createNew = true;
        return;
      }
    }*/
    while (index !== -1) {
      chunk = result.substring(0, index);
      fields = chunk.split(',');
      item = {
        fundName: fields[0],
        fundId: fields[1], 
        date: fields[2], 
        cost: Numeric.convertNumbers(fields[3]),
        quantity: Numeric.convertNumbers(fields[4], 4),
        tax: Numeric.convertNumbers(fields[5])
      };
      item.value = Numeric.substractNumbers(item.cost, item.tax);
      if (fundsGlobal.length > 0) item.fundName = item.fundName.substring(2);
      item.entries = [cloneDeep(item)];
      if (fundsGlobal.length > 0) {
        fundsGlobal.forEach((element) => {
          //iterate(element);
          if (element.fundName === item.fundName && element.fundId === item.fundId) {
            element.cost = Numeric.addNumbers(element.cost, item.cost);
            element.quantity = Numeric.addNumbers(element.quantity, item.quantity, 4);
            element.tax = Numeric.addNumbers(element.tax, item.tax);
            element.value = Numeric.substractNumbers(element.cost, element.tax);
            createNew = false;
            element.entries.push(item);
          }
          else {
            createNew = true;
            return;
          }
        });
        if (createNew) fundsGlobal.push(item);
      }
      else fundsGlobal.push(item);
      result = result.substring(index + 1);
      index = result.indexOf(';');
    }
    parent.props.setList(fundsGlobal.sort((a, b) => (a.fundName > b.fundName) ? 1 : -1));
    parent.props.setSelectedFund(null);
  }
  reader.readAsText(file);
  parent.setState({file: file});
}