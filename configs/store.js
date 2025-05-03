function handlesStore(action, key, value) {
  if (action === 'set') {
    localStorage.setItem(key, value);
  } else if (action === 'get') {
    return localStorage.getItem(key);
  } else if (action === 'delete') {
    localStorage.removeItem(key);
  } else if (action === 'clear') {
    localStorage.clear();
  }
}

export default handlesStore
