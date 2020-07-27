package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
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
import com.google.gson.JsonParser;
import com.google.sps.data.Booking;
import com.google.sps.data.BookingAndStatusPair;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/list-confirmed")
public class confirmedServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    String user_id = jsonObj.get("user_id").getAsString();

    System.out.println("user_id is " + user_id);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Filter customerStatusFilter = new FilterPredicate("customer_id", FilterOperator.EQUAL, user_id);
    Filter providerStatusFilter = new FilterPredicate("provider_id", FilterOperator.EQUAL, user_id);
    Filter confirmedStatusFilter = new FilterPredicate("booking_is_confirmed_provider", FilterOperator.EQUAL, true);
    Filter confirmedAndCustomerStatusFilter = CompositeFilterOperator.and(customerStatusFilter, confirmedStatusFilter); 
    Filter confirmedAndProviderStatusFilter = CompositeFilterOperator.and(providerStatusFilter, confirmedStatusFilter);
    
    Query confirmedAndCustomerStatusQuery = new Query("Booking").setFilter(confirmedAndCustomerStatusFilter);
    PreparedQuery confirmedAndCustomerStatusResults = datastore.prepare(confirmedAndCustomerStatusQuery);
    List<BookingAndStatusPair> bookingAndStatusPairList = new ArrayList<>();

    for (Entity entity : confirmedAndCustomerStatusResults.asIterable()) {
      System.out.println("Inside confirmedAndCustomerStatusResults");

      String booking_id = "" + entity.getKey().getId();
      String service_id = (String) entity.getProperty("service_id");
      String customer_id = (String) entity.getProperty("customer_id");
      String provider_id = (String) entity.getProperty("provider_id");
      Boolean is_confirmed_customer = (boolean) entity.getProperty("booking_is_confirmed_customer");
      Boolean is_confirmed_provider = (boolean) entity.getProperty("booking_is_confirmed_provider");
      String booking_name = (String) entity.getProperty("booking_name");
      String booking_date = (String) entity.getProperty("booking_date");
      String booking_duration = (String) entity.getProperty("booking_duration");
      String booking_optional_note = (String) entity.getProperty("booking_optional_note");
      String booking_price = (String) entity.getProperty("booking_price");
      long timestamp = (long) entity.getProperty("timestamp");

      Booking booking = new Booking(booking_id, service_id, booking_name, booking_date, booking_duration, booking_optional_note, customer_id, provider_id, is_confirmed_customer, is_confirmed_provider, booking_price, timestamp);
      bookingAndStatusPairList.add(new BookingAndStatusPair(booking, "customer"));
    }
    
    System.out.println("LINE 74 LOG:");
    System.out.println("List consists of " + bookingAndStatusPairList.size() + " pairs");
    for (BookingAndStatusPair pair : bookingAndStatusPairList) {
        System.out.println(pair.toString());
    }

    Query confirmedAndProviderStatusQuery = new Query("Booking").setFilter(confirmedAndProviderStatusFilter);
    PreparedQuery confirmedAndProviderStatusResults = datastore.prepare(confirmedAndProviderStatusQuery);

    for (Entity entity : confirmedAndProviderStatusResults.asIterable()) {
      System.out.println("Inside confirmedAndProviderStatusResults");

      String booking_id = "" + entity.getKey().getId();
      String service_id = (String) entity.getProperty("service_id");
      String customer_id = (String) entity.getProperty("customer_id");
      String provider_id = (String) entity.getProperty("provider_id");
      Boolean is_confirmed_customer = (boolean) entity.getProperty("booking_is_confirmed_customer");
      Boolean is_confirmed_provider = (boolean) entity.getProperty("booking_is_confirmed_provider");
      String booking_name = (String) entity.getProperty("booking_name");
      String booking_date = (String) entity.getProperty("booking_date");
      String booking_duration = (String) entity.getProperty("booking_duration");
      String booking_optional_note = (String) entity.getProperty("booking_optional_note");
      String booking_price = (String) entity.getProperty("booking_price");
      long timestamp = (long) entity.getProperty("timestamp");

      Booking booking = new Booking(booking_id, service_id, booking_name, booking_date, booking_duration, booking_optional_note, customer_id, provider_id, is_confirmed_customer, is_confirmed_provider, booking_price, timestamp);
      bookingAndStatusPairList.add(new BookingAndStatusPair(booking, "provider"));
    }

    System.out.println("LINE 103 LOG:");
    System.out.println("List consists of " + bookingAndStatusPairList.size() + " pairs");
    for (BookingAndStatusPair pair : bookingAndStatusPairList) {
        System.out.println(pair.toString());
    }

    Gson gson = new Gson();
    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(bookingAndStatusPairList));
  }
}
