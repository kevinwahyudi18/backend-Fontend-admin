const rajaOngkirService = require('../services/rajaOngkir.service');

const getProvinceList = async (req, res) => {
    try {
        const apiKey = "5ec0f25991ff8bd0711bbda776239a13";
        const provinces = await rajaOngkirService.provinceList(apiKey);
        res.status(200).json(provinces);
    } catch (error) {
        console.error('Error getting province list:', error.message);
        res.status(500).json({ error: 'Failed to get province list from RajaOngkir' });
    }
};

const getCityList = async (req, res) => {
    try {
        const apiKey = '5ec0f25991ff8bd0711bbda776239a13';
        const cities = await rajaOngkirService.CityList(apiKey);
        res.status(200).json(cities);
    } catch (error) {
        console.error('Error getting city list:', error.message);
        res.status(500).json({ error: 'Failed to get city list from RajaOngkir' });
    }
};

const getShippingCost = async (req, res) => {
    try {
        const apiKey = '5ec0f25991ff8bd0711bbda776239a13';
        const payload = {
            origin: req.body.origin,
            destination: req.body.destination,
            weight: req.body.weight,
            courier: req.body.courier,
        };
        const shippingCost = await rajaOngkirService.getShippingCost(apiKey, payload);
        res.status(200).json(shippingCost);
    } catch (error) {
        console.error('Error getting shipping cost:', error.message);
        res.status(500).json({ error: 'Failed to get shipping cost from RajaOngkir' });
    }
};


module.exports = {
    getProvinceList,
    getCityList,
    getShippingCost,
};
