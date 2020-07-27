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
import com.google.sps.data.Users;
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

  /** Write true into the server iff the user is logged in. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    /** Information to be sent about the user's log status. */
    JsonObject jsonObject = new JsonObject();

    if (userService.isUserLoggedIn()) {
      User currentUser = userService.getCurrentUser();
      String logoutUrl = userService.createLogoutURL("/");
      String email = currentUser.getEmail();
      String registered; 

      jsonObject.addProperty("loggedIn", true);
      jsonObject.addProperty("url", logoutUrl);
      jsonObject.addProperty("email", email);

      Query query = new Query("User");
      Filter emailFilter = new FilterPredicate("email", FilterOperator.EQUAL, email);
      query.setFilter(emailFilter);
      try {
        PreparedQuery singleUser = datastore.prepare(query);
        Entity result = singleUser.asSingleEntity();
        Long id = result.getKey().getId();

        registered = (String) result.getProperty("firstname");

        String username = (String) result.getProperty("username");
        String firstname = (String) result.getProperty("firstname");
        String lastname = (String) result.getProperty("lastname");
        String user_email = (String) result.getProperty("email");
        String password = (String) result.getProperty("password");
        String phone = (String) result.getProperty("phone_number");
        Double average_rating = (Double) result.getProperty("average_rating");

        Users user = new Users(id, username, firstname, lastname, user_email, password, phone, average_rating);
        jsonObject.addProperty("userInfo", gson.toJson(user));
      } catch (NullPointerException e) {
        registered = "";
      }
      jsonObject.addProperty("registered", registered);


    } else {
      String loginUrl = userService.createLoginURL("/");

      jsonObject.addProperty("loggedIn", false);
      jsonObject.addProperty("url", loginUrl);
    }

    response.setContentType("application/json;");
    response.getWriter().println(jsonObject);
  }
}