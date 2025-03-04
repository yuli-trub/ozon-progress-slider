class ProgressCircle {
  constructor(container, options = {}) {
    this.container = document.querySelector(container);
    if (!this.container) throw new Error("Container not found!");

    this.circle = this.container.querySelector(".progress__circle");
    this.circleFill = this.container.querySelector(".progress__circle-fill");

    this.valueInput = this.container.querySelector("#progressValue");
    this.animateToggle = this.container.querySelector("#animateToggle");
    this.hideToggle = this.container.querySelector("#hideToggle");

    this.radius = options.radius || 40;
    this.circumference = 2 * Math.PI * this.radius;

    this.init();
  }

  init() {
    this.valueInput.addEventListener("input", () =>
      this.setProgress(this.valueInput.value)
    ); // update value
    this.animateToggle.addEventListener("input", () => this.toggleAnimation()); // toggle animation
    this.hideToggle.addEventListener("input", () => this.toggleVisibility()); // toggle visibility
    this.setProgress(this.valueInput.value);
  }

  // handle the value change
  setProgress(value) {
    let progressValue = Math.min(100, Math.max(0, parseInt(value) || 0));
    this.valueInput.value = progressValue || 0; // set the value of input
    this.circleFill.style.strokeDashoffset =
      this.circumference - (progressValue / 100) * this.circumference;
  }

  // handle rotate animation
  toggleAnimation() {
    this.circle.classList.toggle("animated", this.animateToggle.checked);
    this.circle.classList.toggle(
      "animated--stopping",
      !this.animateToggle.checked
    );
  }

  // handle visibility functionality
  toggleVisibility() {
    this.circle.classList.toggle("hidden", this.hideToggle.checked);
  }
}

const progressCircle1 = new ProgressCircle(".progress-container");

progressCircle1.setProgress();
progressCircle1.toggleAnimation();
progressCircle1.toggleVisibility();
