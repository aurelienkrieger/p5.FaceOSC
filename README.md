# p5.FaceOSC
Extract facial keypoints and send over OSC

adapted from [p5js-osc](https://github.com/genekogan/p5js-osc) by Gene Kogan.

## setup

1) install [node](https://nodejs.org/)

2) install dependencies

```
	git https://github.com/aurelienkrieger/p5.FaceOSC
	cd p5.FaceOSC
    npm install
```

3) run the websocket

  node bridge.js

This command runs the file in this repo called "bridge.js", it runs on the server. Is is a javascript file that creates a connection using <a href="http://socket.io/">socket.io.</a> This file creates a listener on the server, which is where the computer is listening for packets sent using UDP. Any computer can support sending and receiving network packets, eg. it can request info, by sending an http request (UDP).

(What is socket.io? Socket is one of the most common node modules which facilitates communication between the client and the server. bridge.js converts into socket which then passes it to OSC)

We need to use something like OSC because p5js (unlike processing) does not have access to the drivers in your computer. This is for good reason, we wouldn't want javascript on a server to be able to access your drivers eh? So if you want to use something like p5 and the kinect, you need to send the data from the device, which needs access to your computer's drivers, and then send it to p5js over OSC (which is actually via UDP). So your computer is being both the server (node) and the client (p5).

If you then open any of the index.html pages in the folders of the repo. You may need to <a href="http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/">start a local server</a> if you start using video or images etc. in your sketch.

When you open index.html from a sketch in a browser, it connects to bridge.js.

Note: if you try to reload the index.html page in the browser. You'll notice you get an error and node will stop running. When you start node, the server communicates with your application over a particular port. It only allows one application to connect over a single port and it won't let anything else connect to it. So when you reload, you are not actually closing the connection, and node thinks you are another application trying to connect and will crash. So for now, you have to restart node everytime you refresh your browser (do this in the terminal where you are running bridge CRL-c to quit and then relaunch using as before:

	`node bridge.js`

## mesh map

This is just sending 16 x-y coordinates around the eyes, noise and mouth. See the [mesh map](https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/mesh_map.jpg) for full integration of the facial keypoints.

## examples

*Processing:*
- needs oscP5 library
- receive facial keypoints and display them as ellipses.

*Wekinator:*
- receives facial keypoints
- can be used to train a classifier or regression model
