import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const GraingerForm5 = () => (<div class="container">
  <form>
      <h2>Invited Web ERC user</h2>
      <h3>All fields are required</h3>

    <div className="formRow">
      <form>
        <h2>Add users to Team 1:</h2>
        <RaisedButton label="INVITE USER" primary={true}/>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>User name</TableHeaderColumn>
              <TableHeaderColumn>Invitation status</TableHeaderColumn>
              <TableHeaderColumn>Tools</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>James Smith</TableRowColumn>
              <TableRowColumn>Sent</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon><FontIcon className="material-icons">clear</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>James Smith</TableRowColumn>
              <TableRowColumn>Pending</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon><FontIcon className="material-icons">clear</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>James Smith</TableRowColumn>
              <TableRowColumn>Confirmed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon><FontIcon className="material-icons">clear</FontIcon></TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

      </form>
    </div>
    <div className="formButton">
      <h4>Temporary password will be assigned.</h4>
      <FlatButton label="Cancel"/>
      <RaisedButton label="Continue" primary={true}/>
    </div>
  </form>
</div>);

export default GraingerForm5;
