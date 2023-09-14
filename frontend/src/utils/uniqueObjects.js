export default function uniqueObjects(arr) {
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