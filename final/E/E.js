function findStars(arr) {
  return arr.map((h) => (h >= 150 ? h : 0));
}

function findSun(arr) {
  return arr.map((h) => (h > 100 && h < 150 ? h : 0));
}

function findDiamonds(arr) {
  return arr.map((h, i, arr) => {
    const prevH = arr[i - 1] || 0;
    const nextH = arr[i + 1] || 0;

    return h < -100 && prevH >= 0 && nextH >= 0 ? h : 0;
  });
}

function findHill(arr) {
  const hills = arr.map((h, i, arr) => {
    if (h < 0 || h > 100) return 0;

    const prevH = arr[i - 1] || 0;

    if (h === 10 && prevH >= 0) return h;

    if (h - 10 === prevH || h + 10 === prevH) return h;

    return 0;
  });

  let maxHillStart = 0;
  let maxHillH = 0;
  for (let i = 0; i < hills.length; i++) {
    if (hills[i] === 10) {
      let curHillH = 10;

      let j = i + 1;
      while (curHillH < hills[j]) {
        curHillH = hills[j];
        j++;
      }

      if (curHillH > maxHillH) {
        maxHillStart = i;
        maxHillH = curHillH;
      }
    }
  }

  if (maxHillH < 30) return hills.map((h) => 0);

  return hills.map((h, i) => {
    if (i < maxHillStart) return 0;

    if (i > maxHillStart + (maxHillH / 10) * 2) return 0;

    return h;
  });
}

function findLake(arr) {
  const lakes = arr.map((h, i, arr) => {
    if (h > 0 || h < -100) return 0;

    const prevH = arr[i - 1] || 0;

    if (h === -10 && prevH >= 0) return h;

    if (h + 10 === prevH || h - 10 === prevH) return h;

    return 0;
  });

  let maxLakeStart = 0;
  let maxLakeH = 0;
  for (let i = 0; i < lakes.length; i++) {
    if (lakes[i] === -10) {
      let curHillH = -10;

      let j = i + 1;
      while (curHillH > lakes[j]) {
        curHillH = lakes[j];
        j++;
      }

      if (curHillH < maxLakeH) {
        maxLakeStart = i;
        maxLakeH = curHillH;
      }
    }
  }

  if (maxLakeH > -30) return lakes.map((h) => 0);

  return lakes.map((h, i) => {
    if (i < maxLakeStart) return 0;

    if (i > maxLakeStart + -(maxLakeH / 10) * 2) return 0;

    return h;
  });
}

const colors = {
  night: {
    sky: '#120078',
    lake: '#036bb5',
    mount: '#5b3500',
  },
  day: {
    sky: '#5baef7',
    lake: '#0f5ed6',
    mount: '#bb3300',
  },
};

function getHtml(params) {
  let html = '';
  const { starts, sun, diamonds, hill, lake } = params;
  const getH = (h) => params.maxH - h;

  if (params.isNight) {
    for (let i in starts) {
      if (starts[i] === 0) continue;
      const top = getH(starts[i]);
      html += `<div class="star" style="left: ${i * 10}px; top: ${top}px"></div>`;
    }
  } else {
    for (let i in sun) {
      if (sun[i] === 0) continue;
      const top = getH(sun[i]);
      html += `<div class="sun" style="left: ${i * 10}px; top: ${top}px"></div>`;
    }
  }

  for (let i in diamonds) {
    if (diamonds[i] === 0) continue;
    const top = getH(diamonds[i]);
    html += `<div class="diamond" style="left: ${i * 10}px; top: ${top}px"></div>`;
  }

  for (let i in hill) {
    if (hill[i] === 0) continue;
    const top = getH(hill[i]);
    html += `<div class="mount" style="left: ${i * 10}px; top: ${top}px; height: ${hill[i]}px"></div>`;
  }
  for (let i in lake) {
    if (lake[i] === 0) continue;
    const top = getH(0);
    html += `<div class="lake" style="left: ${i * 10}px; top: ${top}px; height: ${-lake[i]}px"></div>`;
  }

  return html;
}

function getCss(params) {
  const color = colors[params.isNight];
  const skyH = (params.maxH / params.worldH) * 100;

  const world = `
position: relative;    
height: ${params.worldH}px;
width: ${params.starts.length * 10}px;
background: linear-gradient(180deg, ${color.sky} ${params.maxH}px, #793b0f ${params.maxH}px);`;

  const mount = `
background-color: ${color.mount};
`;
  const lake = `
background-color: ${color.lake};
`;

  return `
.world {${world}}

.mount {${mount}}
.lake {${lake}}

.world>* {
  width: 10px;
  height: 10px;
  position: absolute;
}

.star {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.star::after {
  content: '';
  width: 100%;
  height: 100%;
  background-color: #fff;
  transform: rotate(45deg);
}

.sun {
  background-color: #ffff00;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sun::after {
  content: '';
  width: 100%;
  height: 100%;
  background-color: #ffff00;
  transform: rotate(45deg);
}

.diamond {
  background-color: #fff;
  transform: translateY(-10px) rotate(45deg);
}
`;
}

function arrToHtml(arr) {
  const starts = findStars(arr);
  const sun = findSun(arr);
  const diamonds = findDiamonds(arr);
  const hill = findHill(arr);
  const lake = findLake(arr);

  const isNight = sun.filter((h) => h).length === 0;
  const maxH = Math.max(...arr);
  const minH = Math.min(...arr);
  const worldH = maxH + -minH;

  const html = getHtml({
    starts,
    sun,
    diamonds,
    hill,
    lake,
    isNight,
    maxH,
    minH,
    worldH,
  });
  const css = getCss({
    starts,
    sun,
    diamonds,
    hill,
    lake,
    isNight: isNight ? 'night' : 'day',
    maxH,
    minH,
    worldH,
  });

  return {
    style: css,
    script: () => {
      document.querySelector('.world').innerHTML = html;
    },
  };
}

module.exports = arrToHtml;
