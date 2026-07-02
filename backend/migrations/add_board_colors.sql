-- Add color customization columns to boards table
ALTER TABLE boards ADD COLUMN IF NOT EXISTS background_color VARCHAR(50) DEFAULT '#667eea';
ALTER TABLE boards ADD COLUMN IF NOT EXISTS list_color VARCHAR(50) DEFAULT '#ffffff';
