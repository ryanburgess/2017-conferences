'use strict';
const fs = require('fs');
const obj = require('./list.json');
let content = '';

// create list of conferences
for (const conference of obj) {
  content += (
    `<h2><a href="${conference.url}">${conference.title}</a></h2>
<p><strong>Where:</strong> ${conference.where}<br>
<strong>When:</strong> ${conference.when}</p>\n\n`
  );
}

// create README with the list of conferences
fs.writeFile('./index.html', content, function (err) {
  if (err) throw err;
  console.log('Updated conference list');
});