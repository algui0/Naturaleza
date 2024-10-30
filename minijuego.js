const dropzone = document.getElementById('dropzone');
let selectedElement = null;
let offsetX, offsetY;

// Function to position elements randomly within the iframe
function positionElementsRandomly() {
    document.querySelectorAll('.movable').forEach(element => {
        const maxTop = window.innerHeight - element.offsetHeight - 50; // 50px padding from top
        const maxLeft = window.innerWidth - element.offsetWidth - 50; // 50px padding from left
        const randomTop = Math.random() * maxTop;
        const randomLeft = Math.random() * maxLeft;
        element.style.top = `${randomTop}px`;
        element.style.left = `${randomLeft}px`;
    });
}

function handleMouseDown(e) {
    selectedElement = e.target;
    offsetX = e.clientX - selectedElement.getBoundingClientRect().left;
    offsetY = e.clientY - selectedElement.getBoundingClientRect().top;
    selectedElement.style.cursor = 'grabbing';
}

function handleMouseMove(e) {
    if (selectedElement) {
        selectedElement.style.left = `${e.clientX - offsetX}px`;
        selectedElement.style.top = `${e.clientY - offsetY}px`;
    }
}

function handleMouseUp() {
    if (selectedElement) {
        selectedElement.style.cursor = 'grab';

        // Check if the selectedElement is within the dropzone
        const elementRect = selectedElement.getBoundingClientRect();
        const dropzoneRect = dropzone.getBoundingClientRect();

        if (
            elementRect.left >= dropzoneRect.left &&
            elementRect.top >= dropzoneRect.top &&
            elementRect.right <= dropzoneRect.right &&
            elementRect.bottom <= dropzoneRect.bottom
        ) {
            selectedElement.style.display = 'none';
        }

        selectedElement = null;
    }
}

// Attach event listeners to all movable elements
document.querySelectorAll('.movable').forEach(element => {
    element.addEventListener('mousedown', handleMouseDown);
});

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

// Position elements randomly on page load
window.addEventListener('load', positionElementsRandomly);
