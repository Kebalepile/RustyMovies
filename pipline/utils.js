/**
 *
 * @param {number} count
 * @param {number} max
 * @description logs the progress of whatever process is being done.
 */
export function progress(count, max) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = formatPercent(count / max);
  process.stdout.write(`${count}/${max} (${percent}) scrapped movie links`);
}
function formatPercent(n) {
  return (n * 100).toFixed(2) + "%";
}
