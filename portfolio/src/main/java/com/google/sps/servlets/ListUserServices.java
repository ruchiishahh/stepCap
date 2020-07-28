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

@WebServlet("/list-user-services")
public class ListUserServices extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    String user_id = jsonObj.get("user_id").getAsString();

    System.out.println("user_id is " + user_id);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Filter userIdFilter = new FilterPredicate("provider_id", FilterOperator.EQUAL, Long.parseLong(user_id));
    
    // TODO: Error is provider_id is long and user_id is String

    
    Query query = new Query("Service").setFilter(userIdFilter);
    PreparedQuery results = datastore.prepare(query);
    List<Service> services = new ArrayList<>();

    for (Entity entity : results.asIterable()) {
      System.out.println("LINE 50 LOG");

      long service_id = entity.getKey().getId();
      String service_name = (String) entity.getProperty("service_name");
      String service_overview = (String) entity.getProperty("service_overview");
      long provider_id = (long) entity.getProperty("provider_id");
      Double average_rating = (Double) entity.getProperty("average_rating");

      // TODO: Change hard-coded properties
      Service service = new Service(service_id, service_name, service_overview, "", "", provider_id, average_rating, "", "", 0);
      services.add(service);
    }

    Gson gson = new Gson();
    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(services));
  }
}
