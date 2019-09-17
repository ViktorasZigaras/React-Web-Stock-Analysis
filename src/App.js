import React, { PureComponent } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import FondList from '../src/components/FondList/FondList.js';
import FondInfo from '../src/components/FondInfo/FondInfo.js';
import Purchases from '../src/components/Purchases/Purchases.js';
import FileHandling from '../src/components/FileHandling/FileHandling.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends PureComponent {

  constructor(props) {

    super(props);
    this.state = {
      list: [],
      selectedFond: null
    };

    this.fundsGlobalCallback = this.fundsGlobalCallback.bind(this);
    this.selectedFundsGlobalCallback = this.selectedFundsGlobalCallback.bind(this);
    
  }

  fundsGlobalCallback (value) {
    this.setState({list: value});
    //console.log(this.state.fundsGlobal);
  }

  selectedFundsGlobalCallback (value) {
    this.setState({selectedFond: value});
    //console.log(this.state.fundsGlobal);
  }

  render() {
    return (
      <Container>
        <div className="main-section">
          <Row>
            <Col>
              <Row>
                <div>
                  <FondList setList={this.state.list} callbackFromParent={this.selectedFundsGlobalCallback}/>
                </div>
                <div>
                  <FondInfo setList={this.state.list} selectedFond={this.state.selectedFond}/>
                </div>
              </Row>
              <Row>
                <div>
                  <Purchases setList={this.state.list} selectedFond={this.state.selectedFond}/>
                </div>
              </Row> 
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