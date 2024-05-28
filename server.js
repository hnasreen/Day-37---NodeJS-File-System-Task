const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Endpoint to create a text file with the current timestamp
app.post('/create-files', async(req, res) => {
    console.log("hello");
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();
    const fileName = `${currentDate.toISOString()}.txt`;

    await fs.writeFile(`./files/${fileName}`, timestamp, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating file');
        }
        else{
            res.status(200).send('File Written Successfully');
        }
        
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/list-files', async(req, res) => {
    await fs.readdir('./files', (err, files) => {
        console.log(files)
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading directory');
        }
       
        return res.status(200).send(files);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});