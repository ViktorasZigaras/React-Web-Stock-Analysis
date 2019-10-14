import React, {PureComponent} from 'react';
import {Col, Row, Button} from 'reactstrap';
import './fileHandling.scss';
import cloneDeep from 'lodash/cloneDeep';
import {setList, setSelectedFund} from '../../actions/index.js';
import {connect} from "react-redux";
import * as Numeric from '../../helpers/numericHelper.js';

class FileHandlingClass extends PureComponent {
  constructor(props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {file: ''};
  }
    
  uploadFile (event) {
    const file = event.target.files[0];
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
      }
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
      this.props.setList(fundsGlobal.sort((a, b) => (a.fundName > b.fundName) ? 1 : -1));
      this.props.setSelectedFund(null);
    }.bind(this);
    reader.readAsText(file);
    this.setState({file: file});
  }

  onSaveList () {
    if (this.state.file && this.props.list) {
      let data = '';
      let entry;
      let item;
      for (let i = 0; i < this.props.list.length; i++) {
        entry = this.props.list[i];
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

function mapDispatchToProps(dispatch) {
  return {
    setList: item => dispatch(setList(item)),
    setSelectedFund: item => dispatch(setSelectedFund(item))
  };
}

const mapStateToProps = state => {
  return {list: state.list};
};

const FileHandling = connect(mapStateToProps, mapDispatchToProps)(FileHandlingClass);
export default FileHandling;