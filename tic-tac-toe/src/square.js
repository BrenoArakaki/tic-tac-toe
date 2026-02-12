export default function Square({value, onSquareClick, win}) {
  return (
    <>
      <button onClick={onSquareClick} className={"square " + value + " " + win}>{value}</button>
    </>
  );
}