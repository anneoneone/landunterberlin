/* eslint-disable */

function BlockViewport() {
	this.params = {}

	this.init();
}

BlockViewport.prototype.init = function () {
	console.log('wavy');

	create_elements();
}

/**
 * Generate a string with random rgb colors
 * @returns String with random rgb colors
 */
function get_random_rgb() {
	return 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
}

/**
 * generate a div and place it in DOM
 * @param {*} e_prop element properties
 * @param {*} w_prop window properties
 */
function put_div(e_prop, w_prop) {
	let div = document.createElement("div");
	div.classList.add('div_element');
	div.style.top = e_prop.offset_y + w_prop.padding_y + e_prop.curr_pos_y + 'px';
	div.style.left = e_prop.offset_x + w_prop.padding_x + e_prop.curr_pos_x + 'px';
	div.style.height = e_prop.size + 'px';
	div.style.width = e_prop.size + 'px';
	div.style.backgroundColor = get_random_rgb();
	document.body.appendChild(div);
}

function create_elements() {
	console.log("create elements()");

	// element properties
	let e_prop = {
		distance: 150, // px
		size: 5, // px
		curr_pos_x: 0,
		curr_pos_y: 0,
		offset_x: 0,
		offset_y: 0,
		no_x: 0, // number of elements on x axes
		no_y: 0, // number of elements on y axes
	}

	// window properties
	let w_prop = {
		w_width: window.innerWidth, // window width
		w_height: window.innerHeight, // window width
		padding_y: 60,
		padding_x: 10,
		avail_width: function () {
			return this.w_width - 2 * this.padding_x;
		},
		avail_height: function () {
			return this.w_height - 2 * this.padding_y;
		}
	}

	// calculate accumulated distance for element size and distance between two elements
	let acc_distance = e_prop.distance + e_prop.size;

	// calculate number of elements per row/col
	e_prop.no_x = w_prop.avail_width() / acc_distance | 0; // | 0 is bitwise operator to cut decimal
	e_prop.no_y = w_prop.avail_height() / acc_distance | 0; // | 0 is bitwise operator to cut decimal
	// calculate total width between first and last element in row/col
	let total_width_x = e_prop.no_x * e_prop.size + (e_prop.no_x - 1) * e_prop.distance;
	let total_width_y = e_prop.no_y * e_prop.size + (e_prop.no_y - 1) * e_prop.distance;
	// calculate the offset which means the left space of the available width/height
	e_prop.offset_x = (w_prop.avail_width() - total_width_x) / 2;
	e_prop.offset_y = (w_prop.avail_height() - total_width_y) / 2;


	for (index_y = 0; index_y < e_prop.no_y; index_y++) {
		// calculate top position of element
		e_prop.curr_pos_y = index_y * acc_distance;

		for (index_x = 0; index_x < e_prop.no_x; index_x++) {
			// calculate left position of element
			e_prop.curr_pos_x = index_x * acc_distance;

			// if statement to draw a rectangle
			if (index_y == 0 || index_x == 0 || index_y == e_prop.no_y - 1 || index_x == e_prop.no_x - 1)
				// create element and set properties
				put_div(e_prop, w_prop);

		}
	}
}