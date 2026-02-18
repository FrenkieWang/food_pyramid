const adultRanges = [
    { min: 0, max: 0 }, // div 1
    { min: 0, max: 1 }, // div 2
    { min: 2, max: 2 }, // div 3
    { min: 3, max: 3 }, // div 4
    { min: 3, max: 5 }, // div 5
    { min: 5, max: 7 }  // div 6
];
const childRanges = [
    { min: 0, max: 0 }, // div 1
    { min: 0, max: 1 }, // div 2
    { min: 3, max: 4 }, // div 3
    { min: 3, max: 3 }, // div 4
    { min: 4, max: 5 }, // div 5
    { min: 4, max: 6 }  // div 6
];
let validRanges = adultRanges;

const adultDefaultNums = [0, 1, 2, 3, 4, 5];
const childDefaultNums = [0, 1, 3, 3, 4, 5];
setInitialHeights(adultDefaultNums);

let currentStandard = 'adult';
function toggleStandard() {
    if (currentStandard === 'adult') {
        validRanges = childRanges;
        currentStandard = 'child';
        document.getElementById('toggle-button').textContent = 'Switch to Adult Standard';
        setInitialHeights(childDefaultNums);
        document.getElementById('adult-standards').style.display = 'none';
        document.getElementById('child-standards').style.display = 'block';
    } else {
        validRanges = adultRanges;
        currentStandard = 'adult';
        document.getElementById('toggle-button').textContent = 'Switch to Child Standard';
        setInitialHeights(adultDefaultNums);
        document.getElementById('adult-standards').style.display = 'block';
        document.getElementById('child-standards').style.display = 'none';
    }

    // Update Button Colors
    const innerDivs = document.querySelectorAll('.inner-div');
    innerDivs.forEach((div, index) => {
        const middleButton = div.querySelector('.middle');
        const currentValue = parseInt(middleButton.textContent);
        const range = validRanges[index];
        const inRange = currentValue >= range.min && currentValue <= range.max;

        if (inRange) {
            middleButton.classList.remove('darkblue', 'darkred');
        } else if (currentValue < range.min) {
            middleButton.classList.add('darkblue');
            middleButton.classList.remove('darkred');
        } else {
            middleButton.classList.add('darkred');
            middleButton.classList.remove('darkblue');
        }
    });
}

// Set the Initial Size of 6 divs, square and overlay square
function setInitialHeights(numsArray) {
    const innerDivs = document.querySelectorAll('.inner-div');
    let heightSum = 10 + 25;
    numsArray.forEach((num, index) => {
        if (innerDivs[index]) {
            // Set the middle button text content
            const middleButton = innerDivs[index].querySelector('.middle');
            middleButton.textContent = num;

            // Set the height of each Div
            let height = 15 * num + 40;
            innerDivs[index].style.height = height + 'px';
            heightSum += height;
        }
    });

    // Set the height and width of the square
    const square = document.getElementById('square');
    square.style.height = heightSum + 'px';
    square.style.width = heightSum / 5 * 8 + 'px';

    // Set the border width of the overlay square
    const overlaySquare = document.getElementById('overlay-square');
    overlaySquare.style.borderBottomWidth = heightSum + 'px';
    overlaySquare.style.borderLeftWidth = heightSum / 5 * 4 + 'px';
    overlaySquare.style.borderRightWidth = heightSum / 5 * 4 + 'px';
}

// Handle Button Clicks and change the heights of each Div
function adjustHeight(button, change) {
    const innerDiv = button.closest('.inner-div');
    const square = document.getElementById('square');
    const overlaySquare = document.getElementById('overlay-square');
    const middleButton = button.parentElement.querySelector('.middle');
    let currentValue = parseInt(middleButton.textContent);

    // Adjust the height of the inner div
    const newHeight = innerDiv.offsetHeight + change;
    if (newHeight >= 0) {
        innerDiv.style.height = newHeight + 'px';
    }

    // Adjust the width and height of the square
    const newSquareWidth = square.offsetWidth + change / 5 * 8;
    const newSquareHeight = square.offsetHeight + change;
    square.style.width = newSquareWidth + 'px';
    square.style.height = newSquareHeight + 'px';

    // Adjust the overlay square
    const newBorderBottom = parseInt(overlaySquare.style.borderBottomWidth || 500) + change;
    const newBorderLeft = parseInt(overlaySquare.style.borderLeftWidth || 400) + change / 5 * 4;
    const newBorderRight = parseInt(overlaySquare.style.borderRightWidth || 400) + change / 5 * 4;
    overlaySquare.style.borderBottomWidth = newBorderBottom + 'px';
    overlaySquare.style.borderLeftWidth = newBorderLeft + 'px';
    overlaySquare.style.borderRightWidth = newBorderRight + 'px';

    // Update the middle button value
    currentValue += change / 15;
    middleButton.textContent = currentValue;

    // Disable/Enable buttons based on the value
    const plusButton = button.parentElement.querySelector('button:nth-child(1)');
    const minusButton = button.parentElement.querySelector('button:nth-child(3)');

    if (currentValue >= 9) {
        plusButton.disabled = true;
    } else {
        plusButton.disabled = false;
    }

    if (currentValue <= 0) {
        minusButton.disabled = true;
    } else {
        minusButton.disabled = false;
    }

    // Check the value range and update the button color
    const divIndex = Array.from(innerDiv.parentElement.children).indexOf(innerDiv);
    const range = validRanges[divIndex];
    const inRange = currentValue >= range.min && currentValue <= range.max;

    if (inRange) {
        middleButton.classList.remove('darkblue', 'darkred');
    } else if (currentValue < range.min) {
        middleButton.classList.add('darkblue');
        middleButton.classList.remove('darkred');
    } else {
        middleButton.classList.add('darkred');
        middleButton.classList.remove('darkblue');
    }
}

/* Hover each div and show its (+) & (-) button */
document.addEventListener('mousemove', function(event) {
    const innerDivs = document.querySelectorAll('.inner-div');
    innerDivs.forEach(div => {
        const rect = div.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
            div.classList.add('hover');
        } else {
            div.classList.remove('hover');
        }
    });
});

/* Manipulate Date Input */
let previousDate = '[05-Feb-2021]';

function handleDateInput(event) {
    if (event.key === 'Enter') {
        updateDate();
    } else if (event.key === 'Escape') {
        cancelDateEdit();
    }
}

function editDate() {
    const dateDisplay = document.getElementById('date-display');
    const dateInput = document.getElementById('date-input');
    previousDate = dateDisplay.textContent;
    dateInput.value = formatDateForInput(dateDisplay.textContent);
    dateInput.style.display = 'inline-block';
    dateDisplay.style.display = 'none';
    dateInput.focus(); // Ensure the input is focused for keyboard input
}

function updateDate() {
    const dateDisplay = document.getElementById('date-display');
    const dateInput = document.getElementById('date-input');
    const newDate = dateInput.value;
    dateDisplay.textContent = formatDateForDisplay(newDate);
    dateInput.style.display = 'none';
    dateDisplay.style.display = 'inline-block';
}

function cancelDateEdit() {
    const dateDisplay = document.getElementById('date-display');
    const dateInput = document.getElementById('date-input');
    dateDisplay.textContent = previousDate;
    dateInput.style.display = 'none';
    dateDisplay.style.display = 'inline-block';
}

function formatDateForInput(dateStr) {
    const parts = dateStr.replace(/[\[\]]/g, '').split('-');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const monthMap = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    return `${year}-${monthMap[month]}-${day}`;
}

function formatDateForDisplay(dateStr) {
    const parts = dateStr.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const monthMap = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
        '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    };
    return `[${day}-${monthMap[month]}-${year}]`;
}