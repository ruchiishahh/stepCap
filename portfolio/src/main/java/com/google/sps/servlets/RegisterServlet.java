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


/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/backend/registered")
public class RegisterServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject jsonObj = new JsonParser().parse(reader).getAsJsonObject();

    String username = jsonObj.get("username").getAsString();
    String firstname = jsonObj.get("firstname").getAsString();;
    String lastname = jsonObj.get("lastname").getAsString();;
    String email = jsonObj.get("email").getAsString();
    String password = jsonObj.get("password").getAsString();
    String phone = jsonObj.get("phone").getAsString();

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    // KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
    // Key userKey = datastore.allocateId(keyFactory.newKey());
    // System.out.println(userKey);

    Entity userEntity = new Entity("User");
    userEntity.setProperty("username", username);
    userEntity.setProperty("firstname", firstname);
    userEntity.setProperty("lastname", lastname);
    userEntity.setProperty("email", email);
    userEntity.setProperty("password", password);
    userEntity.setProperty("phone_number", phone);
    userEntity.setProperty("average_rating", 5.0);
    System.out.println(userEntity);
    datastore.put(userEntity);
    
    System.out.println(userEntity.getKey().getId());
    
    Gson gson = new Gson();
    String[] responses = new String[3]; 
    responses[0] = "success";
    responses[1] = "" + userEntity.getKey().getId();
    String registerResponse = gson.toJson(responses);
    response.setContentType("application/json");
    response.getWriter().println(registerResponse);
  }
  
}
