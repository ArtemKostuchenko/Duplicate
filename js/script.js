const data = document.querySelector("#data");
const nickname = document.querySelector('#nickname');
const amount = document.querySelector('#amount');
const output = document.querySelector("#output");
const notification = document.querySelector("#copied");
let timeout;

const generateRGB = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let averageValue = (r + g + b) / 3;
    r = Math.round((r + averageValue) / 2);
    g = Math.round((g + averageValue) / 2);
    b = Math.round((b + averageValue) / 2);

    return {r, g, b};
}

const oldBrowsersCopy = (buffer) => {
    let tempTextArea = document.createElement("textarea");
    tempTextArea.value = buffer;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
}

const duplicate = () => {
    notification.hidden = true;
    if (timeout !== undefined) clearTimeout(timeout);
    const nickValue = nickname.value;
    const amountValue = +amount.value;
    let buffer = '';
    for (let i = 0; i < amountValue; i++) {
        i !== amountValue - 1 ? buffer += `${nickValue}\n` : buffer += `${nickValue}`;
    }
    output.textContent = '';
    const color = generateRGB();
    output.style.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
    output.textContent = buffer;
    navigator.clipboard.writeText(buffer + '\n')
        .then(function () {
            notification.hidden = false;
            timeout = setTimeout(() => notification.hidden = true, 2000);
        })
        .catch(function (error) {
            console.error("Помилка при копіюванні рядка: ", error);
            oldBrowsersCopy(buffer + '\n')
            notification.hidden = false;
            timeout = setTimeout(() => notification.hidden = true, 2000);
        });
}

if (data) {
    notification.hidden = true;
    data.addEventListener('submit', (e) => {
        e.preventDefault();
        duplicate();
    });
    amount.addEventListener('input', (e) => {
        const val = e.target.value;
        if (isNaN(val)) e.target.value = val.slice(0, -1);
    });
}


