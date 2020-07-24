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
import com.google.sps.data.User;
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
@WebServlet("/user-info")
public class displayOneUserServlet extends HttpServlet {

  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  private String capitalize(final String line) {
      return Character.toUpperCase(line.charAt(0)) + line.substring(1);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();

    long user_id = jsonObj.get("user_id").getAsLong();

    System.out.println(user_id);

    Key newKey = KeyFactory.createKey("User", user_id);

    
    try {
        Entity user = datastore.get(newKey);
        System.out.println(user.toString());

        String user_firstname = capitalize((String) user.getProperty("firstname"));
        String user_lastname = capitalize((String) user.getProperty("lastname"));
        String user_email = (String) user.getProperty("email");
        String user_phone = (String) user.getProperty("phone_number");
        Double average_rating = (Double) user.getProperty("average_rating");
        User userObj = new User(user_id, user_firstname,  user_lastname, user_email, user_phone, average_rating);

        Gson gson = new Gson();
        String userInfo = gson.toJson(userObj);
        response.setContentType("application/json;");
        response.getWriter().println(userInfo);
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
