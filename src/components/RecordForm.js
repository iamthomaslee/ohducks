import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';


// get today's date for initial feedtime
const today = new Date();
const month = today.getMonth() < 10 ? "0"+today.getMonth() : today.getMonth();
const date = today.getDate() < 10 ? "0"+today.getDate() : today.getDate();
const hour = today.getHours() < 10 ? "0"+today.getHours() : today.getHours();
const minute = today.getMinutes() < 10 ? "0"+today.getMinutes() : today.getMinutes();
const initialTimeFormatted = today.getFullYear()+"-"+month+"-"+date+"T"+hour+":"+minute;

const feedtime = new Date();

// define InputField template
const InputField = ({ input, label, type, min, max, step, meta: { touched, error, warning }}) =>
    <div>
        <label>
            {label}
        </label>
        <div>
            <input {...input} type={type} min={min} max={max} step={step}/>
        </div>
        {touched && error &&
        <div>
            {error}
        </div>}
    </div>;


// validation
const validate = values => {
    const errors = {};

    if (!values.feedtime) {
        errors.feedtime = 'Required';
    }

    if (!values.whatfood) {
        errors.whatfood = 'Required';
    }

    if (!values.feedlocation) {
        errors.feedlocation = 'Required';
    }

    if (!values.manyducks) {
        errors.manyducks = 'Required';
    }

    if (!values.kindfood) {
        errors.kindfood = 'Required';
    }

    if (!values.muchfood) {
        errors.muchfood = 'Required';
    }

    return errors;
};

// define RecordForm component
class RecordForm extends Component {

    // define initial state
    state = {
        timepicker: initialTimeFormatted,
        feedtime: today.toString(),
        feedlocation:'',
        manyducks: 1,
        kindfood: '',
        muchfood: 100,
        feedregular: 0,
        response: ''
    };

    // update state on change value
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleFeedTime = (e) => {
        const newFeedtime = new Date(e.target.value);
        this.setState({
            [feedtime]: newFeedtime.toString()
        });
    };

    // send post on submit
    handleSubmit = (e) => {
        fetch('/api/records', {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.state)
        }).then(function (response) {
            const body = response.json();
            if (response.status !== 200) throw Error(body.message);

            return body;
        });
    };

    // render the form
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Field type="datetime-local" name="timepicker" onBlur={this.handleFeedTime} value={this.state.timepicker} component={InputField} label="What time the ducks are fed" min="00:00" max="23:59" required/>
                <label>
                    What food the ducks are fed
                </label>
                <div>
                    <Field type="text" name="whatfood" onChange={this.handleChange} value={this.state.whatfood} component="select" required>
                        <option/>
                        <option value="1">Corn</option>
                        <option value="2">Duck pellets</option>
                        <option value="3">Lettuce</option>
                        <option value="4">Other greens</option>
                        <option value="5">Frozen peas</option>
                        <option value="6">Oats</option>
                        <option value="7">Seeds</option>
                        <option value="8">Worms</option>
                        <option value="9">Fish</option>
                        <option value="10">Breadcrumbs</option>
                        <option value="11">Other</option>
                    </Field>
                </div>
                <Field type="text" name="feedlocation" onChange={this.handleChange} value={this.state.feedlocation} component={InputField} label="Where the ducks are fed" required/>
                <Field type="number" name="manyducks" onChange={this.handleChange} value={this.state.manyducks} min={1} max={1000} component={InputField} label="How many ducks are fed (numbers only: between 1 and 1000)" required/>
                <label>
                    What kind of food the ducks are fed
                </label>
                <div>
                    <Field type="text" name="kindfood" onChange={this.handleChange} value={this.state.kindfood} component="select" required>
                        <option/>
                        <option value="1">Fresh</option>
                        <option value="2">Dry</option>
                        <option value="3">Frozen</option>
                        <option value="4">Cooked</option>
                        <option value="5">Manufactured</option>
                        <option value="6">Other</option>
                    </Field>
                </div>
                <Field type="number" name="muchfood" onChange={this.handleChange} value={this.state.muchfood} min={100} max={1000} step={100} component={InputField} label="How much food the ducks are fed in grams(Numbers Only: between 100g and 1000g )" required/>
                <label>Feed regularly?</label>
                <div>
                    <Field type="text" name="feedregular" onChange={this.handleChange} value={this.state.kindfood} component="select" required>
                        <option/>
                        <option value="0">No. Just today</option>
                        <option value="1">will feed tomorrow</option>
                        <option value="2">for next 2 days</option>
                        <option value="3">for next 3 days</option>
                        <option value="4">for next 4 days</option>
                        <option value="5">for next 5 days</option>
                        <option value="6">for a week including today</option>
                    </Field>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

// RecordForm;
export default reduxForm({
    form: 'recordForm',
    enableReinitialize: true,
    initialValues: {
        timepicker: initialTimeFormatted,
        feedtime: today.toString(),
        whatfood:'',
        feedlocation:'',
        manyducks: 1,
        kindfood: '',
        muchfood: 100,
        feedregular: 0
    },
    validate,
})(RecordForm)