package com.google.sps.servlets;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.stream.Collectors;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;;
import org.json.HTTP;
import org.json.JSONObject;
import org.json.JSONException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;
// import com.google.appengine.api.datastore.IncompleteKey;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.sps.data.Service;

@WebServlet("/backend/book-new-service")
public class BookNowServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();

    String customer_id = jsonObj.get("customer_id").getAsString();
    String provider_id = jsonObj.get("provider_id").getAsString();
    String service_id = jsonObj.get("service_id").getAsString();
    String booking_name = jsonObj.get("booking_name").getAsString();
    String booking_date = jsonObj.get("booking_date").getAsString();
    String booking_duration = jsonObj.get("booking_duration").getAsString();
    String booking_optional_note = jsonObj.get("booking_optional_note").getAsString();
    String booking_price = jsonObj.get("booking_price").getAsString();
    boolean booking_is_confirmed_customer = true;
    boolean booking_is_confirmed_provider = false;
    long timestamp = System.currentTimeMillis();

    Entity bookingEntity = new Entity("Booking");
    bookingEntity.setProperty("customer_id", customer_id);
    bookingEntity.setProperty("provider_id", provider_id);
    bookingEntity.setProperty("service_id", service_id);
    bookingEntity.setProperty("booking_name", booking_name);
    bookingEntity.setProperty("booking_date", booking_date);
    bookingEntity.setProperty("booking_duration", booking_duration);
    bookingEntity.setProperty("booking_optional_note", booking_optional_note);
    bookingEntity.setProperty("booking_price", booking_price);
    bookingEntity.setProperty("booking_is_confirmed_customer", booking_is_confirmed_customer);
    bookingEntity.setProperty("booking_is_confirmed_provider", booking_is_confirmed_provider);
    bookingEntity.setProperty("booking_created", timestamp);
    System.out.println(bookingEntity);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(bookingEntity);

    Gson gson = new Gson();
    String[] bookingResponse = new String[1]; 
    bookingResponse[0] = "yeet";
    
    String bookNowServletResponse = gson.toJson(bookingResponse);
    response.setContentType("application/json;");
    response.getWriter().println(bookNowServletResponse);
    
  }
}