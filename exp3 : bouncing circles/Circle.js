class Circle {
    constructor(xStart, yStart, xEnd, yEnd, size, colour, highlight, easeTypeX, easeTypeY){
        this.x;
        this.y;
        this.xStart = xStart;
        this.yStart = yStart;
        this.xEnd = xEnd;
        this.yEnd = yEnd;
        this.size = size;
        this.highlight = highlight;
        this.col = colour;
        this.easeTypeX = easeTypeX;
        this.easeTypeY = easeTypeY;
    }

    display(){
        fill(this.col);
        noStroke();
        ellipse(this.x, this.y, this.size);
        stroke(255);
        noFill();
        strokeWeight(this.size/10);
        var arcSize = this.size-this.size/5;
        //arc(this.x, this.y, arcSize, arcSize, 4, 4.5);
    }

    update(p){
        this.x = map(this.easeTypeX(p), 0, 1, this.xStart, this.xEnd);
        this.y = map(this.easeTypeY(p), 0, 1, this.yStart, this.yEnd);
    }
}