CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    item_type TEXT NOT NULL,
    item_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);