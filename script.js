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
        ctx.font = .08 * canvas.width + 'px Impact';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(topText, middle, window.innerHeight*.15, window.innerWidth*.8);
        ctx.fillText("What's next?", middle, window.innerHeight*.78);
        ctx.fillText(bottomText, middle, window.innerHeight*.85,window.innerWidth*.8);

        ctx.strokeStyle = 'black';
        ctx.lineWidth=2;
        ctx.strokeText(topText, middle, window.innerHeight*.15, window.innerWidth*.8);
        ctx.strokeText("What's next?", middle, window.innerHeight*.78);
        ctx.strokeText(bottomText, middle, window.innerHeight*.85,window.innerWidth*.8);
        
        //Update Title
        document.title = topText;
    };
};