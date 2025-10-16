CREATE TABLE health_questionnaires (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    questionnaire_type TEXT NOT NULL,
    questions JSONB,
    answers JSONB,
    completion_percentage INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);