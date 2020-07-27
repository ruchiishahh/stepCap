package com.google.sps.data;

public final class BookingAndStatusPair {

  private final Booking booking;
  private final String status;
  
  public BookingAndStatusPair(Booking booking, String status) {
      this.booking = booking;
      this.status = status;
  }

}