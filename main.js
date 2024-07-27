const progressLine = document.querySelectorAll(".progress-bar-line");
const progressCircle = document.querySelectorAll(".progress-bar-circle");
const progressNextBtn = document.querySelector(".next-btn");
const progressPrevBtn = document.querySelector(".prev-btn");
const slide = document.querySelectorAll(".slide");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => e.preventDefault());

let currentStep = localStorage.getItem("currentStep") || 1;
let prevAnimation = false;
let nextAnimation = true;
let stepCount = 0;
let prevCurrnetStep;

[...progressCircle].forEach((circle) => {
	circle.addEventListener("click", () => {
		prevCurrnetStep = currentStep;
		if (+currentStep <= +circle.id) {
			progressPrevBtn.disabled = false;
			progressPrevBtn.classList.remove("deActive");

			prevAnimation = false;
			nextAnimation = true;
			currentStep = +circle.id;
			if (currentStep === 4) {
				progressNextBtn.disabled = true;
				progressNextBtn.innerText = "submit";
			}
		} else {
			for (let i = +circle.id; i < +currentStep; i++) {
				stepCount++;
			}
			progressNextBtn.disabled = false;
			progressNextBtn.innerText = "next";

			prevAnimation = true;
			nextAnimation = false;
			currentStep = +circle.id;
			if (currentStep === 1) {
				progressPrevBtn.disabled = true;
				progressPrevBtn.classList.add("deActive");
			}
		}

		localStorage.setItem("currentStep", currentStep);
		showCurrentStep();
	});
});

progressNextBtn.addEventListener("click", () => {
	prevAnimation = false;
	nextAnimation = true;
	currentStep++;

	localStorage.setItem("currentStep", currentStep);
	progressPrevBtn.disabled = false;
	progressPrevBtn.classList.remove("deActive");
	if (currentStep === 4) {
		progressNextBtn.disabled = true;
		progressNextBtn.innerText = "submit";
	}

	showCurrentStep();
});

progressPrevBtn.addEventListener("click", () => {
	nextAnimation = false;
	prevAnimation = true;
	currentStep--;

	localStorage.setItem("currentStep", currentStep);
	progressNextBtn.disabled = false;
	progressNextBtn.innerText = "next";
	if (currentStep === 1) {
		progressPrevBtn.disabled = true;
		progressPrevBtn.classList.add("deActive");
	}
	showCurrentStep();
});

const showCurrentStep = () => {
	if (currentStep <= 1) {
		progressPrevBtn.disabled = true;
		progressPrevBtn.classList.add("deActive");
	}
	if (currentStep >= 4) {
		progressNextBtn.disabled = true;
		progressNextBtn.innerText = "submit";
	}

	for (let i = 1; i <= currentStep; i++) {
		if (nextAnimation) {
			[...progressCircle][i - 1].classList.remove("diActive");
			[...progressCircle][i - 1].classList.add("active");
			if (i >= 2) {
				[...progressLine][i - 2].classList.remove("diActive");
				[...progressLine][i - 2].classList.add("active");
			}
		}
	}

	if (prevAnimation) {
		if (stepCount > 1) {
			for (let i = prevCurrnetStep - stepCount; i < prevCurrnetStep; i++) {
				[...progressCircle][i].classList.remove("active");
				[...progressCircle][i].classList.add("diActive");
				if (currentStep >= 1) {
					[...progressLine][i - 1].classList.remove("active");
					[...progressLine][i - 1].classList.add("diActive");
				}
			}
			stepCount = 0;
		} else {
			stepCount = 0;
			[...progressCircle][currentStep].classList.remove("active");
			[...progressCircle][currentStep].classList.add("diActive");
			if (currentStep >= 1) {
				[...progressLine][currentStep - 1].classList.remove("active");
				[...progressLine][currentStep - 1].classList.add("diActive");
			}
		}
	}

	[...slide].forEach((item, index) => {
		if (+currentStep === index + 1) {
			item.style.display = "";
		} else {
			item.style.display = "none";
		}
	});
};
showCurrentStep();
