
// point class
class Point {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.diameter = size;
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


    /**
     * Generate a string with random rgb colors
     * @returns String with random rgb colors
     */
    get_random_rgb() {
        let offset = 70;
        return { r: Math.random() * 200 + offset, g: Math.random() * 220 + offset, b: Math.random() * 15 + offset };
        // return { r: 255, g: 255, b: 255 };
    }

    set_color() {
        let color = this.get_random_rgb();
        stroke(color.r, color.g, color.b);
        strokeWeight(this.diameter);
    }

    show() {
        let color = this.get_random_rgb();
        this.set_color(color.r, color.g, color.b);

        this.display();
    }

    move_and_display() {
        let rand_x = random(-this.speed, this.speed);
        let rand_y = random(-this.speed, this.speed);

        let color = this.get_random_rgb();
        this.set_color(color.r, color.g, color.b);

        this.move(rand_x, rand_y);
        this.display();
        this.move(-rand_x, -rand_y);
        this.display();
    }
}