import { dataHotelChain } from "./data-hotel-chain";
const ManagementFactory = require("./hotel-chain-management.js");

const dataGuestOne = {
  Regular: ["16Mar2009(mon)", "17Mar2009(tues)", "18Mar2009(wed)"],
};
const dataGuestTwo = {
  Regular: ["20Mar2009(fri)", "21Mar2009(sat)", "22Mar2009(sun)"],
};
const dataGuestThree = {
  Reward: ["26Mar2009(thur)", "27Mar2009(fri)", "28Mar2009(sat)"],
};

describe("Creation", () => {
  it.only("should be truthy after creation", () => {
    const createManagement = ManagementFactory.createManagement();
    expect(!!createManagement).toBeTruthy();
  });

  it.only("Should have a 'typeGuest' property ", () => {
    const createManagement = ManagementFactory.createManagement(dataGuestOne);
    expect(typeof createManagement.getTypeGuest).toEqual("function");
  });

  it.only("Should 'getTypeGuest' function returning the type of guest", () => {
    const createManagement = ManagementFactory.createManagement(dataGuestThree);
    expect(createManagement.getTypeGuest()).toEqual("Reward");
  });
});

describe("Dates", () => {
  it.only("Should have 'convertDates' function", () => {
    const createManagement = ManagementFactory.createManagement();
    expect(typeof createManagement.convertDates).toEqual("function");
  });

  it.only("Should throw a error if empty argument inputed", () => {
    const createManagement = ManagementFactory.createManagement();
    expect(() => createManagement.convertDates()).toThrow(Error);
  });

  it.only("Should throw a error if empty argument inputed with this message: 'Erro: Nenhuma entrada foi fornecida!'", () => {
    const createManagement = ManagementFactory.createManagement();
    try {
      createManagement.convertDates();
    } catch (error) {
      expect(error.message).toEqual("Erro: Nenhuma entrada foi fornecida!");
    }
  });

  it.only("Should return if the dates passsed as argument are weekday or weekend ", () => {
    const createManagement = ManagementFactory.createManagement(dataGuestTwo);
    let objWithConvertedDates = createManagement.convertDates();

    expect(typeof objWithConvertedDates).toBe("object");
    console.log("LAAY", objWithConvertedDates);
    expect(!!Object.values(objWithConvertedDates).length).toBeTruthy();

    let allConverted = true;
    Object.values(objWithConvertedDates).forEach((value, key) => {
      if (value !== "weekday" && value !== "weekend") {
        allConverted = false;
      }
    });

    expect(allConverted).toBeTruthy();
  });
});

describe("The cheaper hotel", () => {
  it.only("Should return the 'Lakewood' if the guest sended is the 'dataGuestTwo'", () => {
    const createManagement = ManagementFactory.createManagement(dataGuestTwo);
    let nameCheaperHotel = createManagement.getCheaperHotel();

    expect(nameCheaperHotel).toBe("Lakewood");
  });
});
