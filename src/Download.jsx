export default function Download({ fileData, fileName }) {
  const handleDownload = () => {
    if (!fileData.trim()) {
      alert("Error: Editor is Empty!");
      return;
    }
    const file = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const element = document.createElement("a");
    element.href = url;
    element.download = `${fileName ? fileName : "filler"}.java`;
    document.body.appendChild(element);
    element.click();
  };
  return (
    <button className="download-button" onClick={handleDownload}>
      <img src="https://i.imgur.com/HlU4bKb.png" id="download-image"></img>
    </button>
  );
}
