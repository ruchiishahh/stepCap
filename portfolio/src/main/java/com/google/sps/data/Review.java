package com.google.sps.data;

/** Class containing the data for Reviews. */
public final class Review {

  private final long review_id;
  private final String review_name;
  private final String review_description;
  private final long service_id;
  private final Double review_rating;
  private final long timestamp;

  public Review(long review_id, String review_name, String review_description, long service_id, Double review_rating, long timestamp) {
      this.review_id = review_id;
      this.review_name = review_name;
      this.review_description = review_description;
      this.service_id = service_id;
      this.review_rating = review_rating;
      this.timestamp = timestamp;
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

  /** Getter method for service id. */
  public long getServiceId() {
    return service_id;
  }

  /** Getter method for review rating. */
  public Double getAverage() {
    return review_rating;
  }
}