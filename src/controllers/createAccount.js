const Eos = require('eosjs');
const httpEndpoint = process.env.HTTP_ENDPOINT
const chainId = process.env.CHAIN_ID
const keyProvider = process.env.KEY_PROVIDER
const eos = Eos({httpEndpoint, chainId, keyProvider});

/**
 * Create a Worbli account
 * @returns {worbliAccountName}
 */
function create(req, res) {

    const worbli_account_name = req.body.worbli_account_name.toLowerCase();
    const owner_publicKey = req.body.owner_publicKey;
    const active_publicKey = req.body.active_publicKey;

    eos.transaction(tr => {
        tr.newaccount({
          creator: 'eosio',
          name: worbli_account_name,
          owner: owner_publicKey,
          active: active_publicKey
        })
        tr.buyrambytes({
          payer: 'eosio',
          receiver: worbli_account_name,
          bytes: 4096
        })
        tr.delegatebw({
          from: 'eosio',
          receiver: worbli_account_name,
          stake_net_quantity: '10.0000 WBI',
          stake_cpu_quantity: '10.0000 WBI',
          transfer: 0
        })
      })
      .then((response) => {
        res.json({
          "transaction_id": response.transaction_id,
          "worbli_account_name": worbli_account_name,
          "owner_publicKey": owner_publicKey,
          "active_publicKey": active_publicKey,
        });
      })
      .catch((err) => {
        res.json(err);
      })
}

module.exports = { create };
