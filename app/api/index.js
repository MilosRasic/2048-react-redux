const localStorageData = '2048-rr';

export function setItem (data) {
  localStorage.setItem(localStorageData, JSON.stringify(data));
}

export function getItem () {
  let data = localStorage.getItem(localStorageData);
  return JSON.parse(data);
}
