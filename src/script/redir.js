function redir(path, timeout) {
    document.getElementById("main").style.opacity = "0";
    if (timeout > 0 && timeout !== undefined) {
        setTimeout(() => {
            window.location.assign(path);
        }, timeout * 1000);
    }
}