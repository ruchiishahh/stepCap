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
    Query query = new Query("Booking").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Booking> bookings = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      long booking_id = entity.getKey().getId();
      String booking_name = (String) entity.getProperty("booking_name");
      String booking_date = (String) entity.getProperty("booking_date");
      int booking_duration = (int) entity.getProperty("booking_duration");
      String booking_description = (String) entity.getProperty("booking_description");
      int booking_price = (int) entity.getProperty("booking_price");
      long timestamp = (long) entity.getProperty("timestamp");
      
      Booking booking = new Booking(booking_id, booking_name, booking_date, booking_duration, booking_description, booking_price, timestamp);
      bookings.add(booking);
    }
    
    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(bookings));
  }
}
