function parseEvents(input) {
  return input
    .map(str => {
      const date = str.match(/\d{2}[\./]\d{2}[\./]\d{2,4}/);
      const event = str.match(/".+"/);

      if (date && event) {
        return `${event}: ${date[0].replace(/\//g, '.')}`;
      }
    })
    .filter(str => str)
    .join('\n');
}

module.exports = parseEvents;
