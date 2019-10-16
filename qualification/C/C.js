const toBinary = (number, bits = 8) => number.toString(2).padStart(bits, '0');

function renderBarcode(catInfo, element) {
  const id = toBinary(catInfo.id);
  const birthday = toBinary(catInfo.birthday, 32);
  const name = catInfo.name
    .padEnd(11, ' ')
    .split('')
    .map(char => toBinary(char.charCodeAt(0)))
    .join('');

  const resultStr = name + id + birthday;

  const controlSum = resultStr.match(/.{16}/g).map(row => {
    const arr = row.match(/1/g) || [];
    return arr.length % 2 === 0 ? '0' : '1';
  });

  render(resultStr.split(''), controlSum, element);
}

function render(info, controlSum, element) {
  const splitter = () => {
    const div = document.createElement('div');
    Object.assign(div.style, {
      width: '7px',
      height: '64px',
      border: '3px solid #000',
      boxSizing: 'border-box',
    });
    return div;
  };

  const renderBoxes = boxes =>
    boxes.map(box => {
      const boxElement = document.createElement('div');
      Object.assign(boxElement.style, {
        width: '8px',
        height: '8px',
        backgroundColor: box === '1' ? '#000' : '#fff',
      });
      return boxElement;
    });

  const container = document.createElement('div');
  Object.assign(container.style, {
    display: 'flex',
    height: '64px',
  });

  const infoContainer = document.createElement('div');
  Object.assign(infoContainer.style, {
    display: 'flex',
    width: '128px',
    flexWrap: 'wrap',
  });

  const controlSumContainer = document.createElement('div');
  Object.assign(controlSumContainer.style, {
    display: 'flex',
    width: '8px',
    flexWrap: 'wrap',
  });

  infoContainer.append(...renderBoxes(info));
  controlSumContainer.append(...renderBoxes(controlSum));

  container.append(splitter(), infoContainer, splitter(), controlSumContainer, splitter());

  element.innerHtml = '';
  element.append(container);
}
