export interface Card {
  id: number;
  title: string;
  description: string;
  list_id: number;
  position: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCard {
  title: string;
  description?: string;
  listId: number;
  position?: number;
  status?: string;
}

export interface UpdateCard {
  title?: string;
  description?: string;
  listId?: number;
  position?: number;
  status?: string;
}
