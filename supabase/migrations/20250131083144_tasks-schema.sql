drop table if exists tasks;

CREATE TABLE tasks (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    name TEXT NOT NULL,
    status current_status DEFAULT 'in-progress' NOT NULL,
    description TEXT NOT NULL,
    due_date DATE DEFAULT NULL,
    profile_id uuid REFERENCES profiles(id) on delete cascade NOT NULL,
    project_id BIGINT REFERENCES projects(id) DEFAULT NULL,
    collaborators TEXT ARRAY DEFAULT ARRAY[]::VARCHAR[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);