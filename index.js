'use strict';
const fs = require('fs');
const obj = require('./list.json');
const year = 2017;
let content = `# ${year} Web Development Conferences
A list of ${year} web development conferences.
A list of [${year - 1} conferences](https://github.com/ryanburgess/${year - 1}-conferences).
`;
// create contributing instructions
const contribute =  `
## Contributing
1. Fork it
2. Add your conference to \`list.json\`
3. Run \`node index to update\` \`README.md\` with your changes
4. Create your feature branch (\`git checkout -b my-new-feature\`)
5. Commit your changes (\`git commit -am "Add some feature"\`)
6. Push to the branch (\`git push origin my-new-feature\`)
7. Create new Pull Request
`;

// create heading for conference list
content += `
# Conference List
`;

// format date
let formatDateYYYYMMDD = (_dateString) => {
  let _d = new Date(_dateString);
  return new Date(_d - _d.getTimezoneOffset() * 60 * 1000).toJSON().split(/T/)[0].replace(/-/g, '');
};

let getCalendarUrl = (_conf) => {
  let _date = (function () {
    let _when = _conf.when.replace(/(\d)(st|nd|rd|th)/g, '$1');
    let _startDay = _when.match(/\d+/);
    let _startDate = formatDateYYYYMMDD(`${_conf.month} ${_startDay}, ${year}`);
    let _endDay = _when.match(/(\d+)(?:-|–)(\d+)/);
    let _endMonth = _when.match(/\d+(?:-|–)([^\d\s]+)/);
    let _endDate;

    _endMonth = _endMonth ? _endMonth[1] : null;

    if (_endDay) {
      _endDate = formatDateYYYYMMDD(`${_endMonth || _conf.month} ${_endDay[2]}, ${year}`);
    } else if (_endMonth) {
      _endDay = _when.match(/(\d)+, 2017/)[1];
      _endDate = formatDateYYYYMMDD(`${_endMonth || _conf.month} ${_endDay}, ${year}`);
    }

    if (_endDate) {
      return `${_startDate}/${_endDate}`;
    } else {
      return `${_startDate}/${_startDate}`;
    }
  })();

  return `https://www.google.com/calendar/event?action=TEMPLATE&dates=${_date}&text=${_conf.title}&location=${_conf.where}&details=${_conf.url}`;
};

// create list of conferences
for (const conference of obj) {
  // create content for readme
  content += (
    //[📆](${getCalendarUrl(conference)}, Google Calendar)
    `
## [${conference.title}](${conference.url})
**Where:** ${conference.where}

**When:** ${conference.when}
    `
  );
}

// add contribute information after list of conferences
content += contribute;

// create README with the list of conferences
fs.writeFile('./README.md', content, function (err) {
  if (err) throw err;
  console.log('Updated conference list');
});
