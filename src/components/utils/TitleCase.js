/**
 * @description
 * takes a string and
 * @returns a title case string
 */
export default (str) => {
    let s1 = str.slice(0,1),
     s2 = str.slice(1),
      newStr = s1.toUpperCase().concat(s2)
  return newStr
}