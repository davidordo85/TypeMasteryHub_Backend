'use strict';

require('dotenv').config();
require('../models');

const fileJson = require('./type_mastery_hub_course.json');
const { mongoose, User, TypeMasterHubCourse } = require('../models');

main().catch(err => {
  console.log(err);
  process.exit(1);
});

async function main() {
  await initUser();
  await initCourse();
  mongoose.connection.close();
}

async function initUser() {
  const { deletedCount } = await User.deleteMany();
  console.log(`Deleted ${deletedCount} user`);
}

async function initCourse() {
  try {
    const deleted = await TypeMasterHubCourse.deleteMany();
    console.log(`Deleted existing courses: ${deleted.deletedCount} documents`);

    const chargedCourse = await TypeMasterHubCourse.insertMany(fileJson);
    console.log(
      `Loaded Courses from Courses.json: ${chargedCourse.length} documents`,
    );
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}
