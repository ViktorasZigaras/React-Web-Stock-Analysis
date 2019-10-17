export default function onDeleteFund(props) {
  if (props.selectedFund) {
    const list = [...props.list];
    let fund;
    for (let i = 0; i < list.length; i++) {
      fund = list[i];
      if (
        fund.fundName === props.fundName 
        && fund.fundId === props.fundId
      ) {
        list.splice(i, 1);
        props.setList(list.sort((a, b) => (a.fundName > b.fundName) ? 1 : -1));
        props.setSelectedFund(null);
        return;
      }
    }
  }
  else alert('No Fund is selected, please do that first.');
}