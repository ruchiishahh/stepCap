import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";

export default function VirtualizedList(props) {
  const { name, description, service_name, rating, date } = props;
  console.log("a review card is rendering");
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              <div class="profile-reviews">
                <div class="profile-review-reviewer-name">
                  A user left a review for <strong>{service_name}</strong> on{" "}
                  {date}
                </div>
                <Rating name="read-only" value={rating} readOnly />
                <div class="profile-review-title">{name}</div>
                <div class="profile-review-body">{description}</div>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </div>
  );
}
