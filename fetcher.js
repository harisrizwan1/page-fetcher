const fs = require('fs');
// const readline = require('readline');
const request = require('request');
const args = process.argv.slice(2);
const link = args[0];
const path = args[1];

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

request(link, (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  fs.writeFile(path, body, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
  });
});