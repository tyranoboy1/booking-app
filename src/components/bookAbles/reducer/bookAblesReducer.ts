/** bookAblesReducer 리듀서 함수 */
interface IIntialState {
  group: string;
  selectIndex: number;
  isShowDetail: boolean;
  bookables: IBookables[];
}
export interface IBookables {
  id: number;
  group: string;
  title: string;
  notes: string;
  sessions: number[];
  days: number[];
}
interface ISetGroupAction {
  type: "SET_GROUP";
  payload: string;
}

interface ISetBookableAction {
  type: "SET_BOOKABLE";
  payload: number;
}

interface IToggleHasDetailsAction {
  type: "TOGGLE_IS_DETAIL";
}

interface IsNextBookableAction {
  type: "NEXT_BOOKABLE";
}

type Action =
  | ISetGroupAction
  | ISetBookableAction
  | IToggleHasDetailsAction
  | IsNextBookableAction;

const bookAblesReducer = (state: IIntialState, action: Action) => {
  switch (action.type) {
    case "SET_GROUP":
      return {
        ...state,
        group: action.payload,
        selectIndex: 0,
      };
    case "SET_BOOKABLE":
      return {
        ...state,
        selectIndex: action.payload,
      };

    case "TOGGLE_IS_DETAIL":
      return {
        ...state,
        isShowDetail: !state.isShowDetail,
      };

    case "NEXT_BOOKABLE":
      const count = state.bookables.filter(
        (b: any) => b.group === state.group
      ).length;

      return {
        ...state,
        selectIndex: (state.selectIndex + 1) % count,
      };

    default:
      return state;
  }
};

export default bookAblesReducer;
