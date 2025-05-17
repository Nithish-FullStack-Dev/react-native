import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'offlineDB.db',
    location: 'default',
  },
  () => console.log('Database opened'),
  error => console.log('Error opening database', error),
);

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS todo(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)',
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table', error);
      },
    );
  });
};

const insertTask = task => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO todo (task) VALUES (?)',
        [task],
        (_, result) => {
          resolve(result);
          console.log('Successfully added', _);
        },
        error => {
          reject(error);
          console.log('Error inserting task:', error);
        },
      );
    });
  });
};

const fetchTask = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM todo',
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            const raws = result.rows.raw();
            resolve(raws);
            console.log('fetched task', result);
          } else {
            resolve([]);
          }
        },
        err => {
          reject(err);
          console.log('error while fetching', err);
        },
      );
    });
  });
};

const deleteTask = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM todo WHERE id=?',
        [id],
        (_, result) => {
          resolve(result);
          console.log('data deleted successfully', result);
        },
        err => {
          reject(err);
        },
      );
    });
  });
};

const updateTask = (id, task) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE todo SET task=? WHERE id=?',
        [task, id],
        (_, result) => {
          resolve(result);
          console.log('data Updated', result);
        },
        err => {
          reject(err);
        },
      );
    });
  });
};

export {db, createTable, insertTask, fetchTask, deleteTask, updateTask};
