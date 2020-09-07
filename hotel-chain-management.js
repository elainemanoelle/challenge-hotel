import { dataHotelChain } from "./data-hotel-chain";

function createManagement(data) {
  let dayWeekday = ["mon", "tues", "wed", "thur", "fri"];
  let dayWeekend = ["sun", "sat"];

  return {
    verifyUndefinedInput() {
      if (typeof data === "undefined") {
        throw new Error("Erro: Nenhuma entrada foi fornecida!");
      }
    },
    getTypeGuest() {
      this.verifyUndefinedInput();

      return Object.keys(data)[0];
    },
    convertDates() {
      this.verifyUndefinedInput();
      let dataGuest = data[this.getTypeGuest()];

      dataGuest = dataGuest.map((value, key) => {
        let day = value.substring(value.indexOf("(") + 1, value.indexOf(")"));

        if (dayWeekday.includes(day)) {
          return "weekday";
        } else {
          return "weekend";
        }
      });

      return dataGuest;
    },
    calcTotalPriceByHotel(dates, hotelObj) {
      let price = 0;

      var totalPrice = dates.reduce((acc, date) => {
        if (date === "weekday") {
          price = hotelObj["weekdayRate"][this.getTypeGuest().toLowerCase()];
        } else {
          price = hotelObj["weekendRate"][this.getTypeGuest().toLowerCase()];
        }
        return acc + price;
      }, 0);
      return { totalPrice, name: hotelObj["name"] };
    },
    getCheaperHotel() {
      let dates = this.convertDates();
      let cheaperHotel = {};

      dataHotelChain.forEach((hotel, key) => {
        let currentHotel = this.calcTotalPriceByHotel(dates, hotel);
        if (
          !Object.values(cheaperHotel).length ||
          (Object.values(cheaperHotel).length &&
            cheaperHotel.totalPrice > currentHotel.totalPrice)
        ) {
          cheaperHotel = currentHotel;
        }
        // console.log("#######", currentHotel);
      });

      return cheaperHotel.name;
    },
  };
}

module.exports = { createManagement };
