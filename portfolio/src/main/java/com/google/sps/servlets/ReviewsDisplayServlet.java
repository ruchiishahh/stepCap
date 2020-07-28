// package com.google.sps.servlets;

// import com.google.appengine.api.datastore.DatastoreService;
// import com.google.appengine.api.datastore.DatastoreServiceFactory;
// import com.google.appengine.api.datastore.Entity;
// import com.google.appengine.api.datastore.FetchOptions;
// import com.google.appengine.api.datastore.Key;
// import com.google.appengine.api.datastore.PreparedQuery;
// import com.google.appengine.api.datastore.Query;
// import com.google.appengine.api.datastore.Query.CompositeFilter;
// import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
// import com.google.appengine.api.datastore.Query.Filter;
// import com.google.appengine.api.datastore.Query.FilterOperator;
// import com.google.appengine.api.datastore.Query.FilterPredicate;
// import com.google.appengine.api.datastore.Query.SortDirection;
// import com.google.gson.Gson;
// import com.google.gson.JsonElement;
// import com.google.gson.JsonObject;
// import com.google.gson.JsonParser;;
// import com.google.sps.data.Service;
// import com.google.sps.data.Review;
// import java.io.IOException;
// import java.util.stream.Collectors;
// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.List;
// import javax.servlet.annotation.WebServlet;
// import javax.servlet.http.HttpServlet;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// @WebServlet("/reviews-displayer")
// public class ReviewsDisplayServlet extends HttpServlet {
//   private static final Gson gson = new Gson();
  
//   @Override
//   public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
//     //System.out.println("I'm in DOGET of ReviewsDisplay");
//     Query query = new Query("Review").addSort("timestamp", SortDirection.DESCENDING);

//     DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
//     PreparedQuery results = datastore.prepare(query);

//     List<Review> reviews = new ArrayList<>();
//     for (Entity entity : results.asIterable()) {
//         long review_id = entity.getKey().getId();
//         String review_name = (String) entity.getProperty("review_name");
//         //System.out.println("In get method review_name: " + review_name);
//         String review_description = (String) entity.getProperty("review_description");
//         String service_name = (String) entity.getProperty("service_name");
//         //long service_id = (Long) entity.getProperty("service_id");
//         Double review_rating = (Double) entity.getProperty("review_rating");
//         long timestamp = (long) entity.getProperty("timestamp");
        
//         Review review = new Review(review_id, provider_id, customer_id, review_name, review_description, service_name, review_rating, timestamp);
//         reviews.add(review);
//     }

//     response.setContentType("application/json;");
//     String json = gson.toJson(reviews);
//     response.getWriter().println(json);
//   }
// }
