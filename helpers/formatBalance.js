const formatBalance = (balance) => balance.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'});

module.exports = formatBalance