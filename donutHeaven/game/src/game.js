class Game {
    material = 10000;
    currentObject = 0;
    soldObject = 0;
    makeObject = 0;
    money = 0;
    price = 10;
    unitCost = 100;
    unitMaterialCost = 100;
    materialCost = 500;
    manufacturedObject = 0;
    demandRate = 0;

    //manufacture rate 
    lastManufacturedCount = 0;
    lastManufacturedRate = 0;
    lastManufacturedRateTs = Date.now();

    //price of material 
    materialCost = 500;
    materialCostLastUpdate = Date.now();

    //generators
    autoGenerators = {
        errandBoy: 0,
        errandBoyCost: 100,
        errandBoyManufactureRate: 0.1,
        foreman: 0,
        foremanCost: 500,
        foremanManufactureRate: 0.6,
        master: 0,
        masterCost: 2000,
        masterManufactureRate: 1.5
    };
    autoGeneratorsLastGeneratedAt = Date.now();

    //auto buyer
    autoBuyerCost = 15000;
    hasAutoBuyer = false;
    isAutoBuyerActive = false;

    makeObject = (count = 1) => {
        if (this.canMakeObject(count)) {
            this.currentObject += count;
            this.manufacturedObject += count;
            this.material -= this.unitMaterialCost * count;
        }
    };

    canBuyAutoBuyer = () => {
        return this.didUnlockAutoBuyer() && this.money >= this.autoBuyerCost;
    };

    didUnlockAutoBuyer = () => {
        return this.manufacturedObject > 2000;
    };


    buyAutoBuyer = () => {
        if (!this.canBuyAutoBuyer()) {
            return;
        }
        this.money -= this.autoBuyerCost;
        this.hasAutoBuyer = true;
        this.isAutoBuyerActive = true;
    };

    update = () => {
        //generate new goods
        if (Date.now() - this.autoGeneratorsLastGeneratedAt > 100) {
            this.makeObject(
                this.autoGenerators.errandBoy *
                this.autoGenerators.errandBoyManufactureRate
            );
            this.makeObject(
                this.autoGenerators.foreman *
                this.autoGenerators.foremanManufactureRate
            );
            this.makeObject(
                this.autoGenerators.master *
                this.autoGenerators.masterManufactureRate
            );
            this.autoGeneratorsLastGeneratedAt = Date.now();
        }

        //auto buyer 
        if (this.isAutoBuyerActive && this.material < 500 && this.canBuyMaterial()) {
            this.buyMaterial();
        }

        //update material cost
        if (Date.now() - this.materialCostLastUpdate > 10000) {
            this.materialCost = Math.floor(Math.random() * 300 + 300);
            this.materialCostLastUpdate = Date.now();
        }

        //update manufacture rate  
        if (Date.now() - this.lastManufacturedRateTs > 5000) {
            this.lastManufacturedRateTs = Date.now();
            this.lastManufacturedRate =
                Math.floor((this.manufacturedObject - this.lastManufacturedCount) / 5);
            this.lastManufacturedCount = this.manufacturedObject;
        }
        //update demand
        this.updateDemand();

        //consumers purchase goods
        if (this.currentObject > 1 && Math.random() * 100 < (this.demandRate / 2)) {
            this.purcharseObject();
        }

    };

    updateDemand = () => {
        let rate;
        if (this.price <= 40) {
            rate = (2 / Math.sqrt(this.price)) * 100;
        }
        else {
            const maxRate = (2 / Math.sqrt(40)) * 100;
            rate = (maxRate * (60 - this.price)) / 20;
        }
        this.demandRate = Math.floor(Math.max(0, rate));
        console.log(rate);
        this.demandRate = Math.floor(Math.max(0, rate));
    }

    purcharseObject = () => {
        this.currentObject -= 1;
        this.money += this.price;
    }

    startAutoBuyer = () => {
        this.isAutoBuyerActive = true;
    }

    stopAutoBuyer = () => {
        this.isAutoBuyerActive = false;
    }

    canBuyAutoGenerator = type => {
        switch (type) {
            case "ERRAND_BOY":
                return this.money >= this.autoGenerators.errandBoyCost;
            case "FOREMAN":
                return this.money >= this.autoGenerators.foremanCost;
            case "MASTER":
                return this.money >= this.autoGenerators.masterCost;
            default:
                return false;
        }

    }

    canMakeObject = (count = 1) => {
        return this.material >= this.unitMaterialCost * count;
    };

    canBuyMaterial = () => {
        return this.money >= this.materialCost;
    };

    canDecreasePrice = () => {
        return this.price > 1;
    };

    buyMaterial = () => {
        if (!this.canBuyMaterial()) {
            return;
        }
        this.materialCost += Math.floor(Math.random() * 20 + 10);
        this.materialCostLastUpdate = Date.now();
        this.material += 10000;
        this.money -= this.materialCost;

    };

    buyAutoGenerator = type => {
        if (!this.canBuyAutoGenerator(type)) {
            return;
        }
        switch (type) {
            case "ERRAND_BOY":
                this.autoGenerators.errandBoy++;
                this.money -= this.autoGenerators.errandBoyCost;
                this.autoGenerators.errandBoyCost += Math.floor(this.autoGenerators.errandBoyCost / 100) * 10;
                return;
            case "FOREMAN":
                this.autoGenerators.foreman++;
                this.money -= this.autoGenerators.foremanCost;
                this.autoGenerators.foremanCost += Math.floor(this.autoGenerators.foremanCost / 100) * 10;
                return;
            case "MASTER":
                this.autoGenerators.master++;
                this.money -= this.autoGenerators.masterCost;
                this.autoGenerators.masterCost += Math.floor(this.autoGenerators.masterCost / 100) * 10;
                return;
            default:
                return false;
        }

    }

    increasePrice = () => {
        this.price += 1;
    }

    decreasePrice = () => {
        if (this.price === 1) {
            return;
        }
        this.price -= 1

    }
}

export default Game;