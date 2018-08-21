import * as React from "react";
import styles from "./TravelRequestForm.module.scss";
import { ITravelRequestFormProps } from "./ITravelRequestFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Col, Checkbox, FieldGroup, HelpBlock, FormControl, FormGroup, ControlLabel, Form, Button, Radio } from 'react-bootstrap';
import { render } from "../../../../node_modules/@types/react-dom";
import { Component } from "react";


export interface ITravelRequestFormState {

  AirIsActive: boolean;
}

export interface AirItem {
  key: number;
  value: string;
}

export default class TravelRequestForm extends React.Component<ITravelRequestFormProps, ITravelRequestFormState> {

  constructor(props) {
    super(props);

    this.state = {
      AirIsActive: true
    };
  }

  public render(): React.ReactElement<ITravelRequestFormProps> {

    return (
      <div className={styles.travelRequestForm}>
        <h1>Travel Request Form </h1>

        <div>
          <h2>Traveler </h2>
          <TravelerContainer />
        </div>

        <div>
          <h2>Request </h2>
          <AirContainer />
        </div>
      </div>
    );
  }

}

var TravelerContainer = React.createClass({

  getDefaultProps() {
    return {

    };
  },
  getInitialState() {
    return {
      arrangerChecked: false
    };
  },

  handleShowHide() {
    this.setState({
      arrangerChecked: !this.state.arrangerChecked
    });
  },
  render() {

    let travelerStyle = { display: 'none' };

    if (this.state.arrangerChecked) {
      travelerStyle.display = 'inline';
    } else {
      travelerStyle.display = 'none';
    }


    return (
      <div>
        Check the boxes for the travel options below that you would like to request.


        <div>
          <Checkbox
            checked={this.state.arrangerChecked}
            onChange={this.handleShowHide} >
            Travel Arranging
          </Checkbox>
          <div style={travelerStyle}>
            this is the area for travel arranger name
            </div>
        </div>

        <p></p>
        <p></p>

        <FormGroup>

          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <ControlLabel>Traveler</ControlLabel>
              </div>
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Traveler"
                  placeholder="put people picker field here"
                />
              </div>

              <div className="col-xs-5 col-sm-6 col-lg-4">
                <ControlLabel>Resident Country</ControlLabel>
              </div>
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <FormControl componentClass="select" placeholder="select Time">
                  <option value="select">select</option>
                  <option value="other">...</option>
                </FormControl>
              </div>
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <ControlLabel>Legal Full Name</ControlLabel>
              </div>
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <FormControl
                  id="formControlsText2"
                  type="text"
                  label="Date"
                  placeholder="First"
                />

                <FormControl
                  id="formControlsText3"
                  type="text"
                  label="Arrive"
                  placeholder="Middle"
                />
                <FormControl
                  id="formControlsText4"
                  type="text"
                  label="Date"
                  placeholder="Last"
                />

              </div>
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <ControlLabel>Business Unit</ControlLabel>
              </div>
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <FormControl componentClass="select" placeholder="select Time">
                  <option value="select">select</option>
                  <option value="other">...</option>
                </FormControl>

              </div>




              <div className="col-xs-5 col-sm-6 col-lg-4">
                <ControlLabel>BCD Traveler Profile</ControlLabel>
              </div>
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <FormGroup>
                  <Radio name="radioGroup" value="profileExists">
                    Active travel profile on file with BCD Travel.<br />
                    Has booked travel through BCD within the past 6 months.
      </Radio>
                  <Radio name="radioGroup" value="profileChangesNeeded" >
                    Unsure of travel profile status or if profile exists, it may need updates.
      </Radio>
                  <Radio name="radioGroup" value="profileNewTraveler">
                    New traveler. Traveler profile does not exist.
      </Radio>
                </FormGroup>

              </div>


              <div className="col-xs-5 col-sm-6 col-lg-4">
                <ControlLabel>Purpose of trip</ControlLabel>
              </div>
              <div className="col-xs-5 col-sm-6 col-lg-4">
                <FormControl componentClass="select" placeholder="Time">
                  <option value="select">select</option>
                  <option value="other">...</option>
                </FormControl>

              </div>


            </div>
          </div>

        </FormGroup>
      </div>

    );
  }
});



var AirContainer = React.createClass({
  getDefaultProps() {
    return {

    };
  },
  getInitialState() {
    return {
      checked: true
    };
  },

  handleShowHide() {
    this.setState({
      checked: !this.state.checked
    });
  },
  render() {

    let airStyle = { display: 'none' };

    if (this.state.checked) {
      airStyle.display = 'inline';
    } else {
      airStyle.display = 'none';
    }


    return (
      <div>
        Check the boxes for the travel options below that you would like to request.

          <Checkbox
          checked={this.state.checked}
          onChange={this.handleShowHide} >
          Air
          </Checkbox>
        <div style={airStyle}>
          <AirList />
        </div>
      </div>

    );
  }
});

var AirList = React.createClass({

  getInitialState() {
    return {
      AirCurrentRows: [
        { key: 1, value: "" },
        { key: 2, value: "" }
      ],
      AirHighestID: 2
    };
  },

  addRow() {
    let nextID: number = this.state.AirHighestID + 1;
    let newRow: AirItem = { key: nextID, value: "" };

    this.setState(
      {
        AirHighestID: nextID,
        AirCurrentRows: this.state.AirCurrentRows.push(newRow)
      }
    );
  },

  render() {
    let airItems = this.state.AirCurrentRows.map((row) => {
      return (
        <AirRow
          key={row.key}
        />
      );
    });

    return (
      <Form inline>
        {airItems}
        <div>
          <p></p>
          <Button type="button" onClick={this.addRow}>Add Row</Button>
        </div>
      </Form>
    );
  }
});

var AirRow = React.createClass({

  deleteRow(rowID) {

    var index = -1;
    var clength = this.state.AirCurrentRows.length;
    for (var i = 0; i < clength; i++) {
      if (this.state.AirCurrentRows[i].key === rowID) {
        index = i;
        break;
      }
    }
    this.state.AirCurrentRows.splice(index, 1);
    this.setState(
      {
        AirCurrentRows: this.state.AirCurrentRows
      }
    );
  },
  render() {


    return (
      <div>

        <FormGroup>
          <FormControl
            id="formControlsText"
            type="text"
            label="Depart"
            placeholder="City or airport name"
          />
          <FormControl
            id="formControlsText2"
            type="text"
            label="Date"
            placeholder="Date"
          />
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select Time">
            <option value="select">select</option>
            <option value="other">...</option>
          </FormControl>

          <FormControl
            id="formControlsText3"
            type="text"
            label="Arrive"
            placeholder="City or airport name"
          />
          <FormControl
            id="formControlsText4"
            type="text"
            label="Date"
            placeholder="Date"
          />
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="Time">
            <option value="select">select</option>
            <option value="other">...</option>
          </FormControl>
        </FormGroup>
        <Button type="button" onClick={this.deleteRow}>Delete Row</Button>
      </div>
    );
  }
});



