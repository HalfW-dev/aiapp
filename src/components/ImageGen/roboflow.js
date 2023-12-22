const axios = require("axios");
const fs = require("fs");
const spawner = require("child_process").spawn;

const image = fs.readFileSync("./test.jpg", {
    encoding: "base64"
});

console.log(image);

axios({
    method: "POST",
    url: "https://detect.roboflow.com/riichi-mahjong/6",
    params: {
        api_key: "9zBI3bx7d4qVBh2pX1N1"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    fs.writeFileSync('inferredResult.json', JSON.stringify(response.data));
    inferredResult = fs.readFileSync('inferredResult.json', 'utf8');
})
.then(function() {
    console.log("Labeling")
    const python_process = spawner('python', ['./label.py']);
    console.log("Label done")
    python_process.on('close', function() {
        console.log("Done")
    })
})
.catch(function(error) {
    console.log(error.message);
});

