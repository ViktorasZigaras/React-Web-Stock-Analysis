import React, { PureComponent } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import FondList from '../src/components/FondList/FondList.js';
import FileHandling from '../src/components/FileHandling/FileHandling.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends PureComponent {

  constructor(props) {

    super(props);
    this.state = {list: []};

    this.fundsGlobalCallback = this.fundsGlobalCallback.bind(this);
    
  }

  fundsGlobalCallback (value) {
    this.setState({list: value});
    //console.log(this.state.fundsGlobal);
  }

  render() {
    return (
      <Container>
        <div className="main-section">
          <Row>
            <Col>
              <FondList setList={this.state.list}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <FileHandling setList={this.state.list} callbackFromParent={this.fundsGlobalCallback}/>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }

}

export default App;