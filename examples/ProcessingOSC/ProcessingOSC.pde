import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

Object[] keypoints;

void setup() {
  size(640, 480);
  /* incoming port */
  oscP5 = new OscP5(this, 8000);
  /* outcoming port */
  myRemoteLocation = new NetAddress("127.0.0.1", 12000);
}


void draw() {
  background(0);
  
  if (keypoints != null) {
      // Loop through the array of objects
      for (int i = 0; i < keypoints.length; i += 2) {
        // Extract x and y coordinates
        try{
          float x = ((Float) keypoints[i]).floatValue();
          float y = ((Float) keypoints[i + 1]).floatValue();
          // Display the points on screen with ellipses
          fill(250);
          ellipse(x, y, 10, 10);
        }
        catch (ClassCastException e) {
          // Handle the exception, e.g., print an error message or take appropriate action
          println("Error: " + e.getMessage());
        }
      }
    }
}

void oscEvent(OscMessage theOscMessage) {
  /* check if theOscMessage has the address pattern we are looking for. */
  if(theOscMessage.checkAddrPattern("/wek/inputs")==true) {
    keypoints = theOscMessage.arguments();
  } 
  println("### received an osc message. with address pattern "+theOscMessage.addrPattern());
}
