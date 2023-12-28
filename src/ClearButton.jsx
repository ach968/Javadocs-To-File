export default function ClearButton({ onClick }) {
  const handleClick = () => {
    onClick("");
  };

  return (
    <button className="clear-button" onClick={handleClick}>
      <img src="assets/delete-xxl.png"></img>
    </button>
  );
}
