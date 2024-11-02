-- Threads table - Represents chat conversations
CREATE TABLE IF NOT EXISTS threads (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Media table - Stores references to media files
CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Messages table - Represents individual chat messages with types and intents
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    type TEXT NOT NULL CHECK (type IN ('text', 'recipe', 'image', 'file')),
    intent_type TEXT CHECK (intent_type IN ('suggest_ideas', 'adjust_recipe', 'ask_recipe_question', 'process_receipt_for_meal_plan')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Thread Messages junction table
CREATE TABLE IF NOT EXISTS thread_messages (
    thread_id TEXT NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (thread_id, message_id),
    UNIQUE (thread_id, position)
);

-- Suggest Ideas intent table
CREATE TABLE IF NOT EXISTS suggest_ideas (
    message_id TEXT PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Adjust Recipe intent table
CREATE TABLE IF NOT EXISTS adjust_recipe (
    message_id TEXT PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE,
    recipe_id TEXT NOT NULL REFERENCES recipes(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Ask Recipe Question intent table
CREATE TABLE IF NOT EXISTS ask_recipe_question (
    message_id TEXT PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE,
    recipe_id TEXT NOT NULL REFERENCES recipes(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Process Receipt for Meal Plan intent table
CREATE TABLE IF NOT EXISTS process_receipt_for_meal_plan (
    message_id TEXT PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE,
    media_id TEXT NOT NULL REFERENCES media(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Recipes table - Now versions are tracked per recipe
CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    parent_recipe_id TEXT REFERENCES recipes(id),
    version_number INTEGER NOT NULL,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    yield TEXT NOT NULL,
    tags TEXT NOT NULL,
    active_time TEXT NOT NULL,
    prompt TEXT NOT NULL,
    tokens TEXT NOT NULL,
    cook_time TEXT NOT NULL,
    total_time TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    UNIQUE (parent_recipe_id, version_number),
    UNIQUE (slug, version_number)
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_thread_messages_message_id ON thread_messages(message_id);
CREATE INDEX IF NOT EXISTS idx_thread_messages_position ON thread_messages(thread_id, position);
CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(type);
CREATE INDEX IF NOT EXISTS idx_messages_intent_type ON messages(intent_type);
CREATE INDEX IF NOT EXISTS idx_adjust_recipe_recipe_id ON adjust_recipe(recipe_id);
CREATE INDEX IF NOT EXISTS idx_ask_recipe_question_recipe_id ON ask_recipe_question(recipe_id);
CREATE INDEX IF NOT EXISTS idx_process_receipt_media_id ON process_receipt_for_meal_plan(media_id);
CREATE INDEX IF NOT EXISTS idx_recipes_parent ON recipes(parent_recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipes_slug ON recipes(slug);
CREATE INDEX IF NOT EXISTS idx_recipes_tags ON recipes(tags);