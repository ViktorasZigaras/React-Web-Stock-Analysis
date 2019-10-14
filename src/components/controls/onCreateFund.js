//import

export default function onCreateFund(props) {
  const list = [...props.list];
  if (list.find(obj => obj.fundName === props.fundName && obj.fundId === props.fundId)) {
    alert('Duplicate fund found. Change either name or ID or both.');
  }
  else {
    list.push({fundName: props.fundName, fundId: props.fundId, entries: []});
    props.setList(list.sort((a, b) => (a.fundName > b.fundName) ? 1 : -1));
  }
}