const express = require('express');
const app = express();
const PORT = 3000;

// Serve a basic HTML page that hits the Django API
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Dockerized App</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f4f4f9;}
                .card { background: white; padding: 30px; display: inline-block; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                h1 { color: #333; }
                button { padding: 10px 20px; font-size: 16px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Node.js Frontend</h1>
                <p>Click below to fetch live data from the <strong>Django Backend</strong>.</p>
                <button onclick="fetchData()">Fetch Data</button>
                <h3 id="result" style="margin-top: 20px; color: #28a745;"></h3>
            </div>

            <script>
                async function fetchData() {
                    try {
                        // Point directly to the Django container port on localhost
                        const response = await fetch('http://localhost:8000/api/status');
                        const data = await response.json();
                        document.getElementById('result').innerText = 
                            "Backend Status: " + data.status + " | API Hits: " + data.total_api_requests;
                    } catch (err) {
                        document.getElementById('result').innerText = "Error connecting to Django backend.";
                    }
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Frontend running on http://localhost:${PORT}`);
});