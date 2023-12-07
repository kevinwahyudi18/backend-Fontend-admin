const axios = require('axios');

const provinceList = async (apiKey) => {
    try {
        const response = await axios.get('https://api.rajaongkir.com/starter/province', {
            headers: {
                key: apiKey,
            },
        });
        return response.data.rajaongkir.results;
    } catch (error) {
        console.error('Error getting province list:', error.response.data);
        throw new Error('Failed to get province list from RajaOngkir');
    }
};

const CityList = async (apiKey) => {
    try {
        const response = await axios.get('https://api.rajaongkir.com/starter/city', {
            headers: {
                key: apiKey,
            },
        });
        return response.data.rajaongkir.results;
    } catch (error) {
        console.error('Error getting city list:', error.response.data);
        throw new Error('Failed to get city list from RajaOngkir');
    }
};

const shippingCost = async (apiKey, payload) => {
    try {
        const response = await axios.post('https://api.rajaongkir.com/starter/cost', payload, {
            headers: {
                key: apiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.rajaongkir.results;
    } catch (error) {
        console.error('Error getting shipping cost:', error.response.data);
        throw new Error('Failed to get shipping cost from RajaOngkir');
    }
};

module.exports = { provinceList, CityList, shippingCost };