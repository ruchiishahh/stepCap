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
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.stream.Collectors;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/log")
public class Log extends HttpServlet {


  /** Get the datastore. */
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    /** Java object converter. */
  private static final Gson gson = new Gson();

  /** Validate a user on login. */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    String user = jsonObj.get("username").getAsString();
    String email = jsonObj.get("email").getAsString();
    String password = jsonObj.get("password").getAsString();

    Filter filter;

    UserService userService = UserServiceFactory.getUserService();

    /** Information to be sent about the user's log status. */
    JsonObject jsonObject = new JsonObject();

    Query query = new Query("User");

    if (!user.isEmpty()) {
        filter = new FilterPredicate("username", FilterOperator.EQUAL, user);
        System.out.println("its a username");
        query.setFilter(filter);

    } else if (!email.isEmpty()) {
        filter = new FilterPredicate("email", FilterOperator.EQUAL, email);
        query.setFilter(filter);

        System.out.println("its an email");
    } else {
        System.out.println("its neither...");
    }
      try {
        PreparedQuery singleUser = datastore.prepare(query);
        Entity result = singleUser.asSingleEntity();
        Long id = result.getKey().getId();

        String username = (String) result.getProperty("username");
        String firstname = (String) result.getProperty("firstname");
        String lastname = (String) result.getProperty("lastname");
        String user_email = (String) result.getProperty("email");
        String pass = (String) result.getProperty("password");
        String phone = (String) result.getProperty("phone_number");
        Double average_rating = (Double) result.getProperty("average_rating");

        jsonObject.addProperty("user_id", id);
        jsonObject.addProperty("username", username);
        jsonObject.addProperty("firstname", firstname);
        jsonObject.addProperty("lastname", lastname);
        jsonObject.addProperty("email", user_email);
        jsonObject.addProperty("phone", phone);
        jsonObject.addProperty("average_rating", average_rating);
        jsonObject.addProperty("logged", result.getProperty("password").equals(password));

      } catch (NullPointerException e) {
        jsonObject.addProperty("logged", false);
      }

    response.setContentType("application/json;");
    response.getWriter().println(jsonObject);
  }
} 