import { ChangeEvent } from "react";

interface ISelectBoxProps {
  selectValue: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  groupData: any[];
}
const SelectBoxCommon = (props: ISelectBoxProps) => {
  const { selectValue, onChange, groupData } = props;
  return (
    <select value={selectValue} onChange={onChange}>
      {groupData.map((g) => (
        <option value={g} key={g}>
          {g}
        </option>
      ))}
    </select>
  );
};

export default SelectBoxCommon;
