import React, { Component } from "react";
import PendingReqs from "./bookingcomponents/PendingReqs";

export default class BookingForm extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <main>
        <h1>Dashboard Page</h1>
        <h2>Here are your Pending Requests</h2>
        <PendingReqs />
      </main>
    );
  }
}
