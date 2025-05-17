import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'offlineDB.db', location: 'default'},
  () => {
    console.log('Database Opened');
  },
  err => {
    console.log(err);
  },
);

const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, profile_img TEXT, phone TEXT, favourites INTEGER DEFAULT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)',
        [],
        (_, result) => {
          console.log('Table created', result);
          resolve(result);
        },
        err => {
          console.log('Error creating table', err);
          reject(err);
        },
      );
    });
  });
};

const insertContact = (
  first_name,
  last_name,
  profile_img = null,
  phone,
  favourites = null,
) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO contact (first_name, last_name, profile_img, phone, favourites) VALUES (?,?,?,?,?)',
        [first_name, last_name, profile_img, phone, favourites],
        (_, result) => {
          console.log('Contact inserted', result);
          resolve(result);
        },
        err => {
          console.log('Error inserting contact', err);
          reject(err);
        },
      );
    });
  });
};

const fetchContactFromDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contact',
        [],
        (_, result) => {
          resolve(result.rows.raw());
        },
        err => {
          reject(err);
        },
      );
    });
  });
};

const fetchContactById = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contact WHERE id=?',
        [id],
        (_, result) => {
          resolve(result.rows.raw());
          console.log('fetch id ', result);
        },
        err => {
          reject(err);
        },
      );
    });
  });
};

const updateContact = item => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE contact SET first_name=?,last_name=?,phone=?,profile_img=?,favourites=? where id=?',
        [
          item.first_name,
          item.last_name,
          item.phone,
          item.profile_img,
          item.favourites,
          item.id,
        ],
        (_, result) => {
          resolve(result);
          console.log('updated successfully', result);
        },
        err => {
          reject(err);
        },
      );
    });
  });
};

const deleteContactFromDB = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM contact WHERE id=?',
        [id],
        (_, result) => {
          resolve(result);
          console.log('contact deleted');
        },
        err => {
          reject(err);
        },
      );
    });
  });
};

export {
  db,
  createTable,
  insertContact,
  fetchContactFromDB,
  updateContact,
  fetchContactById,
  deleteContactFromDB,
};
