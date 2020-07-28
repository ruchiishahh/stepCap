package com.google.sps.data;
import java.util.Date;
import java.text.Format;
import java.text.SimpleDateFormat;

/** Class containing the data for Reviews. */
public final class Review {

  private final String review_id;
  private final String service_id;
  private final String customer_id;
  private final String provider_id;
  private final String review_name;
  private final String review_description;
  private final String service_name;
  private final Double review_rating;
  private final long timestamp;
  private final String review_date;

  public Review(String review_id, String service_id, String provider_id, String customer_id, String review_name, String review_description, String service_name, Double review_rating, long timestamp) {
      this.review_id = review_id;
      this.review_name = review_name;
      this.review_description = review_description;
      this.service_id = service_id;
      this.customer_id = customer_id;
      this.provider_id = provider_id;
      this.service_name = service_name;
      this.review_rating = review_rating;
      this.timestamp = timestamp;
      Date date = new Date(timestamp);
      Format format = new SimpleDateFormat("EEE, d MMM yyyy");
      this.review_date = format.format(date);
      
    }

  /** Getter method for id. */
  public long getId() {
    return review_id;
  }

  /** Getter method for review name. */
  public String getName() {
    return review_name;
  }

  /** Getter method for review description. */
  public String getDesc() {
    return review_description;
  }

 /** Getter method for service name. */
  public String getServiceName() {
    return service_name;
  }

  /** Getter method for service id. 
  public long getServiceId() {
    return service_id;
  }*/

  /** Getter method for review rating. */
  public Double getReviewRating() {
    return review_rating;
  }

  /** Getter method for review date. */
  public String getReviewDate() {
    return review_date;
  }
}