function getUniqueRandomNumber(arr) {
    let randomNumber = Math.random();
    if (arr.includes(randomNumber)) {
        return getUniqueRandomNumber(arr);
    } else {
        // arr.push(randomNumber);
        return randomNumber;
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default  getUniqueRandomNumber

