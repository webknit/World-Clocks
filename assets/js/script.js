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
				if (hands[c].hand === 'minutes') {

					elements[c].parentNode.setAttribute('data-second-angle', hands[i + 1].angle);

				}

			}

		}

	}

	init();

})();