const Flight = require('../models/flight');
module.exports = {
    new: newFlight,
    create,
    index,
    sortFlights
};

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate, errorMsg: '' });
}
async function index(req, res) {
    const flightsAll = await Flight.find({})
    res.render('flights/index', {
        flights: flightsAll
    })
}

async function sortFlights(req, res) {
    const flightsAll = await Flight.find({}).sort({ departs: 1 })
    res.render('flights/sort', {
        flights: flightsAll
    })
}
async function create(req, res) {
    try {
        await Flight.create(req.body);
        res.redirect('/flights');
    } catch (err) {
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
    }
}