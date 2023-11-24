import { Node } from './Node.js';
import { Sprite } from './Sprite.js';

export class Card {
  constructor(index, x, y, imageSrc) {
    this.id = index;
    this.isOpen = false;
    this._imageSrc = imageSrc;
    this.node = new Node();
    this.cover = new Node();
    this.image = new Sprite();
    this.node.elm.appendChild(this.cover.elm);
    this.node.elm.appendChild(this.image.elm);
    document.body.appendChild(this.node.elm);
    Card.WIDTH = 150;
    Card.HEIGHT = 150;
    Card.x = x;
    Card.y = y;
  }
  creatCard() {
    this.image.width = Card.WIDTH;
    this.image.height = Card.HEIGHT;
    this.image.x = Card.x;
    this.image.y = Card.y;
    this.image.imageSrc = this._imageSrc;
    this.image.elm.style.borderRadius = '15%';
    this.image.elm.style.border = '2px solid black';
    this.image.scaleX = 0;

    this.cover.width = Card.WIDTH;
    this.cover.height = Card.HEIGHT;
    this.cover.x = Card.x;
    this.cover.y = Card.y;
    this.cover.elm.style.backgroundColor = 'orange';
    this.cover.elm.style.borderRadius = '15%';
    this.cover.elm.style.border = '2px solid black';
    this.cover.scaleX = 1;
  }
}