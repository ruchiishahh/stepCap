package com.google.sps.data;

/** Class containing the data for Services. */
public final class User {

  private final long user_id;
  private final String user_firstname;
  private final String user_lastname;
  private final String user_email;
  private final String user_phone;
  private final Double average_rating;

  public User(long user_id, String user_firstname, String user_lastname, String user_email, String user_phone, Double average_rating) {
    this.user_id = user_id;
    this.user_firstname = user_firstname;
    this.user_lastname = user_lastname;
    this.user_email = user_email;
    this.user_phone = user_phone;
    this.average_rating = average_rating;
  }

}