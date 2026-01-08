const buttons = document.querySelectorAll(".btn");
const display = document.querySelector(".display");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;
    if (value === "=") {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    } else if (value === "C") {
      display.value = "";
    } else {
      display.value += value;
    }
  });
});
