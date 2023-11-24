import { Node } from "./Node.js";

export class Label extends Node {
    constructor() {
        super();
        this._text = '';
    }
    _createElement() {
        let elm = document.createElement('p');
        elm.style.position = "absolute";
        return elm;
    }
    get text() { return this._text; }
    set text(value) {
        this._text = value;
        this.elm.text = this._text;
    }
}