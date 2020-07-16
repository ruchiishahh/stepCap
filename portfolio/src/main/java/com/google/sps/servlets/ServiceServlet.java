package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;;
import com.google.sps.data.Service;
import java.io.IOException;
import java.util.stream.Collectors;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/** Servlet responsible for handling memes. */
@WebServlet("/service-handler")
public class ServiceServlet extends HttpServlet {

  /** Get the datastore. */
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  //TODO change to toPost
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    
    String name = jsonObj.get("service_name").getAsString().toLowerCase();
    String description = jsonObj.get("service_description").getAsString();
    //TODO obtain provider ID from current user id
    long providerId;
    long averageRating;

    System.out.println(name);
    System.out.println(description);
    
    //TODO implement dynamic Service creation
    Entity service = new Entity("Service");
    service.setProperty("service_name", name);
    service.setProperty("service_description", description);
    service.setProperty("provider_id", 154829301);
    service.setProperty("average_rating", 4.0);
    datastore.put(service);

    response.sendRedirect("/");
  }
}
