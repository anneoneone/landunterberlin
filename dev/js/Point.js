
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

    set_color() {
        let color = get_random_rgb();
        stroke(color.r, color.g, color.b);
        strokeWeight(this.diameter);
    }

    show() {
        let color = get_random_rgb();
        this.set_color(color.r, color.g, color.b);

        this.display();
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