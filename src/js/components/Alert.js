const Alert = (className, textContent) => {
    const alert = document.getElementById('alert');
    alert.style.opacity = 1;
    alert.classList.add(className);
    alert.textContent = textContent;
    setInterval(() => alert.style.opacity = '0', 2000)
}

export default Alert;