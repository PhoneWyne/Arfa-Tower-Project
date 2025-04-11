import mysql from 'mysql2';

// replace this later with .env file stuff
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sohail_12',        
  database: 'jersey_store',
});

db.connect(err => {
  if (err) {
    console.error('DB error:', err);
  } else {
    console.log('MySQL connected!');
  }
});

export default db;
