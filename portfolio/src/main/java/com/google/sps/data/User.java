package com.google.sps.data;

/** Class containing the data for User. */
public final class User {

  private final long user_id;
  private final String username;
  private final String first_name;
  private final String last_name;
  private final String email;
  private final String phone_number;
  private final String latitude;
  private final String longitude;

  /**
   * @param {!long} id The unique identifier for each User.
   * @param {!String} username the User's chosen name.
   * @param {!String} first_name User's first name
   * @param {!String} last_name User's last name.
   * @param {!String} email This User's email.
   * @param {!String} phone_number This User's phone number.
   * @param {!String} latitude This User's position:latitude.
   * @param {!String} longitude This User's position:longitude.
   */
  public User(long user_id, String username, String first_name, String last_name, String email, String phone_number, String latitude, String longitude) {
      this.user_id = user_id;
      this.username = username;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.phone_number = phone_number;
      this.latitude = latitude;
      this.longitude = longitude;
}

  /** Getter method for id. */
  public long getId() {
    return user_id;
  }

  /** Getter method for User's first name. */
  public String firstName() {
    return first_name;
  }

  /** Getter method for User's last name. */
  public String lastName() {
    return last_name;
  }

  /** Getter method for User's full name. */
  public String fullName() {
    return first_name + " " + last_name;
  }

  /** Getter method for User's email. */
  public String getEmail() {
    return email;
  }

  /** Getter method for provider id. */
  public String phoneNumber() {
    return phone_number;
  }

  /** Getter method for User's latitude. */
  public String latitude() {
    return latitude;
  }

  /** Getter method for User's longitude. */
  public String longitude() {
    return longitude;
  }
}