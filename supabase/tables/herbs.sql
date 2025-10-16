CREATE TABLE herbs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    benefits JSONB,
    image_url TEXT,
    biomarker_tags JSONB,
    preparation_instructions TEXT,
    dosage TEXT,
    precautions TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);