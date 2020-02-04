const { ipcRenderer } = window.require("electron");

ipcRenderer.on("child-data", (event, arg) => {
  const root = document.getElementById("root");
  root.innerHTML = `
    <p class="subject">${arg.subject}</p>
    <div class="content">
      <div class="from">
        ${arg.from}
      </div>
      ${arg.content}
    </div>`;

  document.title = `Email from: ${arg.from}`;
});
