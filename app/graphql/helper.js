export const queryfy = obj => {
  // Make sure we don't alter integers.
  if (typeof obj === 'number') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const props = obj.map(value => `${queryfy(value)}`).join(',');
    return `[${props}]`;
  }

  if (typeof obj === 'object') {
    const props = Object.keys(obj)
      .map(key => `${key}:${queryfy(obj[key])}`)
      .join(',');
    return `{${props}}`;
  }

  return JSON.stringify(obj);
};