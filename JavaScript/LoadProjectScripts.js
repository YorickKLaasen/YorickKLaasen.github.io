fetch('Scripts/CarCollision.cs')
    .then(response => {
        if (!response.ok) {
            throw new Error('Netwerkantwoord was niet ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('CarCollisionContainer').textContent = data;
    })
    .catch(error => console.error('Error loading CarCollision.cs:', error));