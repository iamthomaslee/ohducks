import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RecordForm from './components/RecordForm';
import ListRecords from "./components/ListRecords";

// define App component
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Oh Ducks!</h1>
                </header>
                <h3>Please fill up the following form and click the submit button.</h3>
                <RecordForm/>
                <h3>Recently Submitted Records</h3>
                <ListRecords/>
            </div>
        );
    }
}

export default App;