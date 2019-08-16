import React from 'react';
import logo from './logo.svg';
import { Button } from 'antd'
// import './App.css';
import './App.less'
class App extends React.Component {
  render(){
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
