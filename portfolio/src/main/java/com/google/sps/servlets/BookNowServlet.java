package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for storing data of a service after BookNow is clicked.
 * TODO: finish implementing doPost method
 */

@WebServlet("/book-new-service")
public class BookNowServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String booking_name = request.getParameter("booking_name");
    String booking_date = request.getParameter("booking_date");
    long booking_duration = Long.parseLong(request.getParameter("booking_duration"));
    String booking_optional_note = request.getParameter("booking_optional_note");
    long booking_price = Long.parseLong(request.getParameter("booking_price"));
    long timestamp = System.currentTimeMillis();
    Entity bookingEntity = new Entity("Booking");
    bookingEntity.setProperty("booking_name", booking_name);

    bookingEntity.setProperty("booking_date", booking_date);
    bookingEntity.setProperty("booking_duration", booking_duration);
    bookingEntity.setProperty("booking_optional_note", booking_optional_note);
    bookingEntity.setProperty("booking_price", booking_price);
    
    bookingEntity.setProperty("timestamp", timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(bookingEntity);
    //System.out.println("BROWSER URL: " + request.getRequestURI());
    //response.sendRedirect("http://localhost:8080/Dashboard");
    //response.sendRedirect(request.getRequestURI());
    // response.sendRedirect("/BookingForm");
  }
}