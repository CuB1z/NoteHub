DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;

CREATE TABLE users (username TEXT PRIMARY KEY);

CREATE TABLE favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  repo_url TEXT NOT NULL,
  UNIQUE(username, repo_url)
);