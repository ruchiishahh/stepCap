import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { Button } from "@material-ui/core";
import BookingInfoPopUp from "./BookingInfoPopUp";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 400,
    maxWidth: 300,
    width: "100%",
  },
}));

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem alignItems="flex-start" button style={style} key={index}>
      <ListItemText
        disableTypography={false}
        primary={`${index + 1} Booking Name`}
        secondary="Date | Duration | Description | Price"
      />
      <BookingInfoPopUp />
      <Button variant="contained" color="primary">
        Confirm
      </Button>
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={900} width={600} itemSize={46} itemCount={200}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}
