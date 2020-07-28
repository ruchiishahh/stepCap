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
import com.google.sps.data.Review;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/list-user-reviews")
public class ListUserReviews extends HttpServlet {
  private static final Gson gson = new Gson();
  
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    String user_id = jsonObj.get("user_id").getAsString();

    System.out.println("user_id is " + user_id);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Filter userIdFilter = new FilterPredicate("user_id", FilterOperator.EQUAL, user_id);

    Query query = new Query("Review").setFilter(userIdFilter);
    PreparedQuery results = datastore.prepare(query);
    List<Review> reviews = new ArrayList<>();

    for (Entity entity : results.asIterable()) {
        long review_id = entity.getKey().getId();
        String review_name = (String) entity.getProperty("review_name");
        String review_description = (String) entity.getProperty("review_description");
        String service_name = (String) entity.getProperty("service_name");
        Double review_rating = (Double) entity.getProperty("review_rating");
        long timestamp = (long) entity.getProperty("timestamp");
        String customer_id = (String) entity.getProperty("customer_id");
        String provider_id = (String) entity.getProperty("provider_id");
        
        Review review = new Review(review_id, service_id, customer_id, provider_id, review_name, review_description, service_name, review_rating, timestamp);
        reviews.add(review);
    }

    response.setContentType("application/json;");
    String json = gson.toJson(reviews);
    response.getWriter().println(json);
  }
}
