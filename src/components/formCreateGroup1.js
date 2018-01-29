import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
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

const TextForm6 = () => (<div class="container">
  <form>
    <h2>Add users to Team 1:</h2>
    <RaisedButton label="INVITE USER" primary={true}/>

    <h2>Invited users</h2>
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
  <div className="formButton">
    <FlatButton label="Cancel"/>
    <RaisedButton label="Continue" primary={true}/>
  </div>
</div>);

export default TextForm6;
