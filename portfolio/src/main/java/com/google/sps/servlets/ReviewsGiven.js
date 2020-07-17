import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { Button } from "@material-ui/core";

export default function VirtualizedList(props) {
  const { name, description, service_id, rating } = props;
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          class="profile-review"
          primary={
            <React.Fragment>
              <div class="profile-review-reviewer-name">
                ${name} left a review for <strong>Minecraft Cannons</strong> on
                July 6th, 2020(3 days ago)
              </div>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <div class="profile-review-rating">{rating}</div>
              <div class="profile-review-title">Very rewarding</div>
              <div class="profile-review-body">{description}</div>
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  );
}
