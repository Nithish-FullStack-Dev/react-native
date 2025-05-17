import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'offlineDB.db', location: 'default'},
  () => console.log('Database opened'),
  error => console.log('Error opening database', error),
);

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        age INTEGER
      );`,
      [],
      () => console.log('Table created successfully'),
      error => console.log('Error creating table', error),
    );
  });
};

const insertUser = (name, email, password, age) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO user (name, email, password, age) VALUES (?, ?, ?, ?)',
      [name, email, password, age],
      (tx, results) => {
        console.log('User inserted successfully:', results);
      },
      error => {
        console.log('Error inserting user:', error);
      },
    );
  });
};

const fetchData = email => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM user WHERE email = ?`,
        [email],
        (tx, results) => {
          if (results.rows.length > 0) {
            console.log(tx);
            resolve(results.rows.item(0));
          } else {
            resolve(null);
          }
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export {db, createTable, insertUser, fetchData};
