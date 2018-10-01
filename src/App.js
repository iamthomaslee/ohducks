import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import logo from './logo.svg';
import './App.css';

// define InputField template
const InputField = ({ input, label, type, meta: { touched, error, warning }}) =>
    <div>
        <label>
            {label}
        </label>
        <div>
            <input {...input} type={type} />
        </div>
        {touched &&
        error &&
        <div>
            {error}
        </div>}
    </div>;

// define RecordForm
let RecordForm = props => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field type="time" name="feedtime" component={InputField} label="What time the ducks are fed" min="00:00" max="23:59" default="00:00" pattern="[0-9]{2}:[0-9]{2}" required/>
            <Field type="text" name="whatfood" component={InputField} label="What food the ducks are fed" required/>
            <Field type="text" name="feedlocation" component={InputField} label="Where the ducks are fed" required/>
            <Field type="number" name="manyducks" component={InputField} label="How many ducks are fed (numbers only)" required/>
            <Field type="text" name="kindfood" component={InputField} label="What kind of food the ducks are fed" required/>
            <Field type="text" name="muchfood" component={InputField} label="How much food the ducks are fed (grams)" required/>
            <button type="submit">Submit</button>
        </form>
    );
};

// validation
const validate = values => {
    const errors = {};

    if (!values.feedtime) {
        console.log('What time the ducks are fed?');
        errors.feedtime = 'Required';
    }

    if (!values.whatfood) {
        console.log('What food the ducks are fed?');
        errors.whatfood = 'Required';
    }

    if (!values.feedlocation) {
        console.log('Where the ducks are fed?');
        errors.feedlocation = 'Required';
    }

    if (!values.manyducks) {
        console.log('How many ducks are fed?');
        errors.manyducks = 'Required';
    }

    if (!values.kindfood) {
        console.log('What kind of food the ducks are fed?');
        errors.kindfood = 'Required';
    }

    if (!values.muchfood) {
        console.log('How much food the ducks are fed?');
        errors.muchfood = 'Required';
    }

    return errors;
};

// create RecordForm
RecordForm = reduxForm({
    form: 'recordForm',
    validate,
})(RecordForm);

// define App component
class App extends Component {

    state = {
        response: ''
    };

    handleSubmit = values => {
        fetch('/api/records', {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(values)
        }).then(function (response) {
            const body = response.json();
            if (response.status !== 200) throw Error(body.message);
            return body;
        }).then(
            res => this.setState({
                response: "Thank you. "+res.message,
            })
        )
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Oh Ducks!</h1>
                </header>
                <p className="App-intro">
                    Please fill up the following form and click the submit button.
                </p>
                <RecordForm onSubmit={this.handleSubmit}/>
                <p className="App-intro">{this.state.response}</p>
            </div>
        );
    }
}

export default App;