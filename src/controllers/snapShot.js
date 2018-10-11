const snapShotModel = require('../models/snapShot.js')

/**
 * Lookup a Snap Shot by username return 
 * @returns {User}
 */
function lookup(req, res) {
    const snap_shot = req.params.snapShot;
    snapShotModel.find({snap_shot}, (err, data) => { 
        if(data[0] && data[0].snap_shot) {
            return res.send(true);
        } else  {
            return res.send(false);
        }
    });   
}

module.exports = { create, lookup };
