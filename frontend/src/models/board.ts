export interface Board {
  id: number;
  title: string;
  description: string;
  user_id: number;
  background_color?: string;
  list_color?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBoard {
  title: string;
  description?: string;
  background_color?: string;
  list_color?: string;
}

export interface UpdateBoard {
  title?: string;
  description?: string;
  background_color?: string;
  list_color?: string;
}
