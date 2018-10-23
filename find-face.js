let imageScaleFactor = 0.5;
let outputStride = 32; // 16;
let flipHorizontal = false;
const maxPoseDetections = 2;
const scoreThreshold = 0.2;
const nmsRadius = 30;
const colors = ['red', 'green', 'blue']

let imageElement = document.getElementById('example-photo');

posenet.load().then(function(net){
    //return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
    return net.estimateMultiplePoses(imageElement, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections, scoreThreshold, nmsRadius);
}).then(function(poses){
    console.log(poses);
    for (poseIndex in poses) {
        let pose = poses[poseIndex];
        for (featureNumber in colors) {
            let circle = document.createElement('div');
            let featurePosition = pose.keypoints[featureNumber].position;

            circle.style = `
            background-color: ${colors[featureNumber]};
            width: 10px;
            height: 10px;
            border-radius: 50%;
            position: absolute;
            top: ${featurePosition.y};
            left: ${featurePosition.x};
        `;
            document.body.appendChild(circle);
        }
    }
})
