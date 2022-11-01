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
