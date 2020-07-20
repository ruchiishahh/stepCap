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


@WebServlet("/service-handler")
public class ServiceServlet extends HttpServlet {


  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  //TODO change to toPost
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    
    String name = jsonObj.get("service_name").getAsString().toLowerCase();
    String overview = jsonObj.get("service_overview").getAsString();
    String highlights = jsonObj.get("service_highlights").getAsString();
    String price = jsonObj.get("service_price").getAsString();
    int travel_options = jsonObj.get("service_needs_traveling").getAsInt();
    String duration = jsonObj.get("service_duration").getAsString();
    String requirements = jsonObj.get("service_requirements").getAsString();

    Entity service = new Entity("Service");
    service.setProperty("service_name", name);
    service.setProperty("service_overview", description);
    service.setProperty("service_highlights", description);
    service.setProperty("service_duration", description);
    service.setProperty("service_price", description);
    service.setProperty("service_requirements", description);
    service.setProperty("provider_id", 154829301);
    service.setProperty("average_rating", 5.0);
    datastore.put(service);

    Gson gson = new Gson();
    String[] responses = new String[3]; 
    responses[0] = "success";
    String createServiceResponse = gson.toJson(responses);
    response.setContentType("application/json");
    response.getWriter().println(createServiceResponse);
  }
}
