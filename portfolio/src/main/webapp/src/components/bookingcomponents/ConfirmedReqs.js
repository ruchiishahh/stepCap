import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { Button } from "@material-ui/core";
import BookingInfoPopUp from "./BookingInfoPopUp";

export default function VirtualizedListTwo(props) {
  const { user_id, name, date, duration, note, price, status } = props;
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          disableTypography={false}
          //primary={name}
          primary={`Booking Name: ${name}`}
          secondary={`Booking Date: ${date} | Duration: ${duration} | Optional Note: ${note} | Price: ${price}`}
        />
        <BookingInfoPopUp
          name={name}
          date={date}
          duration={duration}
          note={note}
          price={price}
        />
        <Button variant="contained" color="primary">
          Contact
        </Button>
      </ListItem>
    </div>
  );
}
