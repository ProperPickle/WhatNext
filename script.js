window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size (optional, can match image size)
    canvas.width = 756;
    canvas.height = 1008;
    const middle = canvas.width/2;

    // Create an image object
    const img = new Image();

    // Set the image source (use your own image)
    img.src = 'https://i.imgur.com/yu3yUJ0.jpeg'; // <-- CHANGE THIS TO YOUR IMAGE PATH

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
        ctx.font = '60px Impact';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(topText, middle, 150, 720);
        ctx.fillText("What's next?", middle, 840);
        ctx.fillText(bottomText, middle, 900,720);

        ctx.strokeStyle = 'black';
        ctx.lineWidth=2;
        ctx.strokeText(topText, middle, 150, 720);
        ctx.strokeText("What's next?", middle, 840);
        ctx.strokeText(bottomText, middle, 900,720);
    };
};