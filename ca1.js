document.addEventListener('DOMContentLoaded', function () {
    const pyramidContainer = document.getElementById('pyramidContainer');
    const editDateButton = document.getElementById('editDate');
    const switchPyramidButton = document.getElementById('switchPyramid');
    const userText = document.getElementById('userText');
    const dateText = document.getElementById('dateText');
    let age = 'Adult';
    let selectedDate = new Date();

    const layers = {
        red: { num: 0, height: 20, btnBGColor: "white" },
        orange: { num: 1, height: 30, btnBGColor: "white" },
        yellow: { num: 2, height: 40, btnBGColor: "white" },
        dodgerblue: { num: 3, height: 50, btnBGColor: "white" },
        darkgoldenrod: { num: 4, height: 60, btnBGColor: "white" },
        limegreen: { num: 6, height: 80, btnBGColor: "white" }
    };

    const validRanges = {
        red: [0, 0],
        orange: [0, 1],
        yellow: [2, 2],
        dodgerblue: [3, 3],
        darkgoldenrod: [3, 5],
        limegreen: [5, 7]
    };

    const baseContentLines = [
        "foods and drinks high in fat, sugar and salt",
        "fats, spreads and oils",
        "Meat, poultry, fish, eggs, beans and nuts",
        "Milk, yogurt and cheese",
        "Wholemeal cereals and breads, potatoes, pasta and rice",
        "Vegetables, salad and fruit"
    ];

    function updateInfoContent() {
        additionalInfo.innerHTML = ''; // Clean all content

        baseContentLines.forEach((line, index) => {
            const p = document.createElement('p');
            const color = Object.keys(validRanges)[index]; // Get Color
            const range = validRanges[color]; // Get Range

            p.textContent = line + ': '; // Add Text
            p.style.color = color; // Set text color
            if (color === 'yellow') {
                p.style.backgroundColor = 'black'; // black background with yellow text
            }

            const b = document.createElement('b'); 
            b.textContent = `[${range[0]}, ${range[1]}]`; // Range -> bold
            p.appendChild(b);

            additionalInfo.appendChild(p); 
        });
    }

    function buildPyramid() {
        pyramidContainer.innerHTML = '';
        let totalHeight = 0; 

        Object.entries(layers).forEach(([color, { num, height, btnBGColor }], index) => {
            const layerDiv = document.createElement('div');
            layerDiv.className = `color-bar color-bar-${index + 1}`;
            layerDiv.style.height = `${height}px`;
            layerDiv.style.backgroundColor = color;

            const plusBtn = createButton('+', () => handleButtonClick(color, 1));
            if (num >= 9) {
                plusBtn.disabled = true;
            }
            const minusBtn = createButton('-', () => handleButtonClick(color, -1));
            if (num <= 0) {
                minusBtn.disabled = true;
            }            
            const numBtn = createButton(num.toString(), null); 
            numBtn.style.backgroundColor = btnBGColor; 

            layerDiv.append(plusBtn, numBtn, minusBtn);
            pyramidContainer.appendChild(layerDiv);

            totalHeight += height; 

            if (index === 0 || index === 1) {
                const spacerDiv = document.createElement('div');
                spacerDiv.className = 'spacer';
                pyramidContainer.appendChild(spacerDiv);
                totalHeight += 10; 
            }
        });

        pyramidContainer.style.height = `${totalHeight}px`;

        const initialHeight = 260; 
        const initialWidth = 468; 
        const widthHeightRatio = initialWidth / initialHeight;
        const totalWidth = totalHeight * widthHeightRatio;

        pyramidContainer.style.width = `${totalWidth}px`;

        const coverContainer = document.querySelector('.cover-container');
        // +1 => make it fully cover the contain includes border and padding
        coverContainer.style.borderBottomWidth = `${totalHeight + 1}px`;
        coverContainer.style.borderLeftWidth = `${totalWidth / 2 + 1}px`;
        coverContainer.style.borderRightWidth = `${totalWidth / 2 + 1}px`;
    }

    function createButton(text, onClick = null) {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = text;
        if (onClick) {
            button.addEventListener('click', onClick);
            button.className += ' ctrl';
        } else {
            button.className += ' num';
        }
        return button;
    }

    function handleButtonClick(color, diff) {
        const layer = layers[color];
        const newNum = Math.max(0, Math.min(9, layer.num + diff));
        
        // Only num is diff, change the height
        if (newNum !== layer.num) {
            layer.num = newNum; 

            layer.height = Math.max(20, Math.min(110, layer.height + diff * 10));

            const [min, max] = validRanges[color];
            if (layer.num < min) {
                layer.btnBGColor = 'lightskyblue';
            } else if (layer.num > max) {
                layer.btnBGColor = 'lightpink';
            } else {
                layer.btnBGColor = 'white';
            }
        }
        buildPyramid(); // Re-render pyramid with updated layer
    }

    function formatDate(date) {
        const [yyyy, mm, dd] = date.toISOString().split('T')[0].split('-');
        return `[${dd}-${mm}-${yyyy}]`;
    }

    // Select the date
    editDateButton.addEventListener('click', () => {
        // Clear the previous date
        dateText.innerHTML = '';

        const input = document.createElement('input');
        input.type = 'date';
        input.value = selectedDate.toISOString().split('T')[0];

        // Let users can see their input
        input.addEventListener('focus', function(e) {
            this.style.visibility = 'visible';
        });

        // Only click "Enter" can finish the input
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { // "Enter" key
                const newDate = new Date(this.value);
                if (!isNaN(newDate)) { // Date Validation!
                    selectedDate = newDate;
                    dateText.textContent = formatDate(newDate);
                } else {
                    alert('Invalid date');
                    dateText.textContent = formatDate(selectedDate); 
                } // Previous Selected Date
                this.blur(); // Remove the focus
            }
        });

        /* After click the DATEEDIT buton, focus on the date input,
           So the user can input immediately. */
        dateText.appendChild(input);
        input.focus();
    });

    // Reset Layers Status
    function resetLayers() {
        layers.red.num = 0; layers.red.height = 20;
        layers.orange.num = 1; layers.orange.height = 30;
        layers.yellow.num = 2; layers.yellow.height = 40;
        layers.darkgoldenrod.num = 4; layers.darkgoldenrod.height = 60;
        layers.limegreen.num = 6; layers.limegreen.height = 80;

        // Reset Button Background Color
        Object.keys(layers).forEach(color => {
            layers[color].btnBGColor = 'white';
        });
    }

    // Change Adult/Child
    switchPyramidButton.addEventListener('click', () => {
        age = age === 'Adult' ? 'Child' : 'Adult';
        userText.textContent = `${age}'s Food Pyramid`;

        if (age === 'Child') {
            validRanges.dodgerblue = [5, 5];
            validRanges.darkgoldenrod = [3, 7];
        } else {
            validRanges.dodgerblue = [3, 3];
            validRanges.darkgoldenrod = [3, 5];
        }

        // Change 4th Layer according to age group
        if (age === 'Child') {
            layers.dodgerblue.num = 5;
            layers.dodgerblue.height = 70;
        } else {
            layers.dodgerblue.num = 3;
            layers.dodgerblue.height = 50;
        }

        // Reset Layers, Info and Pyramid
        resetLayers(); 
        updateInfoContent(); 
        buildPyramid(); 
    });

    dateText.textContent = formatDate(selectedDate);
    updateInfoContent();
    buildPyramid();
});