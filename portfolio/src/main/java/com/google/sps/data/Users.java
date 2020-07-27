package com.google.sps.data;

/** Class containing the data for Services. */
public final class Users {

  private final long user_id;
  private final String username;
  private final String user_firstname;
  private final String user_lastname;
  private final String user_email;
  private final String password;
  private final String user_phone;
  private final Double average_rating;

  public Users(long user_id, String username,  String user_firstname, String user_lastname, String user_email, String password, String user_phone, Double average_rating) {
    this.user_id = user_id;
    this.username = username;
    this.user_firstname = user_firstname;
    this.user_lastname = user_lastname;
    this.user_email = user_email;
    this.user_phone = user_phone;
    this.password = password;
    this.average_rating = average_rating;
  }

}