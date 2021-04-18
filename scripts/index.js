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
}

function draw() {
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
    mouseX > canvasWidth / 2 &&
    mouseY > canvasHeight / 2 - 16 * 10 &&
    mouseY < canvasHeight / 2 + 16 * 10
  ) {
    currentPostion = "right";
    currentAction = "walking";
    return;
  }

  if (
    mouseX < canvasWidth / 2 &&
    mouseY > canvasHeight / 2 - 16 * 10 &&
    mouseY < canvasHeight / 2 + 16 * 10
  ) {
    currentPostion = "left";
    currentAction = "walking";
    return;
  }

  if (mouseY < canvasHeight / 2) {
    currentPostion = "up";
    currentAction = "walking";
  }

  if (mouseY > canvasHeight / 2) {
    currentPostion = "down";
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
