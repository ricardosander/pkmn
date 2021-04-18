let gold;
let currentPostion;
let currentAction;
let currentSprite;
let spriteUpdator;

let canvasWidth;
let canvasHeight;

let sprites = {
  right: {
    stopped: [
      {
        startX: 1,
        startY: 4,
        endX: 13,
        endY: 16,
      },
    ],
    walking: [
      {
        startX: 1,
        startY: 4,
        endX: 13,
        endY: 16,
      },
      {
        startX: 15,
        startY: 4,
        endX: 13,
        endY: 16,
      },
    ],
  },
  left: {
    stopped: [
      {
        startX: 29,
        startY: 4,
        endX: 13,
        endY: 16,
      },
    ],
    walking: [
      {
        startX: 29,
        startY: 4,
        endX: 13,
        endY: 16,
      },
      {
        startX: 44,
        startY: 4,
        endX: 13,
        endY: 16,
      },
    ],
  },
  down: {
    stopped: [
      {
        startX: 58,
        startY: 4,
        endX: 14,
        endY: 16,
      },
    ],
    walking: [
      {
        startX: 74,
        startY: 4,
        endX: 14,
        endY: 16,
      },
      {
        startX: 90,
        startY: 4,
        endX: 14,
        endY: 16,
      },
    ],
  },
  up: {
    stopped: [
      {
        startX: 107,
        startY: 4,
        endX: 14,
        endY: 16,
      },
    ],
    walking: [
      {
        startX: 123,
        startY: 4,
        endX: 14,
        endY: 16,
      },
      {
        startX: 138,
        startY: 4,
        endX: 14,
        endY: 16,
      },
    ],
  },
};

let zones = {
  up: [],
  down: [],
  left: [],
  right: [],
};

function preload() {
  gold = loadImage("assets/images/goldsprites.png");
}

function setup() {
  let frameRating = 30;

  frameRate(frameRating);

  canvasWidth = 800;
  canvasHeight = 800;

  createCanvas(canvasWidth, canvasHeight);
  background(0, 255, 0);
  setInterval(function () {
    updateSprites();
  }, frameRate * 1000);

  currentPostion = "down";
  currentAction = "stopped";
  currentSprite = 0;

  zones.up = [
    { x: 0, y: 0 },
    { x: canvasWidth * 0.5, y: canvasHeight * 0.5 },
    { x: canvasWidth, y: 0 },
  ];
  zones.down = [
    { x: canvasWidth * 0.5, y: canvasHeight * 0.5 },
    { x: 0, y: canvasHeight },
    { x: canvasWidth, y: canvasHeight },
  ];
  zones.left = [
    { x: 0, y: 0 },
    { x: canvasWidth * 0.5, y: canvasHeight * 0.5 },
    { x: 0, y: canvasHeight },
  ];
  zones.right = [
    { x: canvasWidth * 0.5, y: canvasHeight * 0.5 },
    { x: canvasWidth, y: 0 },
    { x: canvasWidth, y: canvasHeight },
  ];
}

function draw() {
  textSize(40);
  text("Up", canvasWidth * 0.44, canvasHeight * 0.2);
  text("Down", canvasWidth * 0.44, canvasHeight * 0.8);

  text("Right", canvasWidth * 0.8, canvasHeight * 0.5);
  text("Left", canvasWidth * 0.2, canvasHeight * 0.5);

  noFill();
  triangle(
    zones.left[0].x,
    zones.left[0].y,
    zones.left[1].x,
    zones.left[1].y,
    zones.left[2].x,
    zones.left[0].y
  );

  triangle(
    zones.right[0].x,
    zones.right[0].y,
    zones.right[1].x,
    zones.right[1].y,
    zones.right[2].x,
    zones.right[2].y
  );

  triangle(
    zones.up[0].x,
    zones.up[0].y,
    zones.up[1].x,
    zones.up[1].y,
    zones.up[2].x,
    zones.up[2].y
  );

  triangle(
    zones.down[0].x,
    zones.down[0].y,
    zones.down[1].x,
    zones.down[1].y,
    zones.down[2].x,
    zones.down[2].y
  );

  let spriteWidth = 13;
  let sprinteHeight = 16;

  let sprite = sprites[currentPostion][currentAction][currentSprite];

  image(
    gold, //image source

    canvasWidth / 2 - (spriteWidth * 10) / 2, // x position
    canvasHeight / 2 - (sprinteHeight * 10) / 2, //y position
    spriteWidth * 10, // width
    sprinteHeight * 10, //height
    sprite.startX, //currentSprite * spriteWidth + 1, //x image
    sprite.startY, //4, //y image
    sprite.endX, //spriteWidth, //x width
    sprite.endY //sprinteHeight //y width
  );
}

function touchStarted() {
  currentPostion = "down";
  currentAction = "stopped";

  if (
    collidePointTriangle(
      mouseX,
      mouseY,
      zones.up[0].x,
      zones.up[0].y,
      zones.up[1].x,
      zones.up[1].y,
      zones.up[2].x,
      zones.up[2].y
    )
  ) {
    currentPostion = "up";
    currentAction = "walking";
  }

  if (
    collidePointTriangle(
      mouseX,
      mouseY,
      zones.down[0].x,
      zones.down[0].y,
      zones.down[1].x,
      zones.down[1].y,
      zones.down[2].x,
      zones.down[2].y
    )
  ) {
    currentPostion = "down";
    currentAction = "walking";
  }

  if (
    collidePointTriangle(
      mouseX,
      mouseY,
      zones.left[0].x,
      zones.left[0].y,
      zones.left[1].x,
      zones.left[1].y,
      zones.left[2].x,
      zones.left[2].y
    )
  ) {
    currentPostion = "left";
    currentAction = "walking";
  }

  if (
    collidePointTriangle(
      mouseX,
      mouseY,
      zones.right[0].x,
      zones.right[0].y,
      zones.right[1].x,
      zones.right[1].y,
      zones.right[2].x,
      zones.right[2].y
    )
  ) {
    currentPostion = "right";
    currentAction = "walking";
  }
}

function keyPressed(event) {
  if (event.key == "ArrowRight") {
    currentPostion = "right";
    currentAction = "walking";
  }
  if (event.key == "ArrowLeft") {
    currentPostion = "left";
    currentAction = "walking";
  }
  if (event.key == "ArrowDown") {
    currentPostion = "down";
    currentAction = "walking";
  }
  if (event.key == "ArrowUp") {
    currentPostion = "up";
    currentAction = "walking";
  }
}

function keyReleased(event) {
  currentAction = "stopped";
  currentSprite = 0;
}

function touchEnded(event) {
  currentAction = "stopped";
  currentSprite = 0;
}

function updateSprites() {
  let animation = sprites[currentPostion][currentAction];
  currentSprite++;
  if (currentSprite >= animation.length) {
    currentSprite = 0;
  }
}
