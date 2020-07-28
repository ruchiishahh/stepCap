package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.sps.data.Service;
import com.google.sps.data.Review;
import java.io.IOException;
import java.util.stream.Collectors;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/** Servlet responsible for handling Reviews. */
@WebServlet("/reviews-handler")
public class ReviewsServlet extends HttpServlet {

  /** Get the datastore. */
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  //TODO change to toPost
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    System.out.println("Inside ReviewsServlet reviews-handler");
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    
    String name = jsonObj.get("review_name").getAsString();
    String description = jsonObj.get("review_description").getAsString();
    String service_name = jsonObj.get("service_name").getAsString();
    String customer_id = jsonObj.get("customer_id").getAsString();
    String provider_id = jsonObj.get("provider_id").getAsString();
    Double review_rating = jsonObj.get("review_rating").getAsDouble();
    long timestamp = System.currentTimeMillis();

    System.out.println("Here is the review name " + name);
    System.out.println("Here is the review description " + description);
    System.out.println("Here is service_name " + service_name);
    System.out.println("Here is customer_id " + customer_id);
    System.out.println("Here is provider_id " + provider_id);
    System.out.println("Here is review_rating " + review_rating);
    System.out.println("Here is timestamp " + timestamp);
    

    Entity review = new Entity("Review");
    review.setProperty("customer_id", customer_id);
    review.setProperty("provider_id", provider_id);
    review.setProperty("review_name", name);
    review.setProperty("review_description", description);
    review.setProperty("service_name", service_name);
    review.setProperty("review_rating", review_rating);
    review.setProperty("timestamp", timestamp);
    datastore.put(review);
    
    Gson gson = new Gson();
    String[] responses = new String[3]; 
    responses[0] = "success";
    String createReviewResponse = gson.toJson(responses);
    response.setContentType("application/json");
    response.getWriter().println(createReviewResponse);
  }
}
