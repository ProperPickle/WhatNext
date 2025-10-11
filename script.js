window.onload = window.onresize = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size (optional, can match image size)
    canvas.height = window.innerHeight;
    canvas.width = window.innerHeight*.75;
    const middle = canvas.width/2;

    // Create an image object
    const img = new Image();

    // Set the image source
    img.src = 'https://i.imgur.com/yu3yUJ0.jpeg';

    // When image loads, draw it and overlay text
    img.onload = function() {
        // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        //Get current date
        const currentDate = new Date();

        //Formatting month
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const month = months[currentDate.getMonth()];

        //Formatting day
        function formatDay(day) {
            var ordinalEnding;
            if (day==11||day==12||day==13) {
                ordinalEnding = 'th';
            } else if ((day%10)==1) {
                ordinalEnding = 'st';
            } else if ((day%10)==2) {
                ordinalEnding = 'nd';
            } else if ((day%10)==3) {
                ordinalEnding = 'rd';
            } else {
                ordinalEnding = 'th';
            }
            return day + ordinalEnding;
        }
        const day = currentDate.getDate();
        const today = formatDay(day);
        const tmrw = formatDay(day+1);

        // Construct and Overlay text
        const topText = "Damn it's "+month+' '+today+' already?';
        const bottomText = month+' '+tmrw+'? Fuck everything.';

        // base font size (proportional to canvas width)
        let fontSize = 0.08 * canvas.width; // px
        const minFontSize = 12; // px - don't go below this
        const padding = 20; // px - left/right padding inside canvas

        // helper to set font from size
        function setFont(size) {
            ctx.font = size + 'px Impact';
        }

        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';

        // Fit a given text to the canvas by reducing font size until it fits.
        // Returns the final font size used.
        function fitTextToWidth(text, maxWidth, startSize) {
            let size = startSize;
            setFont(size);
            // measureText gives width in pixels
            let metrics = ctx.measureText(text);
            let textWidth = metrics.width;

            // Reduce size until it fits or we hit minFontSize
            while (textWidth + padding > maxWidth && size > minFontSize) {
                size = Math.max(minFontSize, size - 2);
                setFont(size);
                metrics = ctx.measureText(text);
                textWidth = metrics.width;
            }
            return size;
        }

        // Fit top and bottom text separately (the center line "What's next?" we keep default size)
        const topFont = fitTextToWidth(topText, canvas.width, fontSize);
        setFont(topFont);
        ctx.fillText(topText, middle, window.innerHeight*.15);

        // middle line
        const midFont = Math.max(minFontSize, fontSize * 0.9);
        setFont(midFont);
        ctx.fillText("What's next?", middle, window.innerHeight*.78);

        // bottom line
        const bottomFont = fitTextToWidth(bottomText, canvas.width, fontSize);
        setFont(bottomFont);
        ctx.fillText(bottomText, middle, window.innerHeight*.85);

        // strokes (use same fonts as fills)
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        setFont(topFont);
        ctx.strokeText(topText, middle, window.innerHeight*.15);

        setFont(midFont);
        ctx.strokeText("What's next?", middle, window.innerHeight*.78);

        setFont(bottomFont);
        ctx.strokeText(bottomText, middle, window.innerHeight*.85);

        //Update Title
        document.title = topText;
    };
};