document.getElementById('soundButton').addEventListener('click', () => {
    fetch('/play-sound')
        .then(response => response.json())
        .then(data => {
            console.log(data.status);
            // Additional client side logic if needed
        })
        .catch(error => {
            console.log(error);
        });
});