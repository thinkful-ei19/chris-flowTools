SELECT CURRENT_DATE;

-- Drop all tables
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_notes;

--users

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text NOT NULL,
    password text NOT NULL,
    settings json,
    widgets json
);

--notes

CREATE TABLE notes (
    id serial PRIMARY KEY,
    content text,
    dueDate date NOT NULL,
    user_id int REFERENCES users ON DELETE SET NULL,
    checked boolean
);


ALTER SEQUENCE users_id_seq RESTART WITH 1000;

INSERT INTO users (username, password, settings, widgets) VALUES
    (
        'test',
        '$2a$10$kDy5CksLgypjXjiIoqTFDO7OHNz8R9UKzFeKuHwuGogI5eE83oAWO',
        '{"scheme": "dark"}',
        '{"pomodoro": "on",
        "MixCloud": "off"}'
    ),
    (
        'test2',
        '$2a$10$XH89sryuEOlTysG9Pk8zhepWXeW082WzkUR5uPHoBCbsDCrnFtxpG',
        '{"scheme": "light"}',
        '{"pomodoro": "off",
        "MixCloud": "on"}'
    );

INSERT INTO notes (content, dueDate, user_id, checked) VALUES
    (
        'Spend time learning Javascript',
        '2018-04-15',
        1000,
        'false'
    ),
    (
        'Walk the dogs',
        '2018-04-15',
        1000,
        'true'
    ),
    (
        'Spend time learning JQuery',
        '2018-04-16',
        1000,
        'false'
    ),
    (
        'Spend time reviewing Javascript and JQuery',
        '2018-04-17',
        1000,
        'false'
    );

--users_notes


-- CREATE TABLE users_notes (
--     users_id int NOT NULL REFERENCES users ON DELETE CASCADE,
--     notes_id int NOT NULL REFERENCES notes ON DELETE CASCADE
-- );

-- INSERT INTO users_notes (users_id, notes_id) VALUES 
--     (1000, 1),
--     (1000, 2),
--     (1000, 3),
--     (1000, 4);