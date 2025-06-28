// Provided function to mock server call
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // Randomly reject or resolve
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Select all the like glyphs (hearts)
  const likeHearts = document.querySelectorAll(".like-glyph");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");

  likeHearts.forEach(heart => {
    heart.addEventListener("click", () => {
      // Only act if the heart is empty
      if (heart.textContent === "♡") {
        mimicServerCall()
          .then(() => {
            heart.textContent = "♥";
            heart.classList.add("activated-heart");
          })
          .catch((error) => {
            modal.classList.remove("hidden");
            modalMessage.textContent = error;
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 3000);
          });
      } else {
        // If heart is full, toggle back to empty
        heart.textContent = "♡";
        heart.classList.remove("activated-heart");
      }
    });
  });
});