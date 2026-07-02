import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Board, CreateBoard, UpdateBoard } from '../models/board';
import { List, CreateList, UpdateList } from '../models/list';
import { Card, CreateCard, UpdateCard } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Boards
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/api/boards`);
  }

  getUserBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/api/boards/user`, { headers: this.getAuthHeaders() });
  }

  getBoard(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/api/boards/${id}`);
  }

  createBoard(board: CreateBoard): Observable<Board> {
    return this.http.post<Board>(`${this.apiUrl}/api/boards`, board, { headers: this.getAuthHeaders() });
  }

  updateBoard(id: number, board: UpdateBoard): Observable<Board> {
    return this.http.put<Board>(`${this.apiUrl}/api/boards/${id}`, board, { headers: this.getAuthHeaders() });
  }

  deleteBoard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/boards/${id}`, { headers: this.getAuthHeaders() });
  }

  // Lists
  getListsByBoard(boardId: number): Observable<List[]> {
    return this.http.get<List[]>(`${this.apiUrl}/api/lists/board/${boardId}`);
  }

  getList(id: number): Observable<List> {
    return this.http.get<List>(`${this.apiUrl}/api/lists/${id}`);
  }

  createList(list: CreateList): Observable<List> {
    return this.http.post<List>(`${this.apiUrl}/api/lists`, list, { headers: this.getAuthHeaders() });
  }

  updateList(id: number, list: UpdateList): Observable<List> {
    return this.http.put<List>(`${this.apiUrl}/api/lists/${id}`, list, { headers: this.getAuthHeaders() });
  }

  deleteList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/lists/${id}`, { headers: this.getAuthHeaders() });
  }

  // Cards
  getCardsByList(listId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/api/cards/list/${listId}`);
  }

  getCardsByBoard(boardId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/api/cards/board/${boardId}`);
  }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/api/cards/${id}`);
  }

  createCard(card: CreateCard): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/api/cards`, card, { headers: this.getAuthHeaders() });
  }

  updateCard(id: number, card: UpdateCard): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/api/cards/${id}`, card, { headers: this.getAuthHeaders() });
  }

  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/cards/${id}`, { headers: this.getAuthHeaders() });
  }
}
