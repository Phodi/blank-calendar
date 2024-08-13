const fs = require('fs');
const ical = require('ical.js');

module.exports = {
    fetch_to_js: function update_holiday() {
        const url = "https://www.myhora.com/calendar/ical/holiday.aspx?latest.ics";
        const filename = `./holiday_data/data.json`;

        fetch(url)
            .then(resp => resp.text())
            .then(txt => {
                const jcalData = ical.parse(txt);
                const vcalendar = new ical.Component(jcalData);
                const events = vcalendar.getAllSubcomponents('vevent');

                // Prepare JSON structure
                const holidayData = events.map(event => {
                    const summary = event.getFirstPropertyValue('summary');
                    const startDate = event.getFirstPropertyValue('dtstart').toString();
                    const endDate = event.getFirstPropertyValue('dtend')?.toString(); // End date might not always be available

                    return {
                        summary: summary,
                        start: startDate,
                        end: endDate,
                    };
                });

                // Write to JSON file
                fs.writeFile(filename, JSON.stringify({year: new Date().getFullYear(),data: holidayData}, null, 2), err => {
                    if (err) {
                        console.error('ERROR While saving holiday data', err);
                    } else {
                        console.log('Holiday data saved successfully!');
                    }
                });
            })
            .catch(err => console.error('ERROR While fetching holiday data', err));
    }
}
