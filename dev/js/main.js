/* eslint-disable */

// element properties
let e_prop = {
	distance_points: 8, // distance between two points (px)
	distance_letters: 50, // distance between two points (px)
	size: 4, // size of point (px)
	norm_pos: { x: 0, y: 0 }, // normalized position of letter on grid 
	offset: { x: 0, y: 0 }, // > does not change anything - WHY? 
	number_elements: { x: 0, y: 0 } // number of elements on axes
}

// window properties
let w_prop = {
	w_width: window.innerWidth, // window width
	w_height: window.innerHeight, // window width
	padding: { x: 30, y: 60 },
	avail_width: function () {
		return this.w_width - 2 * this.padding.x;
	},
	avail_height: function () {
		return this.w_height - 2 * this.padding.y;
	},
	max_letters: { x: 8, y: 4 }
}

let letters, text;
let offset;

function preload() {
	let url = "js/alphabet.json";
	letters = loadJSON(url);
	url = "js/texts.json";
	text = loadJSON(url);

}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight - windowHeight * 0.01);
	canvas.parent('container');

	calculate_properties()

	frameRate(7);

	// noLoop();
}

function draw() {
	background('#111');

	// for (let text_index = 0; text_index < 1; text_index++) {
	draw_frame();

	draw_word(text[0][0], { x: 0, y: 0 });
	draw_word(text[0][1], { x: 1, y: 3 });
	draw_word(")", { x: 5, y: 5 });

}


/**
 * @brief Set the normalized position of the letters in the grid
 * @summary 
 */
function set_norm_pos() {
	// new line after 9 letters
	if (e_prop.norm_pos.x > 8) {
		e_prop.norm_pos.x = 0;

		if (e_prop.norm_pos.y > 4) {
			e_prop.norm_pos.y = 1;
		} else {
			e_prop.norm_pos.y++;
		}
	} else {
		e_prop.norm_pos.x++;

	}
}

function calculate_properties() {
	// calculate accumulated distance for element size and distance between two elements
	let acc_distance = e_prop.distance_points + e_prop.size;

	// calculate number of elements per row/col
	e_prop.number_elements.x = w_prop.avail_width() / acc_distance | 0; // | 0 is bitwise operator to cut decimal
	e_prop.number_elements.y = w_prop.avail_height() / acc_distance | 0; // | 0 is bitwise operator to cut decimal
	// calculate total width between first and last element in row/col
	let total_width_x = e_prop.number_elements.x * e_prop.size + (e_prop.number_elements.x - 1) * e_prop.distance_points;
	let total_width_y = e_prop.number_elements.y * e_prop.size + (e_prop.number_elements.y - 1) * e_prop.distance_points;
	// calculate the offset which means the left space of the available width/height
	e_prop.offset.x = (w_prop.avail_width() - total_width_x) / 2;
	e_prop.offset.y = (w_prop.avail_height() - total_width_y) / 2;

}


function draw_frame() {
	let acc_distance = e_prop.distance_points + e_prop.size;

	for (index_y = 0; index_y < e_prop.number_elements.y; index_y++) {
		// calculate top position of element
		e_prop.norm_pos.y = index_y * acc_distance;

		for (index_x = 0; index_x < e_prop.number_elements.x; index_x++) {
			// calculate left position of element
			e_prop.norm_pos.x = index_x * acc_distance;

			// if statement to draw a rectangle
			// create element and set properties
			if (index_y == 0 || index_x == 0 || index_y == e_prop.number_elements.y - 1 || index_x == e_prop.number_elements.x - 1) {
				let point = new Point(e_prop.offset.x + w_prop.padding.x + e_prop.norm_pos.x, e_prop.offset.y + w_prop.padding.y + e_prop.norm_pos.y, e_prop.size);
				point.move_and_display();
			}

		}
	}
}

function draw_word(word, start_pos) {
	e_prop.norm_pos = start_pos;

	for (let letter of word) {
		for (let [key, letter_coordinates] of Object.entries(letters)) {
			// for (let lib_letter of Object.keys(letters)) {

			// var childnames = Object.keys(letters);
			// console.log("letter " + letter + "lib_letter " + lib_letter);

			if (letter == key) {
				set_norm_pos();
				draw_single_letter(letter_coordinates);
			}

		}
	}

}

function draw_single_letter(letter_coordinates) {

	for (let index = 0; index < letter_coordinates.length; index++) {
		let pos_x = letter_coordinates[index][0] * e_prop.offset.x + (e_prop.distance_letters * e_prop.norm_pos.x);
		let pos_y = letter_coordinates[index][1] * e_prop.offset.y + (e_prop.distance_letters * e_prop.norm_pos.y);

		let letter_p = new Point(pos_x, pos_y, e_prop.size);
		// letter_p.show();
		letter_p.move_and_display();
	}

}
