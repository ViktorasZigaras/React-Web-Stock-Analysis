import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import './fileHandling.scss';
import Actions from '../../redux/actions';
import onUploadFile from './onUploadFile';
import onSaveList from './onSaveList';

class FileHandlingView extends PureComponent {
  constructor(props) {
    super(props);
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
    setList: (item) => dispatch(Actions.setList(item)),
    setSelectedFund: (item) => dispatch(Actions.setSelectedFund(item))
  };
}

const mapStateToProps = (state) => {
  return {list: state.list};
};

export default connect(mapStateToProps, mapDispatchToProps)(FileHandlingView);