 class APIHelper {
    constructor(token, baseUrl) {
        this.token = token;
        this.baseUrl = baseUrl;
    }

    async getInventories() {
        const url = `${this.baseUrl}AvailabilityList/`
        const response = await this.getData(url);
        if (response.count == 0 || !Array.isArray(response.results)) {
            return [];
        } else {
            let inventories = [];
            for (let i=0; i<response.results.length; i++) {
                const inventory = {
                    date: new Date(response.results[i].timestamp),
                    product: await this.findProductById(response.results[i].payload.inputs.ProductID),
                    units: '',
                    price: response.results[i].payload.inputs.PreferedPrice,
                    trackingNumber: '',
                    sellerOrderNumber: '',
                }
                inventories.push(inventory);
            }
            return inventories;
        }
    };

    async findProductById(productId) {
        const url = `${this.baseUrl}Product/?ID_number_equals=${productId}`
        const response = await this.getData(url);
        if (response.count == 0 || !Array.isArray(response.results)) {
            return [];
        } else {
            return {
                name: response.results[0].payload.inputs.Name,
                description: response.results[0].payload.inputs.Description,
                type: response.results[0].payload.inputs.Type,
                id: response.results[0].payload.inputs.ID_number,
            }
        }
    }

    async createInventory(from, supplierId, name, description='', type='', quantity=0, expectedQuantity=0, cropDate=1, price=10, quality="Best", liveDays=0) {
        // create a product first
        const product = Date.now();
        const id = Math.floor(Math.random() * 120);
        let createProductResponse = await this.postData(
            `${this.baseUrl}Product/`,
            {
                "from": from,
                "Name": name,
                "Type": type,
                "Description": description,
                "ID_number": id,
                "__Product": product
            }
        );
        console.log(createProductResponse);

        // now create a record in availability list
        let createAvailabilityResponse = await this.postData(
            `${this.baseUrl}AvailabilityList/`,
            {
                "from": from,
                "Quality": quality,
                "CropDate": cropDate,
                "ProductID": id,
                "SupplierID": supplierId,
                "MinOrderPrice": price,
                "PreferedPrice": price,
                "__AvailabilityList": 2,
            }
        );
        console.log(createAvailabilityResponse);

        return {
            date: new Date(createAvailabilityResponse.timestamp),
            product: {
                name: createProductResponse.payload.inputs.Name,
                description: createProductResponse.payload.inputs.Description,
                type: createProductResponse.payload.inputs.Type,
                id: createProductResponse.payload.inputs.ID_number,
            },
            units: '',
            price: createAvailabilityResponse.payload.inputs.PreferedPrice,
            trackingNumber: '',
            sellerOrderNumber: '',
        };
    }

    async getData(url = '') {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': this.token,
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json();
    }

    async postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': this.token,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
};

export {APIHelper};