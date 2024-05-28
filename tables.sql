CREATE TABLE [Users]
(
    [id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [first_name] VARCHAR(255) NULL,
    [last_name] VARCHAR(255) NULL,
    [email] VARCHAR(255) NULL,
    [created_at] DATETIME NULL CONSTRAINT [users_created_at_default] DEFAULT SYSUTCDATETIME(),
    [intelligence] INT NULL CONSTRAINT [users_intelligence_default] DEFAULT 0,
    -- fitness
    [fitness] INT NULL CONSTRAINT [users_fitness_default] DEFAULT 0,
    -- health
    [wellness] INT NULL CONSTRAINT [users_health_default] DEFAULT 0,
    -- skill
    [skill] INT NULL CONSTRAINT [users_skill_default] DEFAULT 0,
    [checkpoint] INT NULL CONSTRAINT [users_checkpoint_default] DEFAULT 0,
    [uid] VARCHAR(255) NOT NULL UNIQUE,
);

CREATE TABLE [Tasks]
(
    [id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [from_app] BIT NULL,
    -- bool
    [from_buddy] INT NULL,
    [type] VARCHAR(255) NULL CONSTRAINT [tasks_from_user_default] DEFAULT 'daily',
    [creation_date] DATETIME NULL CONSTRAINT [tasks_created_at_default] DEFAULT SYSUTCDATETIME(),
    [due_date] DATETIME NULL,
    [done] BIT NULL CONSTRAINT [tasks_done_default] DEFAULT 0,
    -- bool 
    [description] VARCHAR(255) NULL,
    [title] VARCHAR(255) NULL,
    [user_id] INT NULL,
    [days_per_week] VARCHAR(255) NULL,
    [week_interval] INT NULL,
    [category] VARCHAR(255) NULL,
    CONSTRAINT fk_user FOREIGN KEY ([user_id]) REFERENCES [Users]([id])
);

CREATE TABLE [Buddies]
(
    [user1_id] INT NOT NULL,
    [user2_id] INT NOT NULL,
    [buddies_since] DATE NULL,
    CONSTRAINT [Buddies_pkey] PRIMARY KEY ([user1_id], [user2_id]),
    CONSTRAINT fk_user1 FOREIGN KEY ([user1_id]) REFERENCES [Users]([id]),
    CONSTRAINT fk_user2 FOREIGN KEY ([user2_id]) REFERENCES [Users]([id])
);

CREATE TABLE [Interests]
(
    [id] VARCHAR(255) NOT NULL PRIMARY KEY,
    [title] VARCHAR(255) NULL,
);


CREATE TABLE [UserInterests]
(
    [user_id] INT NOT NULL,
    [interest_id] VARCHAR(255) NOT NULL,
    CONSTRAINT [UserInterests_pkey] PRIMARY KEY ([user_id], [interest_id]),
    CONSTRAINT fk_user FOREIGN KEY ([user_id]) REFERENCES [Users]([id]),
    CONSTRAINT fk_interest FOREIGN KEY ([interest_id]) REFERENCES [Interests]([id])
);