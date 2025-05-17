import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'offlineDB.db',
    location: 'default',
  },
  () => {
    console.log('database opened');
  },
  err => {
    console.log('error ', err);
  },
);

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS auth (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        college TEXT,
        email TEXT,
        endYear TEXT,
        scoreValue TEXT,
        skills TEXT,
        gender TEXT,
        photo TEXT
      )`,
      [],
      (_, res) => {
        console.log('Table created successfully:', res);
      },
      (_, err) => {
        console.log('Error creating table:', err);
      },
    );
  });
};

const insertValues = (
  name,
  age,
  college,
  email,
  endYear,
  scoreValue,
  skills,
  gender,
  photo,
) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO auth (name, age, college, email, endYear, scoreValue, skills, gender, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          name,
          age,
          college,
          email,
          endYear,
          scoreValue,
          JSON.stringify(skills),
          gender,
          photo,
        ],
        (_, res) => {
          console.log('Data inserted', res);
          resolve(res);
        },
        (_, err) => {
          console.log('Insert error', err);
          reject(err);
        },
      );
    });
  });
};

const fetchAuth = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM auth',
        [],
        (_, res) => {
          resolve(res.rows.raw());
          console.log('data fetched', res);
        },
        (_, err) => {
          reject(err);
          console.log('not fetched', err);
        },
      );
    });
  });
};

const fetchAuthByEmail = email => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM auth WHERE email=?',
        [email],
        (_, res) => {
          resolve(res.rows.raw());
          console.log('data fetched', res);
        },
        (_, err) => {
          reject(err);
          console.log('not fetched', err);
        },
      );
    });
  });
};

const dropTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS auth',
      [],
      (_, res) => {
        console.log('Table dropped successfully');
      },
      (_, err) => {
        console.log('Error dropping table', err);
      },
    );
  });
};

export {createTable, insertValues, fetchAuth, dropTable, fetchAuthByEmail};
