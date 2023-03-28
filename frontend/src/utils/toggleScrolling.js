// Simple util to prevent element scrolling during pop up elements

export function disableScroll(element) {
    element.style.overflow = "hidden";
}

export function enableScroll(element) {
    element.style.overflow = "scroll";
}
