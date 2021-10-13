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
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
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



// var APIHelper = APIHelper || {}

// APIHelper.token = '80db43f2e19893045c3292a4f2df70eef33b0d774a6072b2afd3647f89dc9c89';
// APIHelper.baseUrl = 'https://api.simbachain.com/v1/UVI_September21/';
// APIHelper.suppliedId = 'b164ef2d9c7f43ca97f614482133a837';
// APIHelper.fromId = '0x97442C45aBee017fEB3Bc528a51a849e32213cCb';

// APIHelper.getInventories = async function() {
//     const url = `${APIHelper.baseUrl}AvailabilityList/`
//     const response = await getData(url);
//     if (response.count == 0 || !Array.isArray(response.results)) {
//         return [];
//     } else {
//         let inventories = [];
//         for (let i=0; i<response.results.length; i++) {
//             const inventory = {
//                 date: new Date(response.results[i].timestamp),
//                 product: await APIHelper.findProductById(response.results[i].payload.inputs.ProductID),
//                 units: '',
//                 price: response.results[i].payload.inputs.PreferedPrice,
//                 trackingNumber: '',
//                 sellerOrderNumber: '',
//             }
//             inventories.push(inventory);
//         }
//         return inventories;
//     }
// }

// APIHelper.findProductById = async function(productId) {
//     const url = `${APIHelper.baseUrl}Product/?ID_number_equals=${productId}`
//     const response = await getData(url);
//     if (response.count == 0 || !Array.isArray(response.results)) {
//         return [];
//     } else {
//         return {
//             name: response.results[0].payload.inputs.Name,
//             description: response.results[0].payload.inputs.Description,
//             type: response.results[0].payload.inputs.Type,
//             id: response.results[0].payload.inputs.ID_number,
//         }
//     }
// }

// async function getData(url = '') {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'GET',
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'omit', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json',
//             'APIKEY': APIHelper.token,
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     });
//     return response.json();
// }

// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }