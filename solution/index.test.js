const fs = require("fs");
const { ParkingLot } = require("./index")
const file = "./parkingData.json"
const parkingTest = new ParkingLot(file);

// * RESET JSON DATA AFTER TEST
afterAll(function(done) {
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
        const createdParkingLot = parkingTest.create([6])
        expect(createdParkingLot).toEqual(`Created parking lot with 6 slots \nAllocated Slot number: 1\nAllocated Slot number: 2\nAllocated Slot number: 3\nAllocated Slot number: 4\nAllocated Slot number: 5\nAllocated Slot number: 6`)
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