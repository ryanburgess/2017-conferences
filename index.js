'use strict';
const fs = require('fs');
const obj = require('./list.json');
let content = '# 2017 Web Development Conferences\nA list of 2017 web development conferences.\nA list of [2016 conferences](https://github.com/ryanburgess/2016-conferences).\n\n';

// create contributing instructions
const contribute = ('## Contributing \n' +
'1. Fork it\n' +
'2. Add your conference to `list.json`\n' +
'3. Run `node index` to update `README.md` with your changes\n' +
'4. Create your feature branch (`git checkout -b my-new-feature`)\n' +
'5. Commit your changes (`git commit -am "Add some feature"`)\n' +
'6. Push to the branch (`git push origin my-new-feature`)\n' +
'7. Create new Pull Request');

// create heading for conference list
content += '\n#Conference List\n';

let formatDateYYYYMMDD = (_dateString) => {
  let _d = new Date(_dateString);
  return new Date(_d - _d.getTimezoneOffset() * 60 * 1000).toJSON().split(/T/)[0].replace(/-/g, '');
};

let getCalendarUrl = (_conf) => {
  let _date = (function () {
    let _when = _conf.when.replace(/(\d)(st|nd|rd|th)/g, '$1');
    let _startDay = _when.match(/\d+/);
    let _startDate = formatDateYYYYMMDD(`${_conf.month} ${_startDay}, 2016`);
    let _endDay = _when.match(/(\d+)(?:-|–)(\d+)/);
    let _endMonth = _when.match(/\d+(?:-|–)([^\d\s]+)/);
    let _endDate;

    _endMonth = _endMonth ? _endMonth[1] : null;

    if (_endDay) {
      _endDate = formatDateYYYYMMDD(`${_endMonth || _conf.month} ${_endDay[2]}, 2016`);
    } else if (_endMonth) {
      _endDay = _when.match(/(\d)+, 2016/)[1];
      _endDate = formatDateYYYYMMDD(`${_endMonth || _conf.month} ${_endDay}, 2016`);
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

  content += (
    `\n## [${conference.title}](${conference.url}) [📆](${getCalendarUrl(conference)}, Google Calendar)
**Where:** ${conference.where}\n
**When:** ${conference.when}\n\n`
  );
}

content += contribute + '\n';

// create README with the list of conferences
fs.writeFile('./README.md', content, function (err) {
  if (err) throw err;
  console.log('Updated conference list');
});
