function getUniqueRandomNumber(arr) {
    let randomNumber = Math.random();
    if (arr.includes(randomNumber)) {
        return getUniqueRandomNumber(arr);
    } else {
        // arr.push(randomNumber);
        return randomNumber;
    }
}


export default getUniqueRandomNumber 