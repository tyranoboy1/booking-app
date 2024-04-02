import React from "react";

interface IButtonProps {
  onClick: () => void;
  title: string;
}

const ButtonCommon = (props: IButtonProps) => {
  const { title, onClick } = props;
  return (
    <div className="btn" onClick={onClick}>
      {title}
    </div>
  );
};

export default ButtonCommon;
