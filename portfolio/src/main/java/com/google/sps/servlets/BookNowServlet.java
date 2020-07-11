package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for storing data of a service after BookNow is clicked.
 * TODO: finish implementing doPost method
 */

@WebServlet("/book-new-service")
public class BookNowServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String booking_name = request.getParameter("booking_name");
    String booking_date = request.getParameter("booking_date");
    long booking_duration = Long.parseLong(request.getParameter("booking_duration"));
    String booking_description = request.getParameter("booking_description");
    long booking_price = Long.parseLong(request.getParameter("booking_price"));
    long timestamp = System.currentTimeMillis();
    
    System.out.println("NAME: " + booking_name);
    System.out.println("DATE: " + booking_date);
    System.out.println("DESC: " + booking_description);
    System.out.println("DURATION: " + booking_duration);
    System.out.println("PRICE: " + booking_price);



    Entity bookingEntity = new Entity("Booking");
    bookingEntity.setProperty("booking_name", booking_name);

    bookingEntity.setProperty("booking_date", booking_date);
    bookingEntity.setProperty("booking_duration", booking_duration);
    bookingEntity.setProperty("booking_description", booking_description);
    bookingEntity.setProperty("booking_price", booking_price);
    
    bookingEntity.setProperty("timestamp", timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(bookingEntity);
    //response.sendRedirect(request.getRequestURI());
    // response.sendRedirect("/BookingForm");
  }
}

// package com.google.sps.servlets;

// import java.io.BufferedReader;
// import java.io.FileReader;
// import java.io.IOException;
// import java.util.stream.Collectors;
// import com.google.gson.Gson;
// import com.google.gson.JsonElement;
// import com.google.gson.JsonObject;
// import com.google.gson.JsonParser;;
// import org.json.HTTP;
// import org.json.JSONObject;
// import org.json.JSONException;
// import javax.servlet.annotation.WebServlet;
// import javax.servlet.http.HttpServlet;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import com.google.appengine.api.blobstore.BlobInfo;
// import com.google.appengine.api.blobstore.BlobInfoFactory;
// import com.google.appengine.api.blobstore.BlobKey;
// import com.google.appengine.api.blobstore.BlobstoreService;
// import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
// import com.google.appengine.api.datastore.DatastoreService;
// import com.google.appengine.api.datastore.DatastoreServiceFactory;
// import com.google.appengine.api.datastore.Entity;
// import com.google.appengine.api.datastore.PreparedQuery;
// import com.google.appengine.api.datastore.Query;
// import com.google.appengine.api.datastore.Query.SortDirection;
// import com.google.appengine.api.datastore.FetchOptions;
// // import com.google.appengine.api.datastore.IncompleteKey;
// import com.google.appengine.api.datastore.Key;
// import com.google.appengine.api.datastore.KeyFactory;
// import com.google.appengine.api.images.ImagesService;
// import com.google.appengine.api.images.ImagesServiceFactory;
// import com.google.appengine.api.images.ServingUrlOptions;

// /** Servlet responsible for storing data of a service after BookNow is clicked.
//  * TODO: finish implementing doPost method
//  */

// @WebServlet("/book-new-service")
// public class BookNowServlet extends HttpServlet {

//   @Override
//   public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
//     String reader = request.getReader().lines().collect(Collectors.joining());
//     JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();



//     String booking_name = jsonObj.get("booking_name").getAsString();
//     String booking_date = jsonObj.get("booking_date").getAsString();;
//     String booking_description = jsonObj.get("booking_description").getAsString();;
//     int booking_duration = jsonObj.get("booking_duration").getAsInt();
//     int booking_price = jsonObj.get("booking_price").getAsInt();

//     System.out.println("NAME: " + booking_name);
//     System.out.println("DATE: " + booking_date);
//     System.out.println("DESC: " + booking_description);
//     System.out.println("DURATION: " + booking_duration);
//     System.out.println("PRICE: " + booking_price);


    
//    // String booking_name = request.getParameter("booking_name");
//     /*
//     String booking_date = request.getParameter("booking_date");
//     int booking_duration = Integer.parseInt(request.getParameter("booking_duration"));
//     String booking_description = request.getParameter("booking_description");
//     int booking_price = Integer.parseInt(request.getParameter("booking_price"));
//     */
//     long timestamp = System.currentTimeMillis();
    

//     Entity bookingEntity = new Entity("Booking");
//     bookingEntity.setProperty("booking_name", booking_name);
//     bookingEntity.setProperty("booking_date", booking_date);
//     bookingEntity.setProperty("booking_duration", booking_duration);
//     bookingEntity.setProperty("booking_description", booking_description);
//     bookingEntity.setProperty("booking_price", booking_price);
    
//     bookingEntity.setProperty("timestamp", timestamp);

//     DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
//     datastore.put(bookingEntity);
//     System.out.println("bookingEntity: " + bookingEntity);
//     //response.sendRedirect(request.getRequestURI());
//     //response.sendRedirect("/BookingForm");
//   }
// }
