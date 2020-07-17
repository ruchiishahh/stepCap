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

    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    
    String name = jsonObj.get("review_name").getAsString();
    String description = jsonObj.get("review_description").getAsString();
    //TODO obtain service ID from current service
    long serviceId;
    Double review_rating;
    long timestamp = System.currentTimeMillis();

    System.out.println("Here is the review name" + name);
    System.out.println("Here is the review description" + description);
    
    //TODO implement dynamic Review creation
    Entity review = new Entity("Review");
    review.setProperty("review_name", name);
    review.setProperty("review_description", description);
    review.setProperty("service_id", 154829301);
    review.setProperty("review_rating", 4.0);
    review.setProperty("timestamp", timestamp);
    datastore.put(review);

    response.sendRedirect("/");
  }
}
