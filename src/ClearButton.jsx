export default function ClearButton({ onClick }) {
  const handleClick = () => {
    onClick("");
  };

  return (
    <button className="clear-button" onClick={handleClick}>
      <img src="https://i.imgur.com/DBTr3QZ.png"></img>
    </button>
  );
}
