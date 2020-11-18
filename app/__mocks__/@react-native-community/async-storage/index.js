jest.mock('@react-native-community/async-storage', () => { 
    let cache = {};
    return {
      setItem: jest.fn((key, value) => {
        return new Promise((resolve, reject) => {
          return (typeof key !== 'string' || typeof value !== 'string')
            ? reject(new Error('key and value must be string'))
            : resolve(cache[key] = value);
        });
      }),
      getItem: jest.fn((key, value) => {
        return new Promise((resolve) => {
          return cache.hasOwnProperty(key)
            ? resolve(cache[key])
            : resolve(null);
        });
      }),
      removeItem: jest.fn((key) => {
        return new Promise((resolve, reject) => {
          return cache.hasOwnProperty(key)
            ? resolve(delete cache[key])
            : reject('No such key!');
        });
      }),
      clear: jest.fn((key) => {
        return new Promise((resolve, reject) => resolve(cache = {}));
      }),
      getAllKeys: jest.fn((key) => {
        return new Promise((resolve, reject) => resolve(Object.keys(cache)));
      }),
    }
  });