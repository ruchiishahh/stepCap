package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilter;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;;
import com.google.sps.data.Service;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/** Servlet responsible for handling memes. */
@WebServlet("/service-info")
public class displayOneServiceServlet extends HttpServlet {

  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    /*
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();

    long service_id = jsonObj.get("service_id").getAsLong();
    long provider_id = jsonObj.get("provider_id").getAsLong();

    System.out.println(service_id);
    System.out.println(provider_id);

    Key newKey = KeyFactory.createKey("Service", service_id);
    Entity service = datastore.get(newKey);
    System.out.println(newKey.toString());
    System.out.println(service.toString());

    response.setContentType("application/json;");

    Gson gson = new Gson();
    String serviceInfo = gson.toJson(service);
    response.getWriter().println(serviceInfo);
    */
  }
}
