function promise(func) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      func((err, data) => {
        if (err) return reject(err);

        resolve(data);
      }, ...args);
    });
  };
}

function promisify(api) {
  return new Proxy(api, {
    get(target, prop) {
      if (typeof target[prop] === 'function') return promise(target[prop]);

      if (target[prop] && typeof target[prop] === 'object' && !Array.isArray(target[prop])) return promisify(target[prop]);

      return target[prop];
    },
  });
}

module.exports = promisify;
