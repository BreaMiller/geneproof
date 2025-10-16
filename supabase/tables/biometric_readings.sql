CREATE TABLE biometric_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    physical_score INTEGER DEFAULT 0,
    emotional_score INTEGER DEFAULT 0,
    intellectual_score INTEGER DEFAULT 0,
    reading_date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);