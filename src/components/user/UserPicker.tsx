import data from "../../data/static.json";

const UserPicker = () => {
  const userPickerData = data.users;
  return (
    <select>
      {userPickerData.map((item) => {
        return <option key={item.id}>{item.name}</option>;
      })}
    </select>
  );
};

export default UserPicker;
