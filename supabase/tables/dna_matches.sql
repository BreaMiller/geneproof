CREATE TABLE dna_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    matched_user_id UUID NOT NULL,
    match_percentage DECIMAL(5,2),
    distance_miles INTEGER,
    match_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);