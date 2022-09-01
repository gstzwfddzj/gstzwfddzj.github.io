window.onmousedown = function (win) {
    window.ondragover = function (params) {
        params.preventDefault();
    }
    window.ondrop = function (a) {
        a.target.appendChild(win.target)
    }
}