export function uniqueObjects(arr) {
  return arr.reduce((acc, cur) => {
    const present = acc.find(
      (i) =>
        i.title.toLowerCase().trim() === cur.title.toLowerCase().trim() ||
        i.poster.toLowerCase().trim() === cur.poster.toLowerCase().trim() ||
        i.src.trim() === cur.src.trim()
    );
    if (!present) {
      acc.push(cur);
    }
    return acc;
  }, []);
}
export function uniqueArray(x, y) {
  try {
    return x.reduce((acc, cur) => {
      const present = y.find(
        (i) =>
          i.title.toLowerCase().trim() === cur.title.toLowerCase().trim() ||
          i.poster.toLowerCase().trim() === cur.poster.toLowerCase().trim() ||
          i.src.trim() === cur.src.trim()
      );

      if (!present) {
        acc.push(cur);
      }
      return acc;
    }, []);
  } catch (err) {
    console.log(err.message);
  }
}
