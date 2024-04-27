const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const axios = require('axios'); // For making HTTP requests
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(bodyParser.json());
app.use(cors());

var csvData = null;




app.post('/upload-workflow', upload.single('file'), (req, res) => {
    const file = req.file;
    const workflowData = req.body.workflowTypes;

    // Check if file or workflow data is missing
    if (!file || !workflowData) {
        return res.status(400).json({ error: 'File or workflow data missing' });
    }

    // Read the uploaded file
    fs.readFile(file.path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Error reading the file' });
        }

        // Process the uploaded file or workflow data as needed
        csvData = data

        // Execute workflow with the received data
        executeWorkflow(workflowData.split(','));

        // Send a response
        res.json({ message: 'File and workflow data received and processed successfully' });
    });
});








async function executeWorkflow(workflowTypes) {
    // Traverse workflow and execute tasks
    for (let type of workflowTypes) {
        switch (type) {
            case 'filterdata':
                processFilterData();
                break;
            case 'wait':
                await wait();
                break;
            case 'convertformat':
                convertFormat();
                break;
            case 'send':
                sendPostRequest();
                break;
            // Handle other node types...
            default:
                break;
        }
    }
}





// Function to process data in "Filter Data" node
function processFilterData() {
    // Implement logic to process data and convert column values to lowercase
    console.log("fitering the data .............")
    const convertedData = csvData
        .split('\n')
        .map(line => line.split(',').map(convertToLowerCase).join(',')) // Convert to lowercase
        .join('\n');

    csvData = convertedData


}

function delayedFunction(message, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(message);
            resolve();
        }, delay);
    });
}

async function wait() {
    await delayedFunction("Message 1 after 2 seconds", 2000);
}

// Function to convert data in "Convert Format" node
function convertFormat() {

    csvData= convertToJSON()

}
const sendPostRequest = () => {

    // Example usage:
    const url = 'https://e9612d1dc3444de991d64449a5bdfe7f.api.mockbin.io/';
    const method = 'POST';
    const data = csvData;
    console.log(csvData);

    sendRequest(url, method, data)
        .then(response => {
            // Handle response
        })
        .catch(error => {
            // Handle error
        });
}
async function sendRequest(url, method, data) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}








function convertToLowerCase(str) {
    return str.toLowerCase();
}

// Function to convert CSV data to JSON
function convertToJSON() {

    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(header => header.trim()); // Trim headers to remove leading/trailing whitespace
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj = {};

        for (let j = 0; j < headers.length; j++) {
            const key = headers[j];
            let value = values[j].trim(); // Trim values to remove leading/trailing whitespace

            // If value looks like a number, parse it as a number
            if (!isNaN(value)) {
                value = parseFloat(value);
            }

            obj[key] = value;
        }

        jsonData.push(obj);
    }

    return jsonData;
}


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
