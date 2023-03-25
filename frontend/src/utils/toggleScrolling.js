// Simple util to prevent body scrolling during pop up elements
const body = document.querySelector("body");

export function disableScroll() {
    body.style.overflow = "hidden";
}

export function enableScroll() {
    body.style.overflow = "auto";
}
