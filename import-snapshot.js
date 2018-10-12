'use strict';
require('dotenv').config()

const csv = require('fast-csv');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true });

const snapshotSchema = new mongoose.Schema({
    account_name:   { type: String, required: true},
    owner_key:      { type: String, required: true},
    active_key:     { type: String, required: true},
    total_nostake:  { type: Number, required: true},
    staked:         { type: Number, required: true},
    delegated:      { type: Number, required: true},
    total:          { type: Number, required: true},
    created_at:     Date,
    updated_at:     Date
  });

  const Account = mongoose.model('Snapshot', snapshotSchema);

  csv.fromPath(`${process.env.CSV_NAME}`)
  .on("data", (data) => {
    console.log(new Date().getTime());
    const account_name = data[1];
    const owner_key = data[2];
    const active_key = data[3];
    const total_nostake = parseFloat(data[4]) || 0;
    const staked = parseFloat(data[5]) || 0;
    const delegated = parseFloat(data[6]) || 0;
    const total = parseFloat(data[7]) || 0;
    const recordToInsert = new Account({account_name, owner_key, active_key, total_nostake, staked, delegated, total});
    recordToInsert.save((err) => {
        if (err) console.log(err);
    });
  })
  .on("end", () => console.log(`Done`));

