export class Vector2D {
    id : number | null | undefined;
       
    x : number | null | undefined;

    y : number | null | undefined;

    magnitude : number | null | undefined;

    angleWithXAxisDeg : number | null | undefined;

    isCartesian : boolean | null | undefined = true;

    description : string | null | undefined = "";

    name : string | null | undefined = "";
}

export interface SMalVector2D {
    vector: Vector2D;
    sVal: number;
}

export interface LinearCombVector2D {
    vectors: Vector2D[];
    xRange: number;
    yRange: number;
    scale: number | null;
}