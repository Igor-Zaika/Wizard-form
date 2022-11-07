import { openDB } from 'idb';

const dbPromise = openDB('Allforms', 1, {
  upgrade(db) {
    db.createObjectStore('forms');
  },
});


export async function get(key) {
  return (await dbPromise).get('forms', key);
};

export async function set(key, val) {
  return (await dbPromise).put('forms', val, key);
};

export async function del(key) {
  return (await dbPromise).delete('forms', key);
};

export async function clear() {
  return (await dbPromise).clear('forms');
};

export async function keys() {
  return (await (await dbPromise).getAllKeys('forms'));
};

export async function getAll() {
  return (await (await dbPromise).getAll('forms'));
};




const dbPromiseSecond = openDB('allUsers', 1, {
  upgrade(db) {
    db.createObjectStore('users');
  },
});

export async function setList(key, val) {
  return (await dbPromiseSecond).put('users', val, key);
};

export async function getAllList() {
  return (await (await dbPromiseSecond).getAll('users'));
};

export async function delUser(key) {
  return (await dbPromiseSecond).delete('users', key);
};

//SingleUser 

const dbPromiseSingle = openDB('singleUser', 1, {
  upgrade(db) {
    db.createObjectStore('single');
  },
});

export async function setSingleUser(key, val) {
  return (await dbPromiseSingle).put('single', val, key);
};

// export async function setSingleUserTabs(key, val) {
//   return (await dbPromiseSecond).put('single', val, key);
// };

export async function getSingleUser() {
  return (await (await dbPromiseSingle).getAll('single'));
};

// export async function getSingleUserTabs() {
//   return (await (await dbPromiseSingle).getAll('singleUserTabs'));
// };

export async function delSingleUser(key) {
  return (await dbPromiseSingle).delete('single', key);
};

export async function clearSingleUser() {
  return (await dbPromiseSingle).clear('single');
};