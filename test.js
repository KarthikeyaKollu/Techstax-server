// const fs = require('fs');

// // Function to read the CSV file and convert letters to lowercase

// function readAndConvertToLowerCase(filename) {
//     // Read the CSV file
//     fs.readFile(filename, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading the file:', err);
//             return;
//         }

//         // Split the CSV data by lines
//         const lines = data.split('\n');

//         // Loop through each line
//         const convertedLines = lines.map(line => {
//             // Split each line by commas to get individual values
//             const values = line.split(',');
//             // Convert each value to lowercase
//             const lowerCaseValues = values.map(value => value.toLowerCase());
//             // Join the values back with commas
//             return lowerCaseValues.join(',');
//         });

//         // Join the converted lines back to form the CSV data
//         const convertedCSV = convertedLines.join('\n');

//         // Print the converted CSV data
//         console.log(convertedCSV);
//         console.log(convertToJSON(convertedCSV));
//     });
// }

// function convertToLowerCase(str) {
//     return str.toLowerCase();
// }


// function convertToJSON(csvData) {
//     const lines = csvData.split('\n');
//     const headers = lines[0].split(',').map(header => header.trim()); // Trim headers to remove leading/trailing whitespace
//     const jsonData = [];

//     for (let i = 1; i < lines.length; i++) {
//         const values = lines[i].split(',');
//         const obj = {};

//         for (let j = 0; j < headers.length; j++) {
//             const key = headers[j];
//             let value = values[j].trim(); // Trim values to remove leading/trailing whitespace

//             // If value looks like a number, parse it as a number
//             if (!isNaN(value)) {
//                 value = parseFloat(value);
//             }

//             obj[key] = value;
//         }

//         jsonData.push(obj);
//     }

//     return jsonData;
// }
// // Example usage:
// readAndConvertToLowerCase('./tsx-data.csv');





    send();