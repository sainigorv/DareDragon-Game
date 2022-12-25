score = 0;
cross = true;

audio = new Audio("music.mp3");
audiogo = new Audio("gameover.mp3");
setTimeout(() => {
  audio.play();
}, 1000);
document.onkeydown = function (e) {
  if (e.key == "ArrowUp") {
    wolf = document.querySelector(".wolf");
    wolf.classList.add("animateWolf");
    setTimeout(() => {
      wolf.classList.remove("animateWolf");
    }, 700);
  }
  if (e.key == "ArrowRight") {
    wolf = document.querySelector(".wolf");
    wolfX = parseInt(
      window.getComputedStyle(wolf, null).getPropertyValue("left")
    );
    wolf.style.left = wolfX + 112 + "px";
  }
  if (e.key == "ArrowLeft") {
    wolf = document.querySelector(".wolf");
    wolfX = parseInt(
      window.getComputedStyle(wolf, null).getPropertyValue("left")
    );
    wolf.style.left = wolfX - 112 + "px";
  }
};
setInterval(() => {
  wolf = document.querySelector(".wolf");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  wx = parseInt(window.getComputedStyle(wolf, null).getPropertyValue("left"));
  wy = parseInt(window.getComputedStyle(wolf, null).getPropertyValue("top"));

  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offsetX = Math.abs(wx - ox);
  offsetY = Math.abs(wy - oy);

  //   console.log(offsetX, offsetY);
  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerText = "Game Over - Reload to start again";
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
    setTimeout(() => {
      audiogo.pause();
      audio.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

const sc = document.querySelector("#scoreCont");
function updateScore(score) {
  sc.innerText = "Your Score: " + score;
}
