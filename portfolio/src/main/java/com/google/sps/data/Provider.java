package com.google.sps.data;

/** Class containing the data for Services. */
public final class Provider {

  private final long provider_id;
  private final String provider_firstname;
  private final String provider_lastname;
  private final String provider_email;
  private final String provider_phone;
  private final Double average_rating;

  public Provider(long provider_id, String provider_firstname, String provider_lastname, String provider_email, String provider_phone, Double average_rating) {
    this.provider_id = provider_id;
    this.provider_firstname = provider_firstname;
    this.provider_lastname = provider_lastname;
    this.provider_email = provider_email;
    this.provider_phone = provider_phone;
    this.average_rating = average_rating;
  }

  /** Getter method for id. */
  public long getId() {
    return provider_id;
  }

  /** Getter method for service name. */
  public String getName() {
    return provider_lastname + " " + provider_lastname;
  }

  /** Getter method for service description. */
  public String getEmail() {
    return provider_email;
  }

 /** Getter method for service description. */
  public String getPhone() {
    return provider_phone;
  }

  /** Getter method for average rating. */
  public Double getAverage() {
    return average_rating;
  }
}