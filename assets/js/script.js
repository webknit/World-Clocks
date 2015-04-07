(function () {

	var jsonData;
	var code = "";

	$.ajax({
	    url: 'zones.json',
	    dataType: 'json',
	    success: function(response) {

	        jsonData = response;

	        for(i = 0; i < jsonData.length; i++) {

				code += "<li class='time-zones__item' id='" + jsonData[i].id + "'><div class='time-zones__wrapper'><div class='clock " + jsonData[i].jsclass + "'><div class='clock__container clock__container--hours'><div class='clock__hours'></div></div><div class='clock__container clock__container--mins'><div class='clock__mins'></div></div><div class='clock__container clock__container--seconds'><div class='clock__seconds'></div></div></div><h2 class='time-zones__title'>" + jsonData[i].name + "</h2></div></li>";

			}

			document.getElementById('test').innerHTML = code;

	        init();
	    }

	});

	function init() {

		startInternationalClocks();
		moveSecondHands();
		setUpMinuteHands();

	}

	function internationlTimes() {

		// https://raw.githubusercontent.com/moment/moment-timezone/develop/data/packed/latest.json

		moment.tz.add([
			'Eire|GMT IST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00',
			'Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00',
			"Asia/Hong_Kong|LMT HKT HKST JST|-7A.G -80 -90 -90|0121312121212121212121212121212121212121212121212121212121212121212121|-2CFHA.G 1sEP6.G 1cL0 ylu 93X0 1qQu 1tX0 Rd0 1In0 NB0 1cL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1kL0 14N0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0",
			'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0',
			"America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp0 1Vb0 3dB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0"
		]);

		var now = new Date();

		var times = [];

		function newTime(jsclass, jstime) {

			this.jsclass = jsclass;
			this.jstime = jstime;

		}

		for(i=0; i < jsonData.length; i++) {

			times.push(new newTime(jsonData[i].jsclass, moment.tz(now, jsonData[i].langcode)));

		}

		return times;

	}

	function startInternationalClocks() {

		var times = internationlTimes();

		for (i = 0; i < times.length; i++) {

			var ampm = times[i].jstime.format('a');
			var hours = times[i].jstime.format('h');
		    var mins = times[i].jstime.format('mm');
		    var seconds = times[i].jstime.format('s');

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

			for(j = 0; j < hands.length; j++) {

				var elm = document.getElementById(times[i].jsclass);

				if(ampm === 'am') {

					elm.style.backgroundColor = "#B8E8FF";

				}

				else { 

					elm.style.backgroundColor = "#AFD9ED";

				}

				var elements = document.querySelectorAll('.' + times[i].jsclass + ' .' + hands[j].hand);

				for(c = 0; c < elements.length; c++) {

					// For webkit browsers
					elements[c].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
					elements[c].style.transform = 'rotateZ('+ hands[j].angle +'deg)';

					// If this is a minute hand, note the seconds position (to calculate minute position later)
					if (hands[j].hand === 'clock__mins') {

						elements[c].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);

					}

				}

			}

		}

	}

	function startLocalClock() {

		var date = new Date();
		var seconds = date.getSeconds();
		var mins = date.getMinutes();
		var hours = date.getHours();

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

			var elements = document.querySelectorAll('.local .' + hands[i].hand);

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
		
	}

	function setUpMinuteHands() {

		// Find out how far into the minute we are
		var containers = document.querySelectorAll('.clock .clock__container--mins');
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

	//init();

})();