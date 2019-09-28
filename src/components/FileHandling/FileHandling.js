import React, { PureComponent } from 'react';
import { Col, Row, Button } from 'reactstrap';
import './FileHandling.css';
import cloneDeep from 'lodash/cloneDeep';
import {
  substractNumbers, 
  addNumbers, 
  convertNumbers} from '../../Helpers/NumericHelper.js';

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
          element.cost = addNumbers(element.cost, item.cost, 2);
          element.quantity = addNumbers(element.quantity, item.quantity, 4);
          element.tax = addNumbers(element.tax, item.tax, 2);
          element.value = substractNumbers(element.cost, element.tax, 2);
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
        item = {
          fundName: fields[0],
          fundId: fields[1], 
          date: fields[2], 
          cost: convertNumbers(fields[3], 2),
          quantity: convertNumbers(fields[4], 4),
          tax: convertNumbers(fields[5], 2)
        };
        item.value = substractNumbers(item.cost, item.tax, 2);
        if (fundsGlobal.length > 0) {item.fundName = item.fundName.substring(2);}
        item.entries = [cloneDeep(item)];
        if (fundsGlobal.length > 0) {
          fundsGlobal.forEach((element) => {iterate(element);});
          if (createNew) {fundsGlobal.push(item);}
        }
        else {fundsGlobal.push(item);}
        result = result.substring(index + 1);
        index = result.indexOf(';');
      }
      this.props.callbackFromParent(fundsGlobal);
      this.props.clearLists();
    }.bind(this);
    reader.readAsText(file);
    this.setState({file: file});
  }
  
  onSaveList () {
    if (this.state.file && this.props.setList) {
      let data = '';
      let entry;
      let item;
      for (let i = 0; i < this.props.setList.length; i++) {
        entry = this.props.setList[i];
        if (entry.entries) {
          for (let j = 0; j < entry.entries.length; j++) {
            item = entry.entries[j];
            data += 
              entry.fundName + ',' + 
              entry.fundId + ',' + 
              item.date + ',' + 
              item.cost + ',' + 
              item.quantity + ',' + 
              item.tax + ';\r\n'
            ;
          }
        }
      }
      require("downloadjs")(data, this.state.file.name, 'text/plain');
    }
    else {alert('No file was loaded, saving is not permitted.');}
  }

  render() {
    return (
      <Col>
        <Row>
          <input type="file" id="open" onChange={this.uploadFile} />
          <label htmlFor="open" className="open-button">Upload file</label>
          <Button color="primary" className="save-button" onClick={()=>this.onSaveList()}>Save list</Button>
        </Row>
      </Col>
    );
  }
}

export default FileHandling;