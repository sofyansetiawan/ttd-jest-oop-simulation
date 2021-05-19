const fs = require("fs");
const { ParkingLot } = require("./index")
const file = "./parkingData.json"
const parkingTest = new ParkingLot(file);

// * RESET JSON DATA AFTER TEST
beforeAll(function(done) {
    const data = {
        "capacity": 0,
        "parkingSlot": [],
        "availableSlot": [],
        "status": false
    }
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(file, jsonData, "utf-8");
    done()
})


describe('Create Parking Lot with 6 slots', () => {
    test('should create parking lot with 6 slots', (done) => {
        const createdParkingLot = parkingTest.create_parking_lot([6])
        expect(createdParkingLot).toEqual(`Created parking lot with 6 slots`)
        done();
    })
})

describe('Park a vehicle with registration number: KA-01-HH-1234', () => {
    test('should park vehicle to slot number 1', (done) => {
        const parkVehicle = parkingTest.park(["KA-01-HH-1234"])
        expect(parkVehicle).toEqual(`Allocated slot number: 1`)
        done();
    })
})

describe('Park a vehicle with registration number: KA-01-HH-9999', () => {
    test('should park vehicle to slot number 2', (done) => {
        const parkVehicle = parkingTest.park(["KA-01-HH-9999"])
        expect(parkVehicle).toEqual(`Allocated slot number: 2`)
        done();
    })
})

describe('Park a vehicle with registration number: KA-01-BB-0001', () => {
    test('should park vehicle to slot number 3', (done) => {
        const parkVehicle = parkingTest.park(["KA-01-BB-0001"])
        expect(parkVehicle).toEqual(`Allocated slot number: 3`)
        done();
    })
})

describe('Park a vehicle with registration number: park KA-01-HH-7777', () => {
    test('should park vehicle to slot number 4', (done) => {
        const parkVehicle = parkingTest.park(["KA-01-HH-7777"])
        expect(parkVehicle).toEqual(`Allocated slot number: 4`)
        done();
    })
})

describe('Park a vehicle with registration number: park KA-01-HH-2701', () => {
    test('should park vehicle to slot number 5', (done) => {
        const parkVehicle = parkingTest.park(["KA-01-HH-2701"])
        expect(parkVehicle).toEqual(`Allocated slot number: 5`)
        done();
    })
})

describe('Park a vehicle with registration number: park KA-01-HH-3141', () => {
    test('should park vehicle to slot number 6', (done) => {
        const parkVehicle = parkingTest.park(["KA-01-HH-3141"])
        expect(parkVehicle).toEqual(`Allocated slot number: 6`)
        done();
    })
})

describe('Unpark / Leave vehicle: KA-01-HH-3141', () => {
    test('should vehicle leave with Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30', (done) => {
        const unparkVehicle = parkingTest.leave(["KA-01-HH-3141", "4"])
        expect(unparkVehicle).toEqual(`Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30`)
        done();
    })
})

describe('Status of parking lot', () => {
    test('should show status of all vehicle in parking lot', (done) => {
        const status = parkingTest.status()
        expect(status).toEqual(`Slot No.\tRegistration No.\n1\tKA-01-HH-1234\n2\tKA-01-HH-9999\n3\tKA-01-BB-0001\n4\tKA-01-HH-7777\n5\tKA-01-HH-2701`)
        done();
    })
})

describe('Park a vehicle with registration number: park KA-01-P-333', () => {
    test('should park vehicle to slot number 6', (done) => {
        const parkVehicle = parkingTest.park(["KA-01-P-333"])
        expect(parkVehicle).toEqual(`Allocated slot number: 6`)
        done();
    })
})

describe('Park a vehicle with registration number: park DL-12-AA-9999', () => {
    test('should parking lot is full', (done) => {
        const parkVehicle = parkingTest.park(["DL-12-AA-9999"])
        expect(parkVehicle).toEqual(`Sorry, parking lot is full`)
        done();
    })
})

describe('Unpark / Leave vehicle: KA-01-HH-1234', () => {
    test('should vehicle leave with Registration number KA-01-HH-1234 with Slot Number 6 is free with Charge 30', (done) => {
        const unparkVehicle = parkingTest.leave(["KA-01-HH-1234", "4"])
        expect(unparkVehicle).toEqual(`Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30`)
        done();
    })
})

describe('Unpark / Leave vehicle: KA-01-BB-0001', () => {
    test('should vehicle leave with Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50', (done) => {
        const unparkVehicle = parkingTest.leave(["KA-01-BB-0001", "6"])
        expect(unparkVehicle).toEqual(`Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50`)
        done();
    })
})

describe('Unpark / Leave vehicle: DL-12-AA-9999', () => {
    test('should vehicle leave with Registration number DL-12-AA-9999 with Slot Number 3 is free with Charge 50', (done) => {
        const unparkVehicle = parkingTest.leave(["DL-12-AA-9999", "2"])
        expect(unparkVehicle).toEqual(`Registration number DL-12-AA-9999 not found`)
        done();
    })
})

describe('Park a vehicle with registration number: park KA-09-HH-0987', () => {
    test('should park vehicle to slot number 1', (done) => {
        const parkVehicle = parkingTest.park(["KA-09-HH-0987"])
        expect(parkVehicle).toEqual(`Allocated slot number: 1`)
        done();
    })
})

describe('Park a vehicle with registration number: park CA-09-IO-1111', () => {
    test('should park vehicle to slot number 1', (done) => {
        const parkVehicle = parkingTest.park(["CA-09-IO-1111"])
        expect(parkVehicle).toEqual(`Allocated slot number: 3`)
        done();
    })
})

describe('Park a vehicle with registration number: park KA-09-HH-0123', () => {
    test('should parking lot is full', (done) => {
        const parkVehicle = parkingTest.park(["KA-09-HH-0123"])
        expect(parkVehicle).toEqual(`Sorry, parking lot is full`)
        done();
    })
})

describe('Status of parking lot', () => {
    test('should show status of all vehicle in parking lot', (done) => {
        const status = parkingTest.status()
        expect(status).toEqual(`Slot No.\tRegistration No.\n1\tKA-09-HH-0987\n2\tKA-01-HH-9999\n3\tCA-09-IO-1111\n4\tKA-01-HH-7777\n5\tKA-01-HH-2701\n6\tKA-01-P-333`)
        done();
    })
})