export interface List {
  id: number;
  title: string;
  board_id: number;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface CreateList {
  title: string;
  boardId: number;
  position?: number;
}

export interface UpdateList {
  title?: string;
  position?: number;
}
