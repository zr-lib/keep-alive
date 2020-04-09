function getTime() {
  const _date = new Date();
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const date = _date.getDate();
  const hour = _date.getHours();
  const minute = _date.getMinutes();
  const second = _date.getSeconds();

  const with0 = val => (val < 10 ? '0' + val : val);

  return `${year}-${with0(month)}-${with0(date)} ${with0(hour)}:${with0(
    minute
  )}:${with0(second)}`;
}

module.exports = {
  getTime
};
