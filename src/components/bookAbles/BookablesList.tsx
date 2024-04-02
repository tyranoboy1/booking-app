import { Fragment, useMemo, useState } from "react";
import data from "../../data/static.json";
import { FaArrowRight } from "react-icons/fa";
import ButtonCommon from "../../common/button/Button";
import SelectBoxCommon from "../../common/select/SelectBox";

const BookablesList = () => {
  const [selectIndex, setSelectIndex] = useState<number>(1);
  const [group, setGroup] = useState<string>("Kit");
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  /** new Set 함수로 중복없는 배열을 만들 수 있다. */
  const groups = [...new Set(data.bookables.map((b) => b.group))];
  const bookables = data.bookables;
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  /** 해당 리스트의 상태를 업데이트 해주는 함수 */
  // 컴포넌트에서 변수를 직접적으로 변경해도 컴포넌트가 갱신되지 않는다. => UI는 바뀌지않음
  const booksablesButtonClick = (pSelect: number) => {
    setSelectIndex(pSelect);
  };

  const nextBookable = () => {
    setSelectIndex((i) => (i + 1) % bookablesInGroup.length);
  };

  const bookable = useMemo(() => {
    return bookablesInGroup[selectIndex];
  }, [selectIndex]);

  return (
    <Fragment>
      <div>
        <SelectBoxCommon
          selectValue={group}
          onChange={(e) => setGroup(e.target.value)}
          groupData={groups}
        />

        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === selectIndex ? "selected" : ""}>
              <ButtonCommon
                onClick={() => booksablesButtonClick(i)}
                title={b.title}
              />
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={isShowDetail}
                    onChange={() => setIsShowDetail((has) => !has)}
                  />
                  Show Details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {isShowDetail && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{data.days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{data.sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BookablesList;
