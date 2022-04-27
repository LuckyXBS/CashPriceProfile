const popupScreen = document.querySelector(".popup-screen");
const popupBox = document.querySelector(".popup-box");
const closeBtn = document.querySelector(".close-btn");
const openBtn = document.querySelector(".login-user");
	
	openBtn.addEventListener("click", () => {
      popupScreen.classList.add("active");
    });
	
	closeBtn.addEventListener("click", () => {
      popupScreen.classList.remove("active");
    });