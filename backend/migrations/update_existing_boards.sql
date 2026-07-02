-- Update existing boards with default colors
UPDATE boards SET background_color = '#667eea' WHERE background_color IS NULL;
UPDATE boards SET list_color = 'rgba(255,255,255,0.95)' WHERE list_color IS NULL;
