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

@WebServlet("/search-handler")
public class SearchHandler extends HttpServlet {

  /** Java object converter. */
  private static final Gson gson = new Gson();

  /** Get the datastore. */
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    String input = jsonObj.get("input").getAsString().toUpperCase();

    Query query = new Query("Service");
    if (!input.equals("")) {
       Filter inputFilter = new FilterPredicate("service_name", FilterOperator.GREATER_THAN_OR_EQUAL, input);
       query.setFilter(inputFilter);
    }


    PreparedQuery results = datastore.prepare(query);
    List<Entity> resultsList = results.asList(FetchOptions.Builder.withLimit(20));

    List<Service> services = new ArrayList<>();
    for (Entity entity : resultsList) {
      long service_id = entity.getKey().getId();
      String service_name = (String) entity.getProperty("service_name");
      String service_description = (String) entity.getProperty("service_description");
      long provider_id = (long) entity.getProperty("provider_id");
      Double average_rating = (Double) entity.getProperty("average_rating");

      Service service = new Service(service_id, service_name, service_description, provider_id, average_rating);
      services.add(service);
    }

    response.setContentType("application/json;");
    String json = gson.toJson(services);
    response.getWriter().println(json);
  }
}
