let socket;
let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);

  // Create the video & facemesh
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  facemesh = ml5.facemesh(video, modelReady);

  // oscPortIn, oscPortOut
  setupOsc(0, 8000);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  background(250);
  processKeypoints();
}

// Draw facial keypoints & send OSC message
function processKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    let keypoints = predictions[i].scaledMesh;

    // Send faciel keypoints over OSC
    sendOsc("/wek/inputs", [keypoints[1][0], keypoints[1][1],     // NOISE
                            keypoints[6][0], keypoints[6][1],
                            keypoints[33][0], keypoints[33][1],   // LEFT EYE
                            keypoints[159][0], keypoints[159][1],
                            keypoints[133][0], keypoints[133][1],
                            keypoints[145][0], keypoints[145][1],
                            keypoints[362][0], keypoints[362][1], // RIGHT EYE
                            keypoints[386][0], keypoints[386][1],
                            keypoints[263][0], keypoints[263][1],
                            keypoints[374][0], keypoints[374][1],
                            keypoints[57][0], keypoints[57][1],   // MOUTH
                            keypoints[73][0], keypoints[73][1],
                            keypoints[303][0], keypoints[303][1],
                            keypoints[287][0], keypoints[287][1],
                            keypoints[404][0], keypoints[404][1],
                            keypoints[180][0], keypoints[180][1]
                            ]);

    // Draw facial keypoints
    for (let j = 0; j < keypoints.length; j += 1) {
      let [x, y] = keypoints[j];
      fill(0);
      ellipse(x, y, 1, 1);
    }
  }
}

//  --------- OSC setup ----------

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
  console.log(msg);
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
