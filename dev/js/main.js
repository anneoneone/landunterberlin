/* eslint-disable */

// element properties
let e_prop = {
	distance: 25, // px
	size: 5, // px
	index: 0,
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


// function BlockViewport() {
// 	this.params = {}

// 	this.init();
// }

// BlockViewport.prototype.init = function () {
// 	console.log('wavy');

// 	create_elements();

// 	manipulate_elements();

// }
let letters;

function preload() {
	let url = "js/letters.json";
	letters = loadJSON(url);

}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight - windowHeight * 0.01);
	canvas.parent('container');

	frameRate(7);

	// noLoop();
}

function draw() {
	background('#111');

	draw_word(letters.hello);
	create_elements();
}

/**
 * Generate a string with random rgb colors
 * @returns String with random rgb colors
 */
function get_random_rgb() {
	offset = 70;
	return { r: Math.random() * 200 + offset, g: Math.random() * 220 + offset, b: Math.random() * 15 + offset };
}

/**
 * generate a div and place it in DOM
 * @param {*} e_prop element properties
 * @param {*} w_prop window properties
 */
function put_point() {
	let color = get_random_rgb();
	stroke(color.r, color.g, color.b);
	strokeWeight(e_prop.size);
	point(e_prop.offset_x + w_prop.padding_x + e_prop.curr_pos_x, e_prop.offset_y + w_prop.padding_y + e_prop.curr_pos_y);
}

function create_elements() {
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
			// create element and set properties
			if (index_y == 0 || index_x == 0 || index_y == e_prop.no_y - 1 || index_x == e_prop.no_x - 1) {
				let point = new Point(e_prop.offset_x + w_prop.padding_x + e_prop.curr_pos_x, e_prop.offset_y + w_prop.padding_y + e_prop.curr_pos_y);
				point.move_and_display();
			}

		}
	}
}

function draw_word(word) {
	let offset = { x: 0, y: 1 };

	for (let [key, word] of Object.entries(letters)) {
		for (let [key, letter] of Object.entries(word)) {
			offset.x++;

			draw_single_letter(letter, offset);
		}
		offset.x = 0;
		offset.y++;
	}
}

function draw_single_letter(letter, offset) {
	// let letter = letters.h;

	for (let index = 0; index < letter.x.length; index++) {
		let letter_p = new Point(letter.x[index] * 12 + 100 * offset.x, letter.y[index] * 12 + 150 * offset.y);
		letter_p.display();
		// letter_p.move_and_display();
	}
}

// point class
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.diameter = 5; // e_prop.size;
		this.speed = 3;
	}

	move(x, y) {
		this.x += x;
		this.y += y;
	}

	display() {
		// ellipse(this.x, this.y, this.diameter, this.diameter);
		point(this.x, this.y);
	}

	set_color() {
		let color = get_random_rgb();
		stroke(color.r, color.g, color.b);
		strokeWeight(this.diameter);
	}

	move_and_display() {
		let rand_x = random(-this.speed, this.speed);
		let rand_y = random(-this.speed, this.speed);

		let color = get_random_rgb();
		this.set_color(color.r, color.g, color.b);

		this.move(rand_x, rand_y);
		this.display();
		this.move(-rand_x, -rand_y);
		this.display();
	}
}