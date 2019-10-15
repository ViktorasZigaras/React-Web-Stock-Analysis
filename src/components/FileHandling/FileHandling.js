import React, {PureComponent} from 'react';
import {Col, Row, Button} from 'reactstrap';
import './fileHandling.scss';
import {setList, setSelectedFund} from '../../actions/index.js';
import {connect} from "react-redux";
import onUploadFile from './onUploadFile.js';
import onSaveList from './onSaveList.js';

class FileHandlingView extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {file: ''};
  }

  render() {
    return (
      <Col>
        <Row>
          <input type="file" id="open" onChange={(event) => onUploadFile(event, this)} />
          <label htmlFor="open" className="open-button">Upload file</label>
          <Button color="primary" className="save-button" onClick={() => onSaveList(this)}>Save list</Button>
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

const FileHandling = connect(mapStateToProps, mapDispatchToProps)(FileHandlingView);
export default FileHandling;