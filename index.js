'use strict';
const fs = require('fs');
const obj = require('./list.json');
let content = '# 2017 Web Development Conferences\nA list of 2017 web development conferences.\n\n';

// create contributing instructions
const contribute = ('## Contributing \n' +
'1. Fork it\n' +
'2. Add your conference to `list.json`\n' +
'3. Run `node index` to update `README.md` with your changes\n' +
'4. Create your feature branch (`git checkout -b my-new-feature`)\n' +
'5. Commit your changes (`git commit -am "Add some feature"`)\n' +
'6. Push to the branch (`git push origin my-new-feature`)\n' +
'7. Create new Pull Request');

content += contribute + '\n';

// create heading for conference list
content += '\n#Conference List\n';

// create list of conferences
for (const conference of obj) {
  content += (
    `\n## [${conference.title}](${conference.url})
**Where:** ${conference.where}\n
**When:** ${conference.when}\n\n`
  );
}

// create README with the list of conferences
fs.writeFile('./README.md', content, function (err) {
  if (err) throw err;
  console.log('Updated conference list');
});