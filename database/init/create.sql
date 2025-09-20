CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    clicks INT NOT NULL,
    first_click TIMESTAMP
);

INSERT INTO cards (clicks, first_click)
    VALUES
        (0, null),
        (0, null),
        (0, null),
        (0, null),
        (0, null),
        (0, null),
        (0, null),
        (0, null);