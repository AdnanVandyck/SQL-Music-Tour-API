// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event } = db
const { Op } = require('sequelize')


// FIND ALL BANDS
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
          where: { name: req.params.name },
          include: [
            { 
                model: MeetGreet, 
                as: "meet_greets",
                include: { 
                    model: Event, 
                    as: "event",
                    where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                }
        },
        {
            model: SetTime,
            as: "set_times",
            include: { model: Event, as: "event"}  
        }
    ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})


// EXPORT
module.exports = bands
