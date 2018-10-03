import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// get today's date for initial feedtime
const today = new Date();
const month = today.getMonth()+1 < 10 ? "0"+(today.getMonth()+1) : (today.getMonth()+1);
const date = today.getDate() < 10 ? "0"+today.getDate() : today.getDate();
const hour = today.getHours() < 10 ? "0"+today.getHours() : today.getHours();
const minute = today.getMinutes() < 10 ? "0"+today.getMinutes() : today.getMinutes();
const initialTimeFormatted = today.getFullYear()+"-"+month+"-"+date+"T"+hour+":"+minute;

// define InputField template
const InputField = ({ input, label, type, min, max, step, helperText, meta: { touched, error, warning }}) =>
    <div className="top-space">
        <Grid container spacing={24}>
            <Grid item xs={12}>
            <TextField {...input} type={type} min={min} max={max} step={step} label={label} helperText={helperText} required/>
            </Grid>
        </Grid>
    </div>;

// define TimeInputField to handle date/time
const TimeInputField = ({ input, label, type, min, max, helper, meta: { touched, error, warning }}) =>
    <div className="time-field">
        <div className="MuiFormControl-root-1">
        <label className="time-label">
            {label}
        </label><br/>
        <input {...input} type={type} min={min} max={max}/>
        <p className="time-helper">{helper}</p>
        </div>
    </div>;

// define RecordForm component
class RecordForm extends Component {
    // define initial state
    state = {
        timepicker: initialTimeFormatted,
        feedtime: today.toString(),
        whatfood: '',
        feedlocation: '',
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

    // update 'feedtime' state on blur of date-time picker
    handleFeedTime = (e) => {
        const newFeedtime = new Date(e.target.value);
        this.setState({
            "feedtime": newFeedtime.toString()
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
                <Field type="datetime-local" name="timepicker" onBlur={this.handleFeedTime.bind(this)} value={this.state.timepicker} component={TimeInputField} helper="What time the ducks are fed" min="00:00" max="23:59" label="Feed Time" required/>
                <FormControl className="top-space">
                    <InputLabel htmlFor="whatfood-simple">Food</InputLabel>
                    <Select
                        value={this.state.whatfood}
                        onChange={this.handleChange}
                        input={<Input name="whatfood" id="whatfood-simple"/>}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Corn">Corn</MenuItem>
                        <MenuItem value="Duck pellets">Duck pellets</MenuItem>
                        <MenuItem value="Lettuce">Lettuce</MenuItem>
                        <MenuItem value="Other greens">Other greens</MenuItem>
                        <MenuItem value="Frozen peas">Frozen peas</MenuItem>
                        <MenuItem value="Oats">Oats</MenuItem>
                        <MenuItem value="Seeds">Seeds</MenuItem>
                        <MenuItem value="Worms">Worms</MenuItem>
                        <MenuItem value="Fish">Fish</MenuItem>
                        <MenuItem value="Breadcrumbs">Breadcrumbs</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <FormHelperText>What food the ducks are fed</FormHelperText>
                </FormControl>
                <Field type="text" name="feedlocation" onChange={this.handleChange} value={this.state.feedlocation} component={InputField} label="Location" helperText="Where the ducks are fed?" required/>
                <Field type="number" name="manyducks" onChange={this.handleChange} value={this.state.manyducks} min={1} max={1000} component={InputField} label="Number of Ducks" helperText="How many ducks are fed? (between 1 and 1000)" required/>
                <div>
                <FormControl>
                    <InputLabel htmlFor="kindfood-simple">Kind of Food</InputLabel>
                    <Select
                        value={this.state.kindfood}
                        onChange={this.handleChange}
                        input={<Input name="kindfood" id="kindfood-simple"/>}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Fresh">Fresh</MenuItem>
                        <MenuItem value="Dry">Dry</MenuItem>
                        <MenuItem value="Frozen">Frozen</MenuItem>
                        <MenuItem value="Cooked">Cooked</MenuItem>
                        <MenuItem value="Manufactured">Manufactured</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <FormHelperText>What kind of food the ducks are fed</FormHelperText>
                </FormControl>
                </div>
                <br/>
                <div>
                <FormControl>
                    <InputLabel htmlFor="muchfood-simple">How Much (grams)</InputLabel>
                    <Select
                        value={this.state.muchfood}
                        onChange={this.handleChange}
                        input={<Input name="muchfood" id="muchfood-simple"/>}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="100">100</MenuItem>
                        <MenuItem value="200">200</MenuItem>
                        <MenuItem value="300">300</MenuItem>
                        <MenuItem value="400">400</MenuItem>
                        <MenuItem value="500">500</MenuItem>
                        <MenuItem value="600">600</MenuItem>
                        <MenuItem value="700">700</MenuItem>
                        <MenuItem value="800">800</MenuItem>
                        <MenuItem value="900">900</MenuItem>
                        <MenuItem value="1000">1000</MenuItem>
                    </Select>
                    <FormHelperText>How much food the ducks are fed?</FormHelperText>
                </FormControl>
                </div>
                <br/>
                <div>
                    <FormControl>
                        <InputLabel htmlFor="feedregular-simple">Schedule (days)</InputLabel>
                        <Select
                            value={this.state.feedregular}
                            onChange={this.handleChange}
                            input={<Input name="feedregular" id="feedregular-simple"/>}
                        >
                            <MenuItem value="0" selected>Just today</MenuItem>
                            <MenuItem value="1">will feed tomorrow</MenuItem>
                            <MenuItem value="2">for next 2 days</MenuItem>
                            <MenuItem value="3">for next 3 days</MenuItem>
                            <MenuItem value="4">for next 4 days</MenuItem>
                            <MenuItem value="5">for next 5 days</MenuItem>
                            <MenuItem value="6">for a week</MenuItem>
                        </Select>
                        <FormHelperText>Feed regularly? Set a schedule here.</FormHelperText>
                    </FormControl>
                </div>
                <Button variant="contained" color="secondary" type="submit" className="button-margin">Submit</Button>
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
        whatfood: '',
        feedlocation:'',
        manyducks: 1,
        kindfood: '',
        muchfood: 100,
        feedregular: '0'
    },
})(RecordForm)