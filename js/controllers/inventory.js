import {APIHelper} from '/js/controllers/api.js'

function init() {
    const helper = new APIHelper(
        '80db43f2e19893045c3292a4f2df70eef33b0d774a6072b2afd3647f89dc9c89',
        'https://api.simbachain.com/v1/UVI_September21/'
    );

    helper.getInventories().then(data => console.log(data));
}


$(function() {
    init();
});