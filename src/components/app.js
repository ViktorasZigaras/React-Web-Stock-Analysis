import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';
import FondList from './fondList/fondList.js';
import FondInfo from './fondInfo/fondInfo.js';
import Purchases from './purchases/purchases.js';
import Controls from './controls/controls.js';
import FileHandling from './fileHandling/fileHandling.js';

const App = (/*props*/) => {
  return (
    <Container>
      <div className="main-section">
        <Row>
          <div className="left-offset">
            <Row>
              <Col>
                <Row>
                  <FondList />
                  <FondInfo />
                </Row>
                <Row>
                  <Purchases />
                </Row> 
              </Col>
            </Row>
            <Row>
              <FileHandling />
            </Row>
          </div>
          <div className="left-offset">
            <Controls />
          </div>
        </Row>
      </div>
    </Container>
  );
}

export default App;