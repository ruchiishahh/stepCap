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


@WebServlet("/service-handler")
public class ServiceServlet extends HttpServlet {
  //TODO change to toPost
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    System.out.println("inside service handler servlet");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    
    String name = jsonObj.get("service_name").getAsString().toLowerCase();
    System.out.println(name);
    String overview = jsonObj.get("service_overview").getAsString();
    System.out.println(overview);
    String highlights = jsonObj.get("service_highlights").getAsString();
    System.out.println(highlights);
    String price = jsonObj.get("service_price").getAsString();
    System.out.println(price);
    int travel_options = jsonObj.get("service_needs_traveling").getAsInt();
    System.out.println(travel_options);
    String duration = jsonObj.get("service_duration").getAsString();
    System.out.println(duration);
    String requirements = jsonObj.get("service_requirements").getAsString();
    System.out.println(requirements);
    long provider_id = jsonObj.get("provider_id").getAsLong();

    Entity service = new Entity("Service");
    service.setProperty("service_name", name);
    service.setProperty("service_overview", overview);
    service.setProperty("service_highlights", highlights);
    service.setProperty("service_duration", duration);
    service.setProperty("service_price", price);
    service.setProperty("service_requirements", requirements);
    service.setProperty("service_travel_options", travel_options);
    service.setProperty("provider_id", provider_id);
    service.setProperty("average_rating", 5.0);
    System.out.println(service);
    datastore.put(service);

    Gson gson = new Gson();
    String[] responses = new String[3]; 
    responses[0] = "success";
    String createServiceResponse = gson.toJson(responses);
    response.setContentType("application/json");
    response.getWriter().println(createServiceResponse);
  }
}
