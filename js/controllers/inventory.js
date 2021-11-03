import {APIHelper} from './api.js'

const fromId = '0x97442C45aBee017fEB3Bc528a51a849e32213cCb';
const supplierId = 1;

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

function init() {
    const helper = new APIHelper(
        'e29ec2f1bef4fbad0da6e1f08cf3be2f926ec552dc8e7ab8662e38ace0b3674e',
        'https://api.simbachain.com/v1/UVIDEMO/'
    );

    let tableData = $('.table-data');
    tableData.empty();

    helper.getInventories().then(data => {
        $('.data-loader').addClass('d-none');

        data.forEach(inventory => {
            tableData.append($(`<tr>
                <td>${formatDate(inventory.date)}</td>
                <td>${inventory.product.name}</td>
                <td>${inventory.units}</td>
                <td>${inventory.price}</td>
                <td>${inventory.trackingNumber}</td>
                <td>${inventory.sellerOrderNumber}</td>
            </tr>`));
        });

        $('.content-table').removeClass('d-none');
    });

    $('.add-inventory-form').on('submit', e => {
        e.preventDefault();
        console.log('yes');
        $('#staticAddInventory').modal('hide');

        helper.createInventory(
            fromId,
            supplierId,
            $('#inputProduct').val(),
            '', 
            'Liquid', 
            $('#inputAvailableQuantity').val(), 
            $('#inputExpectedQuantity').val(), 
            1, 
            $('#inputPrice').val()
        ).then(inventory => {
            tableData.prepend($(`<tr>
                <td>${formatDate(inventory.date)}</td>
                <td>${inventory.product.name}</td>
                <td>${inventory.units}</td>
                <td>${inventory.price}</td>
                <td>${inventory.trackingNumber}</td>
                <td>${inventory.sellerOrderNumber}</td>
            </tr>`));
            $('#staticSuccess').modal('show');
        });
    });
}


$(function() {
    init();
});