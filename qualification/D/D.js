function getColAlignment(colgroup) {
  if (!colgroup) return [];

  const cols = [...colgroup.querySelectorAll('col')];

  return cols.map(({ align }) => align.toLowerCase() || 'left');
}

function getRows(element, alignment = []) {
  if (!element) return [];

  const rows = [...element.querySelectorAll('tr')];

  return rows.map(row => getCells(row, alignment));
}

function getCells(row, alignment = []) {
  const cells = [...row.querySelectorAll('th, td')];

  return cells.map((cell, id) => ({
    tag: cell.tagName.toLowerCase(),
    align: alignment[id] || 'left',
    text: trimText(cell.textContent),
  }));
}

function trimText(text) {
  return text
    .replace(/\n/g, '')
    .replace(/  /g, ' ')
    .trim();
}

const formatAlignment = {
  left: text => ' ' + text + '  ',
  center: text => '  ' + text + '  ',
  right: text => '  ' + text + ' ',
};

const splitter = { th: '^', td: '|' };

function solution(input) {
  const table = new DOMParser().parseFromString(input, 'text/html').querySelector('table');

  const colgroup = table.querySelector('colgroup');
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');

  const colAlignment = getColAlignment(colgroup);

  const theadRows = getRows(thead, colAlignment).map(row => {
    const cells = row.map(({ align, text }) => '^' + formatAlignment[align](text));
    return cells.join('') + '^';
  });

  const tbodyRows = getRows(tbody, colAlignment).map(row => {
    const cells = row.map(({ align, text, tag }) => splitter[tag] + formatAlignment[align](text));
    return cells.join('') + '|';
  });

  return [...theadRows, ...tbodyRows].join('\n');
}
