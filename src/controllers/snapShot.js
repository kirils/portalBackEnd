const snapShotModel = require('../models/snapShot.js')

/**
 * Lookup a Snap Shot by username return 
 * @returns {User}
 */
function lookup(req, res) {
    const snap_shot = req.params.snapShot;
    snapShotModel.find({account_name: snap_shot}, (err, data) => { 
        if(data[0] && data[0].account_name) {
            return res.send(data.total * 0.5);
        } else  {
            return res.send(false);
        }
    });   
}

module.exports = { lookup };
