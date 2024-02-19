import React from "react";

function Counter() {
  const [number, setNumber] = React.useState(0);

  function updateNumber() {
    setNumber(number + 1);
  }

  return (
    <div>
      <h1>현재 : {number}번 클릭되었습니다.</h1>
      <button onClick={updateNumber}>Count가 1씩 증가합니다.</button>
    </div>
  );
}

export default Counter;
