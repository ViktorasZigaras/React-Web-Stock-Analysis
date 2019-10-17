export default function onUpdateFund(props) {
  if (props.selectedFund) {
    const list = [...props.list];
    const selectedFund = {...props.selectedFund};
    const fund = list.find((obj) => 
      obj.fundName === selectedFund.fundName 
      && obj.fundId === selectedFund.fundId
    );
    fund.fundName = selectedFund.fundName = props.fundName;
    fund.fundId = selectedFund.fundId = props.fundId;
    props.setSelectedFund(selectedFund);
    props.setList(list.sort((a, b) => (a.fundName > b.fundName) ? 1 : -1));
  }
  else alert('No Fund is selected, please do that first.');
}