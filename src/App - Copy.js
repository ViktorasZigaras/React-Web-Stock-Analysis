import React, { PureComponent } from 'react';
import '../src/App.css';
import MainList from '../src/MainList.js';
import FileHandling from '../src/FileHandling.js';

class App extends PureComponent {

  constructor(props) {

    super(props);
    this.state = {fundsGlobal: [], listReference: ''};

    this.listRef = React.createRef();
    this.state.listReference = this.listRef;

    this.fundsGlobalCallback = this.fundsGlobalCallback.bind(this);
    
  }

  fundsGlobalCallback (value) {
    //this.setState({ fundsGlobal: value });
    this.state.listReference.current.setState({funds: value});
    //console.log(this.state.fundsGlobal);
  }

  render() {
    return (
 
     <div className="flex main-section">

      <div>
        <div className="left-section">
          <MainList ref={this.listRef} />
        </div>
        <FileHandling callbackFromParent={this.fundsGlobalCallback}/>
      </div>

      <div className="right-section">

        <div className="">

          <div>
            <div className="main-label" type="text" name="fundName">Fund Name: </div><br/>
            <div className="main-label" type="text" name="fundId">Fund Id: </div><br/>
            <div className="main-label" type="text" name="cost">Amount Spent: </div><br/>
            <div className="main-label" type="text" name="quantity">Quantity: </div><br/>
            <div className="main-label" type="text" name="tax">Tax: </div><br/>
          </div>
          
        </div>

      </div>

    </div>
     
    );
  }

  /*
  <div className="flex">
    <input type="button" value="add customer" onClick={()=>this.onAddCustomer()} className="add-button"/>
    <input type="button" value="remove customer" onClick={()=>this.onRemoveCustomer()} className="add-button"/>
  </div>

  <div className="top-10 width-120">
    <div className="height-20">Fund Name: </div><br/>
    <div className="height-20">Fund Id: </div><br/>
    <div className="height-20">Date: </div><br/>
    <div className="height-20">Cost: </div><br/>
    <div className="height-20">Quantity: </div><br/>
    <div className="height-20">Tax: </div><br/>
  </div>

  <div>
    <input className="input" type="text" name="fundName"></input><br/>
    <input className="input" type="text" name="fundId"></input><br/>
    <input className="input" type="text" name="date"></input><br/>
    <input className="input" type="text" name="cost"></input><br/>
    <input className="input" type="text" name="quantity"></input><br/>
    <input className="input" type="text" name="tax"></input><br/>
  </div>
  */
 
}

export default App;