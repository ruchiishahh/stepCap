package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import java.io.IOException;
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
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // String name = request.getParameter("service_name").toLowerCase();
    // String description = request.getParameter("service_description");
    //TODO obtain provider ID from current user id
    long providerId;
    long averageRating;

    //TODO implement dynamic Service creation
    Entity service = new Entity("Service");
    service.setProperty("service_name", "basketball coach");
    service.setProperty("service_description", "I am a Plumber. ");
    service.setProperty("provider_id", 154829301);
    service.setProperty("average_rating", 4.0);
    datastore.put(service);

    response.sendRedirect("/");
  }
}
