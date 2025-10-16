CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    full_name TEXT,
    email TEXT,
    blood_type TEXT,
    mutation_data TEXT,
    wellness_score INTEGER DEFAULT 0,
    profile_image_url TEXT,
    date_of_birth DATE,
    gender TEXT,
    phone TEXT,
    address TEXT,
    profile_complete_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);