package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilter;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;;
import com.google.sps.data.Service;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.EntityNotFoundException;

@WebServlet("/book-new-service")
public class BookNowServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String customer_id = request.getParameter("customer_id");
    String provider_id = request.getParameter("provider_id");
    String service_id = request.getParameter("service_id");
    String booking_name = request.getParameter("booking_name");
    String booking_date = request.getParameter("booking_date");
    long booking_duration = Long.parseLong(request.getParameter("booking_duration"));
    String booking_optional_note = request.getParameter("booking_optional_note");
    long booking_price = Long.parseLong(request.getParameter("booking_price"));
    boolean booking_is_confirmed_customer = true;
    boolean booking_is_confirmed_provider = false;
    long timestamp = System.currentTimeMillis();

    Entity bookingEntity = new Entity("Booking");
    bookingEntity.setProperty("customer_id", customer_id);
    bookingEntity.setProperty("provider_id", provider_id);
    bookingEntity.setProperty("service_id", service_id);
    bookingEntity.setProperty("booking_name", booking_name);
    bookingEntity.setProperty("booking_date", booking_date);
    bookingEntity.setProperty("booking_duration", booking_duration);
    bookingEntity.setProperty("booking_optional_note", booking_optional_note);
    bookingEntity.setProperty("booking_price", booking_price);
    bookingEntity.setProperty("booking_is_confirmed_customer", booking_is_confirmed_customer);
    bookingEntity.setProperty("booking_is_confirmed_provider", booking_is_confirmed_provider);
    bookingEntity.setProperty("booking_created", timestamp);
    System.out.println(bookingEntity);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(bookingEntity);

    Gson gson = new Gson();
    String[] bookingResponse = new String[1]; 
    bookingResponse[0] = "success";
    String bookNowServletResponse = gson.toJson(bookingResponse);
    response.getWriter().println(bookNowServletResponse);
    
  }
}