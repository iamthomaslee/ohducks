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
            <Field type="time" name="time" component={InputField} label="What time the ducks are fed" min="00:00" max="23:59" pattern="[0-9]{2}:[0-9]{2}" required />
            <Field type="text" name="food" component={InputField} label="What food the ducks are fed" required/>
            <Field type="text" name="where" component={InputField} label="Where the ducks are fed" required/>
            <Field type="text" name="many" component={InputField} label="How many ducks are fed" required/>
            <Field type="text" name="kind" component={InputField} label="What kind of food the ducks are fed" required/>
            <Field type="text" name="much" component={InputField} label="How much food the ducks are fed" required/>
            <button type="submit">Submit</button>
        </form>
    );
};

// validation
const validate = values => {
    const errors = {};

    if (!values.time) {
        console.log('What time the ducks are fed?');
        errors.time = 'Required';
    }

    if (!values.food) {
        console.log('What food the ducks are fed?');
        errors.food = 'Required';
    }

    if (!values.where) {
        console.log('Where the ducks are fed?');
        errors.where = 'Required';
    }

    if (!values.many) {
        console.log('How many ducks are fed?');
        errors.many = 'Required';
    }

    if (!values.kind) {
        console.log('What kind of food the ducks are fed?');
        errors.kind = 'Required';
    }

    if (!values.much) {
        console.log('How much food the ducks are fed?');
        errors.much = 'Required';
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

    callApi = async() => {
        const response = await fetch('/api/ping');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleSubmit = values => {
        console.log('Submitting the following values:');
        console.log(`What time the ducks are fed: ${values.time}`);
        console.log(`What food the ducks are fed: ${values.food}`);
        console.log(`Where the ducks are fed: ${values.where}`);
        console.log(`How many ducks are fed: ${values.many}`);
        console.log(`What kind of food the ducks are fed: ${values.kind}`);
        console.log(`How much food the ducks are fed: ${values.much}`);

        // test /api/ping call
        this.callApi()
            .then(res => this.setState({
                response: res.express
            }))
            .catch(err => console.log(err));
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