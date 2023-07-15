// фнкция преобразует число минут в формат "часы минуты"

function durationFormat(minutes) {
  if(isNaN(minutes) || minutes < 0) {
    return minutes; // вернём как есть
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursStr = hours > 0 ? `${hours}ч` : '';
  const minsStr = mins > 0 ? `${mins}мин` : '';

  return `${hoursStr} ${minsStr}`.trim();
}

export default durationFormat;