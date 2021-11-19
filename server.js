const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const public = path.join(__dirname, 'public');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const port = 3000;

app.use('/', (req, res) => {
    console.log('public :>> ', public);
    res.sendFile(path.join(public, 'index.html'));
})

app.post('/bulk', upload.array('profiles', 4), (req, res) => {
    try {

        const { files } = req
        files.forEach(({ originalname, buffer }) => {
            let uploadLocation = __dirname + '/public/uploads/' + originalname // where to save the file to. make sure the incoming name has a .wav extension

            fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(buffer))); // write the blob to the server as a file
        })

        res.send(req.files);
    } catch (error) {
        console.log(error);
        res.send(400);
    }
});

app.listen(port, () => {
    console.log('listening to the port: ' + port);
});