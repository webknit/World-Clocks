(function () {

	function init() {

		var date = new Date();
		var hours = date.getHours();
		var mins = date.getMinutes();
		var seconds = date.getSeconds();

		var hands = [
			{
				hand: 'clock__hours',
				angle: (hours * 30) + (mins / 2)
			},
			{
				hand: 'clock__mins',
				angle: (mins * 6)
			},
			{
				hand: 'clock__seconds',
				angle: (seconds * 6)
			}
		];

		for(i = 0; i < hands.length; i++) {

			var elements = document.querySelectorAll('.' + hands[i].hand);

			for(c = 0; c < elements.length; c++) {

				// For webkit browsers
				elements[c].style.webkitTransform = 'rotateZ('+ hands[i].angle +'deg)';
				elements[c].style.transform = 'rotateZ('+ hands[i].angle +'deg)';

				// If this is a minute hand, note the seconds position (to calculate minute position later)
				if (hands[i].hand === 'clock__mins') {

					elements[c].parentNode.setAttribute('data-second-angle', hands[i + 1].angle);

				}

			}

		}

		moveSecondHands();
		setUpMinuteHands();

	}

	function setUpMinuteHands() {

		// Find out how far into the minute we are
		var containers = document.querySelectorAll('.clock__container--mins');
		var secondAngle = containers[0].getAttribute("data-second-angle");

		if (secondAngle > 0) {

			// Set a timeout until the end of the current minute, to move the hand
			var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;

			setTimeout(function() { 

				moveMinuteHands(containers);

			}, delay);

		}

	}

	function moveMinuteHands(containers) {

		for (var i = 0; i < containers.length; i++) {

			containers[i].style.webkitTransform = 'rotateZ(6deg)';
			containers[i].style.transform = 'rotateZ(6deg)';

		}
		// Then continue with a 60 second interval
		setInterval(function() {

			for (var i = 0; i < containers.length; i++) {

				if (containers[i].angle === undefined) {

					containers[i].angle = 12;

				}

				else {

					containers[i].angle += 6;

				}

				containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
				containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';

			}

		}, 60000);

	}

	/*
	* Move the second containers
	*/
	function moveSecondHands() {

		var containers = document.querySelectorAll('.clock__container--seconds');

		setInterval(function() {

		for (var i = 0; i < containers.length; i++) {

			if (containers[i].angle === undefined) {

				containers[i].angle = 6;

			} 

			else {

				containers[i].angle += 6;
			}

			containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
			containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';

			}

		}, 1000);

	}

	init();

})();