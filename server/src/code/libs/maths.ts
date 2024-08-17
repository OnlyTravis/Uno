export class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    Add(v: Vector2D) {
        return new Vector2D(this.x+v.x, this.y+v.y);
    }
    Add_(v: Vector2D) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    Minus(v: Vector2D) {
        return new Vector2D(this.x-v.x, this.y-v.y);
    }
    Minus_(v: Vector2D) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    Multiply(m: number) {
        return new Vector2D(this.x*m, this.y*m);
    }
    Multiply_(m: number) {
        this.x *= m;
        this.y *= m;
        return this;
    }
    Transform(M: Matrix2D) {
        return new Vector2D(M.val[0]*this.x+M.val[1]*this.y, M.val[2]*this.x+M.val[3]*this.y);
    }
    Transform_(M: Matrix2D) {
        const tmp = M.val[0]*this.x+M.val[1]*this.y;
        this.y = M.val[2]*this.x+M.val[3]*this.y;
        this.x = tmp;
        return this;
    }
    DotProduct(v: Vector2D): number {
        return this.x*v.x+this.y*v.y;
    }
    CrossProduct(v: Vector2D): number {
        return this.x*v.y-this.y*v.x;
    }
}

//[ a, b ]
//[ c, d ]
export class Matrix2D {
    val: number[];
    constructor(a: number, b: number, c: number, d: number) {
        this.val = [a, b, c, d];
    }
}