const fs = require("fs");

class ParkingLot {

    constructor(dataFile){
        this.dataFile = dataFile;
    }

    readData(){
        const parkingData = fs.readFileSync(this.dataFile, "utf-8");
        return JSON.parse(parkingData);
    }

    writeData(data){
        const jsonData = JSON.stringify(data, null, 2)
        fs.writeFileSync(this.dataFile, jsonData, "utf-8");
    }

    create(capacity){
        if(!capacity || isNaN(capacity)){
            return `Invalid input for capacity`;
        }
        const parkingData = this.readData();
        parkingData.status = true;
        parkingData.parkingSlot = [];
        parkingData.availableSlot = [];
        parkingData.capacity = capacity;
        for(let i = 1; i <= capacity; i++){
            parkingData.availableSlot.push(i);
        }
        let slotMessage = parkingData.availableSlot.reduce((prev, item) => {
            return `${prev}\nAllocated Slot number: ${item}`;
        }, "")
        this.writeData(parkingData)
        return `Created parking lot with ${parkingData.availableSlot.length} slots ${slotMessage}`;
    }

    park(regNumber){
        const parkingData = this.readData();
        if(parkingData.status === false){
            return `Please setup/create parking lot first`;
        }
        if(!regNumber){
            return `Invalid argument, please fill registration number`;
        }
        if (parkingData.parkingSlot.length == parkingData.capacity) {
            return `Parking Lot is Full, you can't park new vehicle`;
        }
        let getSlot = parkingData.availableSlot.shift();
        parkingData.parkingSlot.splice(getSlot-1, 0, {
            slot: getSlot,
            registrationNumber: regNumber
        })
        this.writeData(parkingData)
        return `Allocated slot number: ${getSlot}`
    }

    unpark(regNumber, hours){
        const parkingData = this.readData();
        if(parkingData.status === false){
            return `Please setup/create parking lot first`;
        }
        if(!regNumber){
            return `Invalid argument, please fill registration number`;
        }
        const [parkedPosition, parkedVehicle] = this.find(parkingData, regNumber)
        if(parkedPosition != -1){
            parkingData.parkingSlot.splice(parkedPosition, 1)
            parkingData.availableSlot = this.putThenSort(parkedVehicle.slot, parkingData.availableSlot)
            let charge = this.chargeAmount(hours);
            this.writeData(parkingData)
            console.log(`Registration number ${parkedVehicle.registrationNumber} with Slot Number ${parkedVehicle.slot} is free with Charge ${charge}`)
        }
        else{
            return `Vehicle with that registration number is not found`;
        }
    }

    chargeAmount(hours){
        if(hours <= 2){
            return 10
        }
        else {
            return ((hours - 2) * 10) + 10;
        }
    }

    find(parkingData, regNumber){
        const findPositionParked = parkingData.parkingSlot.findIndex(item => item.registrationNumber === regNumber)
        const findParked = parkingData.parkingSlot.find(item => item.registrationNumber === regNumber)
        return [findPositionParked, findParked]
    }

    putThenSort(item, list){
        list.push(item);
        list.sort(function(a, b) {
            return a - b;
        });
        return list
    }

    status(){
        const parkingData = this.readData();
        if(parkingData.status === false){
            return `Please setup/create parking lot first`;
        }
        let status = `Slot No.\tRegistration No.`;
        parkingData.parkingSlot.map(item => {
            status += `\n${item.slot}\t${item.registrationNumber}`;
        });
        console.log(status)
        return status;
    }
}

class App {

    static run(){
        const inputProgram = process.argv;
        const commandInput = inputProgram[0];
        const argsInput = inputProgram.slice(1);

        console.log(`
        ===================================
        DKATALIS PARKING LOT APPS by SOFYAN
        ===================================
        `)

        if(!commandInput){
            console.log("Please input the correct command")
        }
        else{

        }
    }
}

App.run();

const parkingLot = new ParkingLot("./parkingData.json");
parkingLot.create(6)
parkingLot.park("hhasdasdljasd")
// parkingLot.unpark("hhasdasdljasd", 10)
parkingLot.status();