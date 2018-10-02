import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RecordForm from './components/RecordForm';

// define App component
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Oh Ducks!</h1>
                    <button>Form</button> <button>Records</button> <button>Settings</button>
                </header>
                <p className="App-intro">
                    Please fill up the following form and click the submit button.
                </p>
                <RecordForm/>
            </div>
        );
    }
}

export default App;