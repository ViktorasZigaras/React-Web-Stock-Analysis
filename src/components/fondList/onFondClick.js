import axios from 'axios';
import location from '../../config.js';
import * as Numeric from '../../helpers/numericHelper.js';

export default function onFondClickHandler(fond, props) {
  if (fond.shareValue) {
    props.setSelectedFund(fond);
    return;
  }
  const newDate = new Date()
  const date = newDate.getDate();
  let prevDate = date;
  const month = newDate.getMonth() + 1;
  let prevMonth = month - 1;
  const year = newDate.getFullYear();
  let prevYear = year;
  if (prevDate > 30) {
    prevDate = 30;
    if (prevMonth === 2) {prevDate = 28;}
  }
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear = prevYear - 1;
  }
  const url = 
    location + 'http://luminor-funds.metasite.lt/funds/funds/getJson/' +
    prevYear + '-' + prevMonth + '-' + date + '/' + year + '-' + month + '-' + date + '/fund_' + fond.fundId;
  //console.log(url);
  axios.get(url)
  .then((res) => {
    const data = res.data.funds[fond.fundId].day;
    const value = data[data.length-1].price;
    fond.shareValue = Numeric.convertNumbers(value);
    fond.totalValue = Numeric.multiplyNumbers(fond.quantity, fond.shareValue);
    fond.valueChange = Numeric.substractNumbers(fond.totalValue, fond.value);
    fond.valuePercentChange = Numeric.percentDivisionNumbers(fond.valueChange, fond.value);
    props.setSelectedFund({...fond});
  })
  .catch((error) => {
    console.error('Error: ' + error);
    alert('Wrong ID number! Please find correct one and change to it.');
    props.setSelectedFund({...fond});
  });
}