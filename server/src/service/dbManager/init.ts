import db from '../../models';
import problems from '../../config/problems';
const group = require('../../config/initgroup.json');

const sync = async () => {
  const force: boolean = false;
  await db
    .sync({ force: force, logging: false })
    .then(async () => {
      if (force) {
        await createInitGroup();
        await createInitProblem();
      }
      console.log('Connection has been established successfully.');
    })
    .catch((error: any) => {
      console.error('Unable to connect to the database:', error);
    });
};

const createInitGroup = async () => {
  try {
    await db.models.Group.bulkCreate(group, {
      logging: false,
      returning: true
    });
  } catch (e) {
    console.error(e);
  }
};

const createInitProblem = async () => {
  try {
    await db.models.Problem.bulkCreate(problems, {
      logging: false,
      returning: true
    });
  } catch (e) {
    console.error(e);
  }
};

export { sync, createInitGroup, createInitProblem };
