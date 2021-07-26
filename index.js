var readline = require('readline');
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

    create_parking_lot(data){
        const [capacity] = data
        if(!capacity || isNaN(capacity)){
            console.log(`Invalid input for capacity`)
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
        this.writeData(parkingData)
        console.log(`Created parking lot with ${parkingData.availableSlot.length} slots`)
        return `Created parking lot with ${parkingData.availableSlot.length} slots`;
    }

    park(data){
        const [regNumber] = data;
        const parkingData = this.readData();
        if(parkingData.status === false){
            console.log(`Please setup/create parking lot first`)
            return `Please setup/create parking lot first`;
        }
        if(!regNumber){
            console.log(`Invalid argument, please fill registration number`)
            return `Invalid argument, please fill registration number`;
        }
        if (parkingData.parkingSlot.length == parkingData.capacity) {
            console.log(`Sorry, parking lot is full`)
            return `Sorry, parking lot is full`;
        }
        let getSlot = parkingData.availableSlot.shift();
        parkingData.parkingSlot.splice(getSlot-1, 0, {
            slot: getSlot,
            registrationNumber: regNumber
        })
        this.writeData(parkingData)
        console.log(`Allocated slot number: ${getSlot}`)
        return `Allocated slot number: ${getSlot}`
    }

    leave(data){
        const [regNumber, hours] = data
        const parkingData = this.readData();
        if(parkingData.status === false){
            console.log(`Please setup/create parking lot first`)
            return `Please setup/create parking lot first`;
        }
        if(!regNumber){
            console.log(`Invalid argument, please fill registration number`)
            return `Invalid argument, please fill registration number`;
        }
        const [parkedPosition, parkedVehicle] = this.find(parkingData, regNumber)
        if(parkedPosition != -1){
            parkingData.parkingSlot.splice(parkedPosition, 1)
            parkingData.availableSlot = this.putThenSort(parkedVehicle.slot, parkingData.availableSlot)
            let charge = this.chargeAmount(hours);
            this.writeData(parkingData)
            console.log(`Registration number ${parkedVehicle.registrationNumber} with Slot Number ${parkedVehicle.slot} is free with Charge ${charge}`)
            return `Registration number ${parkedVehicle.registrationNumber} with Slot Number ${parkedVehicle.slot} is free with Charge ${charge}`

        }
        else{
            console.log(`Registration number ${regNumber} not found`)
            return `Registration number ${regNumber} not found`;
        }
    }

    chargeAmount(hours){
        if(hours <= 2){
            return 10
        }
        return ((hours - 2) * 10) + 10;
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
            console.log(`Please setup/create parking lot first`)
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
        const commandLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        console.log(`
        ===================================
        PARKING APPS by SOFYAN
        ===================================
        `)
        console.log(`Please insert a command:`)
        commandLine.on("line", async (input) => {
            const inputArr = input.split(" ");
            const commandInput = inputArr[0];
            const argsInput = inputArr.slice(1);
            if(!commandInput){
                console.log("Please input the correct command")
                return "Please input the correct command"
            }
            else{
                const parkingLot = new ParkingLot("./parkingData.json");
                if(argsInput.length == 0){
                    parkingLot[commandInput]()
                }
                else{
                    parkingLot[commandInput](argsInput)
                }
            }
        })
    }
}

App.run();

module.exports = { App, ParkingLot }
