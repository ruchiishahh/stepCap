import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";

export default function VirtualizedList(props) {
  const { name, description, provider, rating } = props;
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              <div class="profile-service">
                <div class="profile-service-image-container">
                  <div class="profile-service-RSVP">RSVP</div>
                </div>
                <div class="profile-service-title">
                  {name}
                  <Rating name="read-only" value={4} readOnly />
                  <div class="profile-service-body">{description}</div>
                </div>

                <div class="profile-service-price">$24/hr</div>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </div>
  );
}
