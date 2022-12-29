/* eslint-disable */

function BlockViewport() {
	this.params = {}

	this.init();
}

BlockViewport.prototype.init = function () {
	console.log('wavy');

	create_elements();
}

function create_elements() {
	console.log("create elements()");

	// element properties
	let element_distance = 75; // px
	let element_size = 10; // px

	// calculate number of elements via window size
	let no_of_elements_x = window.screen.availWidth / (element_distance + element_size);
	let no_of_elements_y = window.screen.availHeight / (element_distance + element_size);

	for (i = 1; i <= no_of_elements_y; i++) {
		// calculate top position of element
		position_y = i * element_distance;

		for (j = 1; j <= no_of_elements_x; j++) {
			// calculate left position of element
			position_x = j * element_distance;

			// create element and set properties
			let div = document.createElement("div");
			div.classList.add('div_element');
			div.style.top = position_y + 'px';
			div.style.left = position_x + 'px';
			div.style.height = element_size + 'px';
			div.style.width = element_size + 'px';
			document.body.appendChild(div);
		}
	}
}