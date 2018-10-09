/**
 * Create Security Code
 * @returns {User}
 */
function create(req, res) {
    console.log('fire')
    return res.send('OK')
}

/**
 * Lookup Security Code
 * @returns {User}
 */
function lookup(req, res) {
    console.log('fire2')
    return res.send('OK2')
    // return res.json(req.user);
  }

module.exports = { create, lookup };
