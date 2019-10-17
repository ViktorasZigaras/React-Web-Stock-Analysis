export default function onUploadFile(parent) {
  if (parent.state.file && parent.props.list) {
    let data = '';
    let entry;
    let item;
    //for each + for each is also possible here but gives same result
    for (let i = 0; i < parent.props.list.length; i++) {
      entry = parent.props.list[i];
      if (entry.entries) {
        for (let j = 0; j < entry.entries.length; j++) {
          item = entry.entries[j];
          data += entry.fundName + ',' + entry.fundId + ',' + 
            item.date + ',' + item.cost + ',' + item.quantity + ',' + item.tax + ';\r\n';
        }
      }
    }
    require('downloadjs')(data, parent.state.file.name, 'text/plain');
  }
  else {alert('No file was loaded, saving is not permitted.');}
}