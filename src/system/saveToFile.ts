import { IEmail } from "./mock/constant";

const { dialog } = window.require("electron").remote;
const fs = window.require("fs");

function saveToFile(data: IEmail, fileName: string = "email") {
  const emailJSON = JSON.stringify(data);
  const options = {
    title: "Save email to file",
    defaultPath: fileName,
    buttonLabel: "Save",
    filters: [
      { name: "html", extensions: ["html"] },
      { name: "txt", extensions: ["txt"] }
    ]
  };

  dialog.showSaveDialog(options).then((result: any) => {
    console.log("result", result);
    const filename = result.filePath;

    if (filename === undefined) {
      alert("Wrong file name");
      return;
    }

    fs.writeFile(filename, emailJSON, (err: Error) => {
      if (err) {
        alert(`An error occurred with file creation ${err.message}`);
        return;
      }
    });
  });
}

export default saveToFile;
