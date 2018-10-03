import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// define RecordForm component
class ListRecords extends Component {
    // constructor for ListRecords
    constructor(props) {
        super(props);
        this.state = {
            values: []
        }
    }

    // get 5 recent records
    componentDidMount() {
        let ListRecords = this;
        fetch('/api/records')
            .then(function (response) {
                const body = response.json();
                return body;
            })
            .then(function (data) {
                ListRecords.setState({
                    values : data.data
                })
            })
    }

    // render the form
    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Feed Time</TableCell>
                            <TableCell>What Food</TableCell>
                            <TableCell>Feed Location</TableCell>
                            <TableCell>Number of Ducks</TableCell>
                            <TableCell>What kind Food</TableCell>
                            <TableCell>How Much Food</TableCell>
                            <TableCell>Feed for (days) more days</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {this.state.values.map(el => {
                    return <TableRow key={el.id}>
                        <TableCell compoment="th" scope="row">{el.feedtime}</TableCell>
                        <TableCell compoment="th" scope="row">{el.whatfood}</TableCell>
                        <TableCell compoment="th" scope="row">{el.feedlocation}</TableCell>
                        <TableCell compoment="th" scope="row">{el.manyducks}</TableCell>
                        <TableCell compoment="th" scope="row">{el.kindfood}</TableCell>
                        <TableCell compoment="th" scope="row">{el.muchfood}</TableCell>
                        <TableCell compoment="th" scope="row">{el.feedregular}</TableCell>
                    </TableRow>
                })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

// RecordForm;
export default (ListRecords);