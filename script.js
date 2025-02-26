document.getElementById('yes-button').addEventListener('click', function() {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.body.style.backgroundColor = '#f8f8f8'; // Initial background
});

document.getElementById('play-button').addEventListener('click', function() {
    const choices = [
        { name: 'rock', image: 'img/rock.png', color: '#ff9b9b' }, // Rock = Red
        { name: 'paper', image: 'img/paper.png', color: '#fff9b5' }, // Paper = Yellow
        { name: 'scissors', image: 'img/scissors.png', color: '#b0ffff' } // Scissors = Blue
    ];

    document.body.style.backgroundColor = 'white'; // Reset before shuffle
    const words = document.querySelectorAll('.rps-word');
    words.forEach(word => word.style.opacity = 0);

    let index = 0;

    // Start shuffling through Rock, Paper, Scissors
    const imageShuffleInterval = 150; // Set to 150 milliseconds for images
    const shuffle = setInterval(() => {
        const choice = choices[index % choices.length];
        document.getElementById('rps-image').src = choice.image;
        document.body.style.backgroundColor = choice.color;

        index++;
    }, imageShuffleInterval);

    // Show words one by one from left to right
    let wordIndex = 0;
    const wordDisplayInterval = 500; // Set to 500 milliseconds for words
    const showWords = setInterval(() => {
        if (wordIndex < words.length) {
            words[wordIndex].style.opacity = 1; // Show current word
            if (wordIndex > 0) {
                words[wordIndex - 1].style.opacity = 0; // Hide previous word
            }
            wordIndex++;
        } else {
            clearInterval(showWords); // Stop showing words after the last one
        }
    }, wordDisplayInterval); // Change words every 600 milliseconds

    // Stop shuffling after 2000 milliseconds
    setTimeout(() => {
        clearInterval(shuffle); // Stop the shuffle before picking randomly
        clearInterval(showWords); // Clear the word display interval

        // Hide all words before showing the final result
        words.forEach(word => word.style.opacity = 0); // Hide words

        // Wait a brief moment before picking the final result (ensures no override)
        const finalResultDelay = 200; // Delay for showing the final result

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * choices.length);
            const randomChoice = choices[randomIndex];

            document.getElementById('rps-image').src = randomChoice.image;
            document.body.style.backgroundColor = randomChoice.color;

            // Show the final result without delay affecting the images
        }, finalResultDelay);

    }, 2000); // Duration of shuffling 
});
