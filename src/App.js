import React, { PureComponent } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import FondList from '../src/components/FondList/FondList.js';
import FondInfo from '../src/components/FondInfo/FondInfo.js';
import Purchases from '../src/components/Purchases/Purchases.js';
import Controls from '../src/components/Controls/Controls.js';
import FileHandling from '../src/components/FileHandling/FileHandling.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {list: [], selectedEntry: null, selectedFond: null};

    this.fundsGlobalCallback = this.fundsGlobalCallback.bind(this);
    this.selectedFundsGlobalCallback = this.selectedFundsGlobalCallback.bind(this);
    this.clearLists = this.clearLists.bind(this);
    this.updateFund = this.updateFund.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
    this.selectedUpdated = this.selectedUpdated.bind(this);
    this.myRef = React.createRef();
    this.controlsReference = this.myRef;
  }

  fundsGlobalCallback (value) {
    this.setState({list: value.sort((a, b) => (a.fundName > b.fundName) ? 1 : -1)});
  }

  selectedFundsGlobalCallback (value) {
    this.setState({selectedFond: value});
    this.controlsReference.current.setState({fundName: value.fundName, fundId: value.fundId});
  }

  selectedItem (value) {
    this.setState({selectedEntry: value});
    this.controlsReference.current.setState({
      itemDate: value.date, itemAmount: value.cost, itemQuantity: value.quantity, itemTax: value.tax});
  }

  updateFund (name, id) {
    const funds = [...this.state.list];
    const updatedList = this.state.selectedFond;
    const fund = funds.find(obj => obj.fundName === updatedList.fundName && obj.fundId === updatedList.fundId);
    fund.fundName = name;
    fund.fundId = id;
    updatedList.fundName = name;
    updatedList.fundId = id;
    this.setState({list: funds.sort((a, b) => (a.fundName > b.fundName) ? 1 : -1)});
  }

  selectedUpdated (value) {
    this.setState({selectedFond: value});
    Object.assign([...this.state.list].find(obj => 
      obj.fundName === value.fundName && obj.fundId === value.fundId), value);
  }

  clearLists () {
    this.setState({selectedFond: null});
  }

  render() {
    return (
      <Container>
        <div className="main-section">
          <Row>
            <div className="left-offset">
              <Row>
                <Col>
                  <Row>
                    <FondList 
                      setList={this.state.list} 
                      callbackFromParent={this.selectedFundsGlobalCallback}/>
                    <FondInfo 
                      setList={this.state.list} 
                      selectedFond={this.state.selectedFond}/>
                  </Row>
                  <Row>
                    <Purchases 
                      setList={this.state.list} 
                      selectedFond={this.state.selectedFond}
                      selectedItem={this.selectedItem}/>
                  </Row> 
                </Col>
              </Row>
              <Row>
                <FileHandling 
                  setList={this.state.list} 
                  clearLists={this.clearLists}
                  callbackFromParent={this.fundsGlobalCallback}/>
              </Row>
            </div>
            <div className="left-offset">
              <Controls 
                ref={this.myRef} 
                setList={this.state.list} 
                selectedFond={this.state.selectedFond} 
                selectedEntry={this.state.selectedEntry} 
                callbackFromParent={this.fundsGlobalCallback}
                clearLists={this.clearLists}
                updateFund={this.updateFund}
                selectedUpdated={this.selectedUpdated}/>
            </div>
          </Row>
        </div>
      </Container>
    );
  } 
}

export default App;