const getcolor = () => {
    // hex code
    const RandomNumber = Math.floor(Math.random() * 16777215);
    const randomColor = "#" + RandomNumber.toString(16);
    document.body.style.backgroundColor = randomColor;
    document.getElementById("colormode").innerHTML = randomColor;

    navigator.clipboard.writeText(randomColor)
}

// event call
document.getElementById("btn").addEventListener(
    "click",
    getcolor
)

// initial call
getcolor();