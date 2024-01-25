'use strict';

require('dotenv').config();
require('../models');

const { mongoose, User } = require('../models');

main().catch(err => {
  console.log(err);
  process.exit(1);
});

async function main() {
  await initUser();
  process.exit(0);
}

async function initUser() {
  const { deletedCount } = await User.deleteMany();
  console.log(`Deleted ${deletedCount} user`);
}
