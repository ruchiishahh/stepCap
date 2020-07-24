package com.google.sps.data;

/** An Booking that will be listed in the dashboard page
 * TODO: comment/uncomment/add some more variables as changes are made.
 * */
public final class Booking {

  private final String booking_id;
  private final String customer_id;
  private final String provider_id;
  private final String service_id;
  private final String booking_name;
  private final String booking_date;
  private final String booking_duration;
  private final String booking_optional_note;
  private final String booking_price;
  private boolean is_confirmed_customer;
  private boolean is_confirmed_provider;
  private final long timestamp;

  public Booking(String booking_id,String service_id, String booking_name, String booking_date, String booking_duration, String booking_optional_note,
String customer_id, String provider_id, boolean is_confirmed_customer, boolean is_confirmed_provider, String booking_price, long timestamp) {
    this.booking_id = booking_id;
    this.customer_id = customer_id;
    this.provider_id = provider_id;
    this.service_id = service_id;
    this.booking_name = booking_name;
    this.booking_duration = booking_duration;
    this.booking_date = booking_date;
    this.booking_optional_note = booking_optional_note;
    this.booking_price = booking_price;
    this.is_confirmed_customer = is_confirmed_customer;
    this.is_confirmed_provider = is_confirmed_provider;
    this.timestamp = timestamp;
  }
}