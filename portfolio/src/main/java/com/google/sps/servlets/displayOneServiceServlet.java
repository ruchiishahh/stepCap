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

/** Servlet responsible for handling memes. */
@WebServlet("/service-info")
public class displayOneServiceServlet extends HttpServlet {

  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  private String capitalize(final String line) {
      return Character.toUpperCase(line.charAt(0)) + line.substring(1);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();

    long service_id = jsonObj.get("service_id").getAsLong();
    // long provider_id = jsonObj.get("provider_id").getAsLong();

    System.out.println(service_id);
    // System.out.println(provider_id);
    Key newKey = KeyFactory.createKey("Service", service_id);

    // Entity service = new Entity();
    
    try {
        Entity service = datastore.get(newKey);
        System.out.println(service.toString());

        // long service_id_new = service.getKey().getId();
        String service_name = capitalize((String) service.getProperty("service_name"));
        String service_description = (String) service.getProperty("service_description");
        long provider_id = (long) service.getProperty("provider_id");
        Double average_rating = (Double) service.getProperty("average_rating");
        Service serviceObj = new Service(service_id, service_name, service_description, provider_id, average_rating);

        Gson gson = new Gson();
        String serviceInfo = gson.toJson(serviceObj);
        response.setContentType("application/json;");
        response.getWriter().println(serviceInfo);
    } catch (EntityNotFoundException e){
        System.out.println("entity not found");
        Gson gson = new Gson();
        String[] failureResponse = new String[1]; 
        failureResponse[0] = "failure";
        String displayOneServiceResponse = gson.toJson(failureResponse);
        response.getWriter().println(displayOneServiceResponse);
    }
    
  

  }
}
