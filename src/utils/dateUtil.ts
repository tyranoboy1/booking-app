// TODO  날짜를 처리하는 유틸함수 구현
class DateUtil {
  static addDays = (date: any, daysToAdd: any) => {
    const clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + daysToAdd);
    return clone;
  };
}

export default DateUtil;
