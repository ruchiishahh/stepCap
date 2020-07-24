// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Booking;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing booked services. 
 * 
 * TODO: finish implementing the doGet method.
*/
@WebServlet("/list-services")
public class ListBookedServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Query query = new Query("Booking").addSort("timestamp", SortDirection.DESCENDING);

    PreparedQuery results = datastore.prepare(query);
    System.out.println("first");
    System.out.println(results);

    List<Booking> bookings = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      System.out.println("HERE");
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
      bookings.add(booking);
    }
    
    Gson gson = new Gson();
    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(bookings));
  }
}
