import { ChangeEvent, Fragment, useReducer } from "react";
import data from "../../data/static.json";
import { FaArrowRight } from "react-icons/fa";
import ButtonCommon from "../../common/button/Button";
import SelectBoxCommon from "../../common/select/SelectBox";
import bookAblesReducer, { IBookables } from "./reducer/bookAblesReducer";

const { bookables, days, sessions } = data;

/** 리듀서 초기상태 */
const initialState = {
  group: "Rooms",
  selectIndex: 0,
  isShowDetail: true,
  bookables,
};

const BookablesList = () => {
  const [state, dispatch] = useReducer(bookAblesReducer, initialState);
  const { group, selectIndex, isShowDetail, bookables } = state;
  /** new Set 함수로 중복없는 배열을 만들 수 있다. */
  const bookablesInGroup = bookables.filter(
    (b: IBookables) => b.group === group
  );

  const bookable = bookablesInGroup[selectIndex];
  const groups = [...new Set(bookables.map((b: IBookables) => b.group))];

  /** 그룹 체인지 이벤트 */
  const changeGroup = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value,
    });
  };
  /** 선택된 목록 체인지 이벤트 */
  const changeBookable = (selectedIndex: number) => {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex,
    });
  };

  /** nextButton dispatch */
  const nextBookable = () => {
    dispatch({ type: "NEXT_BOOKABLE" });
  };

  /** show detail dispatch */
  const toggleDetails = () => {
    dispatch({ type: "TOGGLE_IS_DETAIL" });
  };

  return (
    <Fragment>
      <div>
        <SelectBoxCommon
          selectValue={group}
          onChange={changeGroup}
          groupData={groups}
        />
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b: IBookables, i: number) => (
            <li key={b.id} className={i === selectIndex ? "selected" : ""}>
              <ButtonCommon onClick={() => changeBookable(i)} title={b.title} />
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
                    onChange={toggleDetails}
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
                    {bookable.days.sort().map((d: number) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s: number) => (
                      <li key={s}>{sessions[s]}</li>
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
