CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    meal_type TEXT,
    ingredients JSONB,
    instructions TEXT,
    health_benefits JSONB,
    image_url TEXT,
    biomarker_tags JSONB,
    calories INTEGER,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    is_public BOOLEAN DEFAULT true,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);