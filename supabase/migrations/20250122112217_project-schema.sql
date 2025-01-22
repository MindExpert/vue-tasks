drop table if exists projects;

drop type if exists current_status;
create type current_status as enum ('in-progress', 'completed', 'archived');

CREATE TABLE projects (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    status current_status DEFAULT 'in-progress' NOT NULL,
    description TEXT,
    collaborators TEXT ARRAY DEFAULT ARRAY[]::VARCHAR[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);