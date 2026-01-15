const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 6500;
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  console.log('root')
  res.sendFile(path.join(__dirname, "media.html"));
})

app.get(/\/media(.html)?/, (req, res) => {
  console.log('media')
  res.sendFile(path.join(__dirname, "media.html"));
});

app.get('/video', (req, res) => {
  console.log('video')
  res.sendFile(path.join(__dirname, "pages", "video.html"));
})

app.get(/\/*/, (req, res) => {
  console.log('media file loading');
  res.sendFile(path.join(__dirname, "media.html"));
});


app.listen(PORT, () => {
  console.log(`Frontend is running in port ${PORT}`);
})