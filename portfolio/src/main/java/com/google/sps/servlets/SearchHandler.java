package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/search-handler")
public class SearchHandler extends HttpServlet {

  /** Java object converter. */
  private static final Gson gson = new Gson();


  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    //TODO implement Services entity in datastore
    ArrayList<String> services = new ArrayList<>(Arrays.asList("Erin", "Ruchi", "Owen", "Everest"));

    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();
    String input = jsonObj.get("input").getAsString();

    System.out.println(input);
    ArrayList<String> filteredServices = new ArrayList<>();

    for (String word: services) {
      if (word.contains(input)) {
          filteredServices.add(word);
      }
    }

    response.setContentType("application/json;");
    String json = gson.toJson(filteredServices);
    response.getWriter().println(json);
  }
}
