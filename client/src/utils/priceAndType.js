export default function pricentype(price, type) {
  return {
    priceFormat: price
      ? "₽ " + String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "Без цены",
    text: `${type === "rent" ? "Аренда" : "Продажа"}`,
    color: type === "rent" ? "red" : "blue",
  }
}
