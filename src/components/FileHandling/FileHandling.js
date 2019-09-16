import React, { PureComponent } from 'react';
import { /*Col, */Row, Button } from 'reactstrap';
import './FileHandling.css';
import cloneDeep from 'lodash/cloneDeep';
import 'bootstrap/dist/css/bootstrap.min.css';

class FileHandling extends PureComponent {

  constructor(props) {

    super(props)
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {file: ''};

  }
    
  uploadFile (event) {
  
    const file = event.target.files[0];
    //console.log(file);
    const reader = new FileReader();

    reader.onload = function(){
        
      let result = reader.result;
      let index = result.indexOf(";");
      let chunk;
      let fields;
      let item;
      let createNew;
      let fundsGlobal = [];

      const iterate = function(element) {
        
        if (element.fundName === item.fundName && element.fundId === item.fundId) {
          element.cost = Number(Number(element.cost) + Number(item.cost)).toFixed(2);
          element.quantity = Number(Number(element.quantity) + Number(item.quantity)).toFixed(4);
          element.tax = Number(Number(element.tax) + Number(item.tax)).toFixed(2);
          element.value = Number(element.cost - element.tax).toFixed(2);

          createNew = false;
          
          element.entries.push(item);
        }
        else {
          createNew = true;
          return;
        }
        
      }
  
      while (index !== -1) {
        chunk = result.substring(0, index);
        fields = chunk.split(',');
  
        item = {};

        if (fundsGlobal.length > 0) {
          item.fundName = fields[0].substring(2);
        }
        else {
          item.fundName = fields[0];
        }
        
        item.fundId = fields[1]/*.substring(1)*/;
        item.date = fields[2];
        item.cost = Number(fields[3]).toFixed(2);
        item.quantity = Number(fields[4]).toFixed(4);
        item.tax = Number(fields[5]).toFixed(2);
        item.value = Number(item.cost - item.tax).toFixed(2);
        item.entries = [cloneDeep(item)];
  
        //
  
        if (fundsGlobal.length > 0) {
          fundsGlobal.forEach(element => {
            iterate(element);
          });
          if (createNew) {
            fundsGlobal.push(item);
          }
        }
        else {
          fundsGlobal.push(item);
        }
  
        result = result.substring(index + 1);
        index = result.indexOf(';');
      }
  
      //console.log('aaa');
      this.props.callbackFromParent(fundsGlobal);

      //

      //

    }.bind(this);
  
    reader.readAsText(file);

    this.setState({file: file});
  
  }
  
  onSaveList () {
    
    if (this.state.file) {
      
      let data = '';
      let entry;
      let item;

      for (let i = 0; i < this.props.setList.length; i++) {

        entry = this.props.setList[i];

        for (let j = 0; j < entry.entries.length; j++) {

          item = entry.entries[j];

          data += item.fundName + ',' + item.fundId + ',' + item.date + ','
          + item.cost + ',' + item.quantity + ',' + item.tax + ';\r\n';

        }
        
      }

      require("downloadjs")(data, this.state.file.name, 'text/plain');

    }
    
  }

  render() {
    return (
      <Row>
        <input type="file" id="open" onChange={this.uploadFile} />
        <label htmlFor="open" className="open-button">Upload file</label>
        <Button color="primary" className="save-button" onClick={()=>this.onSaveList()}>Save list</Button>
      </Row>
    );
  }

}

export default FileHandling;