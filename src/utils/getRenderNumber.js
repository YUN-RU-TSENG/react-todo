/**
 * 取得介於 0 ~ N 之間的隨機整數
 * @param {number} number - 隨機數的上限
 * @returns {number} 0 ~ N 之間的隨機數
 */
function getRandomNumber(N) {
    return Math.floor(Math.random() * N)
}

export default getRandomNumber
