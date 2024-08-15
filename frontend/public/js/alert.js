function dispatchAlert() {
    var elem = document.getElementById("alert-bar");
    var width = 1;
    var id = setInterval(frame, 20);
    function frame() {
      if (width >= 100) {
        document.getElementById("alert-card").classList.add('alert-close');
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
}

function callAlert(message) {
    document.getElementById("alert-div").innerHTML = getAlert(message);
    document.getElementById("alert-card").classList.toggle('alert-show');
    document.getElementById("alert-card").classList.toggle('alert-close');
    document.getElementById("alert-header").innerText = 'Error!';
    document.getElementById("alert-text").innerText = message;
    dispatchAlert();
}

function getAlert (message) {
  return `
    <div id="alert-card" class="alert-card alert-close">
      <div class="alert-content">
          <span id="alert-header">Error</span>
          <p id="alert-text">${message}</p>
      </div>
      <div id="alert-bar" class="alert-bar"></div>
    </div>
  `;
}