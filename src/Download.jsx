export default function Download({ fileData, fileName }) {
  const handleDownload = () => {
    const file = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const element = document.createElement("a");
    element.href = url;
    element.download = `${fileName}.java`;
    document.body.appendChild(element);
    element.click();
  };
  return (
    <button className="download-button" onClick={handleDownload}>
      <img src="https://cdn-icons-png.flaticon.com/512/0/532.png" id = "download-image"></img>
    </button>
  );
}
