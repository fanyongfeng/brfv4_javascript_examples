(function exampleCode() {
	"use strict";

	var _faceDetectionRoi = new brfv4.Rectangle();
  var $faceWrapper = null;

	brfv4Example.initCurrentExample = function(brfManager, resolution) {

		brfManager.init(resolution, resolution, brfv4Example.appId);

		// We explicitly set the mode to run in: BRFMode.FACE_DETECTION.

		brfManager.setMode(brfv4.BRFMode.FACE_DETECTION);

		// Then we limit the face detection region of interest to be in the central
		// part of the overall analysed image (green rectangle).

		_faceDetectionRoi.setTo(
			resolution.width * 0.25, resolution.height * 0.10,
			resolution.width * 0.50, resolution.height * 0.80
		);
    const img = document.createElement('img');
    $faceWrapper = img;
    img.src = 'assets/pic_facefocus.svg';
    img.id = 'face-wrapper';
    img.class = "face-img"
    img.style = "width: 85%;height: 85%;position: absolute;top: 50%;left: 50%;transform: translate3d(-50%, -50%, 0);";
    brfv4Example.dom.addElement(img, '_content');

		brfManager.setFaceDetectionRoi(_faceDetectionRoi);

		// We can have either a landscape area (desktop), then choose height or
		// we can have a portrait area (mobile), then choose width as max face size.

		var maxFaceSize = _faceDetectionRoi.height;

		if(_faceDetectionRoi.width < _faceDetectionRoi.height) {
			maxFaceSize = _faceDetectionRoi.width;
		}

		// Merged faces (yellow) will only show up if they are at least 30% of maxFaceSize.
		// Move away from the camera to see the merged detected faces (yellow) disappear.

		// Btw. the following settings are the default settings set by BRFv4 on init.

		brfManager.setFaceDetectionParams(maxFaceSize * 0.30, maxFaceSize * 0.90, 12, 8);
	};

	brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {

		brfManager.update(imageData);

		// Drawing the results:

		draw.clear();

		// // Show the region of interest (green).

		// draw.drawRect(_faceDetectionRoi,					false, 2.0, 0x8aff00, 0.5);

		// // Then draw all detected faces (blue).

		// draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x00a1ff, 0.5);

		// // In the end add the merged detected faces that have at least 12 detected faces
		// // in a certain area (yellow).

		// draw.drawRects(brfManager.getMergedDetectedFaces(),	false, 2.0, 0xffd200, 1.0);

		// // Now print the face sizes:

		printSize(brfManager.getMergedDetectedFaces(), false);
	};

	function printSize(rects, printAlwaysMinMax) {

		var maxWidth = 0;
		var minWidth = 9999;

		for(var i = 0, l = rects.length; i < l; i++) {

			if(rects[i].width < minWidth) {
				minWidth = rects[i].width;
			}

			if(rects[i].width > maxWidth) {
				maxWidth = rects[i].width;
			}
		}

		if(maxWidth > 0) {
      $faceWrapper.classList.remove('show');
      $faceWrapper.classList.add('hide');
		} else {
      $faceWrapper.classList.remove('hide');
      $faceWrapper.classList.add('show');
    }
	}
})();