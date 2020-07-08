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
public class BookNowServlet extends HttpServlet {

  /** Get the datastore. */
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String name = request.getParameter("serviceName");
    String description = request.getParameter("serviceDesc");
    //TODO obtain provider ID from current user id
    long providerId;
    long averageRating = request.getParameter("averageRating");

    //TODO implement dynamic Service creation
    Entity service = new Entity("Service");
    service.setProperty("name", "Tutoring");
    service.setProperty("description", "I am a tutor at UC Berkeley and I tutor CS61B");
    service.setProperty("provider", 123456789);
    service.setProperty("averageRating", 4.0);

    datastore.put(service);
  }
}
