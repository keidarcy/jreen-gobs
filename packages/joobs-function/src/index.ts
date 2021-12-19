import { DB } from '@joobs/joobs-data';

(async () => {
  await DB.insertMany(2, 3);
})();
