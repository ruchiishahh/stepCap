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
import com.google.sps.data.Provider;
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
@WebServlet("/provider-info")
public class displayOneProviderServlet extends HttpServlet {

  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  private String capitalize(final String line) {
      return Character.toUpperCase(line.charAt(0)) + line.substring(1);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    long provider_id = jsonObj.get("provider_id").getAsLong();

    System.out.println(provider_id);

    Key newKey = KeyFactory.createKey("User", provider_id);

    
    try {
        Entity provider = datastore.get(newKey);
        System.out.println(provider.toString());

        String provider_firstname = capitalize((String) provider.getProperty("firstname"));
        String provider_lastname = capitalize((String) provider.getProperty("lastname"));
        String provider_email = (String) provider.getProperty("email");
        String provider_phone = (String) provider.getProperty("phone_number");
        Double average_rating = (Double) provider.getProperty("average_rating");
        Provider providerObj = new Provider(provider_id, provider_firstname,  provider_lastname, provider_email, provider_phone, average_rating);

        Gson gson = new Gson();
        String providerInfo = gson.toJson(providerObj);
        response.setContentType("application/json;");
        response.getWriter().println(providerInfo);
    } catch (EntityNotFoundException e){
        System.out.println("provider not found");
        Gson gson = new Gson();
        String[] failureResponse = new String[1]; 
        failureResponse[0] = "failure";
        String displayOneServiceResponse = gson.toJson(failureResponse);
        response.getWriter().println(displayOneServiceResponse);
    }
    
  
  }
}
