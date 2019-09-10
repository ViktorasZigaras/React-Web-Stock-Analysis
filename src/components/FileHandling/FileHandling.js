import React, { PureComponent } from 'react';
import { /*Col, */Row, Button } from 'reactstrap';
import './FileHandling.css';
import cloneDeep from 'lodash/cloneDeep';
import 'bootstrap/dist/css/bootstrap.min.css';

class FileHandling extends PureComponent {

  constructor(props) {

    super(props)
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {file: '', list: []};

  }
    
  uploadFile (event) {
  
    const file = event.target.files[0];
    console.log(file);
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
          element.cost = Number(element.cost) + Number(item.cost);
          element.quantity = Number(element.quantity) + Number(item.quantity);
          element.tax = Number(element.tax) + Number(item.tax);

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
          item.fundName = fields[0].substring(2);//remove end of lines
        }
        else {
          item.fundName = fields[0];
        }
        
        item.fundId = fields[1]/*.substring(1)*/;
        item.date = fields[2];
        item.cost = fields[3];
        item.quantity = fields[4];
        item.tax = fields[5];
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
      this.setState({list: fundsGlobal});

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

      for (let i = 0; i < this.state.list.length; i++) {

        entry = this.state.list[i];

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