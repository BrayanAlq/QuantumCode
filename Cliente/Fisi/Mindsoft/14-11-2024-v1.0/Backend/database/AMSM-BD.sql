CREATE DATABASE MindSoft;
USE MindSoft;
-- Tabla de usuarios
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(80) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    average FLOAT,
    faculty VARCHAR(100),
    address VARCHAR(100)
);
-- Tabla de calificación diaria
CREATE TABLE daily_rating (
    daily_rating_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 0 AND 5),
    date DATE NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Tabla de objetivos
CREATE TABLE goal (
    goal_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    goal_name TEXT NOT NULL,
    duration_days INTEGER,
    start_date DATE,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Tabla de estado de ánimo (mood)
CREATE TABLE mood (
    mood_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    mood VARCHAR(20) NOT NULL
);
-- Tabla de calificación de estado de ánimo (mood_rating)
CREATE TABLE mood_rating (
    mood_rating_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Detalle de calificación de estado de ánimo (mood_rating_detail)
CREATE TABLE mood_rating_detail (
    mood_rating_detail_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    mood_rating_id INTEGER,
    mood_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (mood_rating_id) REFERENCES mood_rating(mood_rating_id),
    FOREIGN KEY (mood_id) REFERENCES mood(mood_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Tabla de diarios personales (journal)
CREATE TABLE journal (
    journal_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    date DATE NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Tabla de diarios de gratitud (gratitude_journal)
CREATE TABLE gratitude_journal (
    gratitude_journal_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    date DATE NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);