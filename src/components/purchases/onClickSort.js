//imports

export default function onFondClickHandler(field, parent) {
  let sortDirection = 'asc';
  let direction = 1;
  if (parent.state.lastSortColumn === field && parent.state.sortDirection === 'asc') {
    sortDirection = 'desc';
    direction = -1;
  }
  if (field === 'date') {parent.props.selectedFund.entries.sort(
    (a, b) => (a[field] > b[field]) ? direction : -direction);
  }
  else {parent.props.selectedFund.entries.sort(
    (a, b) => (Number(a[field]) > Number(b[field])) ? direction : -direction);
  }
  parent.setState({lastSortColumn: field, sortDirection: sortDirection});
}