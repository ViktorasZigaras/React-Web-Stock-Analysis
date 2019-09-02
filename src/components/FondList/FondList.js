import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './FondList.css'; // cia tipo reiskia, kad tam paciam folderi yra css
//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class FondList extends PureComponent {
  
  constructor(props) {

    super(props);
    this.state = {list: [], selectedFond: null};

  }

  onClickCustomer(/*fundName, */fundId/*, cost, quantity, tax*/) {
    /*  
    document.getElementsByName('onClickInfo')[0].innerHTML = 
    <div>
      <Row><Col>'Fund Name: ' + {fundName}</Col></Row>
      <Row><Col>'Fund Id: ' + {fundId}</Col></Row>
      <Row><Col>'Amount Spent: ' + {cost}</Col></Row>
      <Row><Col>'Quantity: ' + {quantity}</Col></Row>
      <Row><Col>'Tax: ' + {tax}</Col></Row>
    </div>;
    */
    this.setState({selectedFond: fundId});
  }

  render() {

    const rows = [];
    let fondInfo = null;
    let fond;

    if (this.state.selectedFond) {
      fond = this.state.list.find(obj => obj.fundId = this.state.selectedFond);
   
      fondInfo = 
      <div>
        <Row><Col>'Fund Name: ' + {fond.fundName}</Col></Row>
        <Row><Col>'Fund Id: ' + {fond.fundId}</Col></Row>
        <Row><Col>'Amount Spent: ' + {fond.cost}</Col></Row>
        <Row><Col>'Quantity: ' + {fond.quantity}</Col></Row>
        <Row><Col>'Tax: ' + {fond.tax}</Col></Row>
      </div>;
    }
      
    this.state.list.forEach((entry) => { 

      rows.push(<p key={entry.fundName} className="hover-item" onClick={()=>this.onClickCustomer(
        /*entry.fundName,*/ entry.fundId/*, entry.cost, entry.quantity, entry.tax*/)}>
        {entry.fundName}, {entry.fundId}</p>);
        
    });
      
    return (
      <Container>
        <Row>
          <Col>
            {rows}
          </Col>
          <Col>
            {fondInfo}
          </Col>
        </Row>
      </Container>
    );

  }

}

/*componentDidMount(){
      //this.fetchData();
    }*/
    /*
    fetchData(){
        this.setState({ loading: true }) // sakome, kad pradedam krovima
        axios.get('http://luminor-funds.metasite.lt/funds/funds/getJson/2019-07-25/2019-08-25/fund_22384')
        .then(response => {

            const formatedDataOrList = response.data; // paimi rezultata ir suformatuoji i sarasa
            console.err('result', formatedDataOrList)
            //this.setState({ loading: false, list: formatedDataOrList }) // sakome, kad baigem krovima
        })
        .catch(error => {
            console.err('error', error)
            this.setState({ loading: false }) // sakome, kad baigem krovima
        })

    }*/

export default FondList;