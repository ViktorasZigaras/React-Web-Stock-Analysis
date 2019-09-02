import React, { PureComponent } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import FondList from '../src/components/FondList/FondList.js';
import FileHandling from '../src/components/FileHandling/FileHandling.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends PureComponent {

  constructor(props) {

    super(props);
    this.state = {/*fundsGlobal: [], */listReference: ''};

    this.listRef = React.createRef();
    this.state.listReference = this.listRef;

    this.fundsGlobalCallback = this.fundsGlobalCallback.bind(this);
    
  }

  fundsGlobalCallback (value) {
    //this.setState({ fundsGlobal: value });
    this.state.listReference.current.setState({list: value});
    //console.log(this.state.fundsGlobal);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <FondList ref={this.listRef} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FileHandling callbackFromParent={this.fundsGlobalCallback}/>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default App;