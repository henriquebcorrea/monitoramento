import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Board, List, Card } from '../../models';

@Component({
  selector: 'app-kanban-board',
  template: `
    <div class="kanban-container" *ngIf="!loading" [style.background-image]="backgroundStyle">
      <app-board-settings
        [boardTitle]="board?.title || ''"
        [backgroundColor]="board?.background_color || '#667eea'"
        [listColor]="board?.list_color || '#ffffff'"
        [listBackgroundColor]="listBackgroundColor"
        (settingsSaved)="onSettingsSaved($event)">
      </app-board-settings>

      <div class="header">
        <h1>{{ board?.title || 'Kanban Board' }}</h1>
        <div class="header-actions">
          <button (click)="logout()">Logout</button>
        </div>
      </div>

      <div class="board-description" *ngIf="board?.description">
        {{ board?.description }}
      </div>

      <div class="kanban-board">
        <div class="list" *ngFor="let list of lists" 
             [style.background]="listBackgroundColor"
             (dragover)="onDragOver($event)" 
             (drop)="onDrop($event, list.id)">
          <div class="list-header">
            <h3>{{ list.title }}</h3>
            <button (click)="deleteList(list.id)" class="delete-btn">×</button>
          </div>
          
          <div class="cards-container">
            <div class="card" 
                 *ngFor="let card of getCardsByList(list.id)"
                 [draggable]="true"
                 (dragstart)="onDragStart($event, card)"
                 (dragend)="onDragEnd($event)">
              <div class="card-content">
                <div class="card-header">
                  <div class="card-status" [class]="'status-' + card.status">
                    {{ getStatusLabel(card.status) }}
                  </div>
                  <select (change)="onStatusChange(card.id, $event)" class="status-select">
                    <option value="todo" [selected]="card.status === 'todo'">A fazer</option>
                    <option value="in_progress" [selected]="card.status === 'in_progress'">Em progresso</option>
                    <option value="done" [selected]="card.status === 'done'">Feito</option>
                  </select>
                </div>
                <h4>{{ card.title }}</h4>
                <p *ngIf="card.description">{{ card.description }}</p>
              </div>
              <button (click)="deleteCard(card.id)" class="delete-card-btn">×</button>
            </div>
          </div>

          <div class="add-card">
            <button (click)="showAddCard[list.id] = !showAddCard[list.id]">
              + Add Card
            </button>
            <form *ngIf="showAddCard[list.id]" (ngSubmit)="addCard(list.id)" [formGroup]="cardForm">
              <input type="text" formControlName="title" placeholder="Card title" required>
              <textarea formControlName="description" placeholder="Description (optional)"></textarea>
              <div class="form-actions">
                <button type="submit">Add</button>
                <button type="button" (click)="showAddCard[list.id] = false">Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <div class="list add-list">
          <button (click)="showAddList = !showAddList">
            + Add List
          </button>
          <form *ngIf="showAddList" (ngSubmit)="addList()" [formGroup]="listForm">
            <input type="text" formControlName="title" placeholder="List title" required>
            <div class="form-actions">
              <button type="submit">Add</button>
              <button type="button" (click)="showAddList = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="loading" *ngIf="loading">
      <p>Loading...</p>
    </div>
  `,
  styles: [`
    .kanban-container {
      min-height: 100vh;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .header h1 {
      color: white;
      margin: 0;
    }

    .header-actions button {
      padding: 10px 20px;
      background: rgba(255,255,255,0.2);
      color: white;
      border: 2px solid white;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }

    .header-actions button:hover {
      background: white;
      color: #667eea;
    }

    .board-description {
      color: rgba(255,255,255,0.9);
      margin-bottom: 30px;
      font-size: 16px;
    }

    .kanban-board {
      display: flex;
      gap: 20px;
      overflow-x: auto;
      padding-bottom: 20px;
    }

    .list {
      background: rgba(255,255,255,0.95);
      border-radius: 8px;
      min-width: 300px;
      max-width: 300px;
      padding: 16px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      height: fit-content;
      align-self: flex-start;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .list-header h3 {
      margin: 0;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }

    .delete-btn {
      background: none;
      border: none;
      color: #999;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      line-height: 1;
    }

    .delete-btn:hover {
      color: #e74c3c;
    }

    .cards-container {
      min-height: 100px;
      margin-bottom: 12px;
    }

    .card {
      background: white;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: move;
      position: relative;
      transition: all 0.2s;
    }

    .card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .card.dragging {
      opacity: 0.5;
    }

    .card-content h4 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 14px;
      font-weight: 600;
    }

    .card-content p {
      margin: 0;
      color: #666;
      font-size: 13px;
      line-height: 1.4;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      gap: 8px;
    }

    .card-status {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-select {
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 11px;
      cursor: pointer;
      background: white;
    }

    .status-todo {
      background: #e3f2fd;
      color: #1976d2;
    }

    .status-in_progress {
      background: #fff3e0;
      color: #f57c00;
    }

    .status-done {
      background: #e8f5e9;
      color: #388e3c;
    }

    .delete-card-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      color: #999;
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      width: 20px;
      height: 20px;
      line-height: 1;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .card:hover .delete-card-btn {
      opacity: 1;
    }

    .delete-card-btn:hover {
      color: #e74c3c;
    }

    .add-card button {
      width: 100%;
      padding: 8px;
      background: none;
      border: 2px dashed #ccc;
      border-radius: 4px;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
    }

    .add-card button:hover {
      border-color: #667eea;
      color: #667eea;
    }

    .add-card form {
      margin-top: 8px;
    }

    .add-card input,
    .add-card textarea {
      width: 100%;
      padding: 8px;
      border: 2px solid #e0e0e0;
      border-radius: 4px;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .add-card textarea {
      min-height: 60px;
      resize: vertical;
    }

    .add-list {
      background: rgba(255,255,255,0.5);
      border: 2px dashed rgba(255,255,255,0.5);
      border-radius: 8px;
      min-width: 300px;
      max-width: 300px;
      padding: 16px;
    }

    .add-list button {
      width: 100%;
      padding: 12px;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
    }

    .add-list button:hover {
      background: rgba(255,255,255,0.1);
    }

    .add-list form {
      margin-top: 12px;
    }

    .add-list input {
      width: 100%;
      padding: 10px;
      border: 2px solid #e0e0e0;
      border-radius: 4px;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .form-actions {
      display: flex;
      gap: 8px;
    }

    .form-actions button {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    .form-actions button[type="submit"] {
      background: #667eea;
      color: white;
    }

    .form-actions button[type="button"] {
      background: #e0e0e0;
      color: #333;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      color: white;
      font-size: 24px;
    }
  `]
})
export class KanbanBoardComponent implements OnInit {
  board: Board | null = null;
  lists: List[] = [];
  cards: Card[] = [];
  loading = true;
  showAddList = false;
  showAddCard: { [key: number]: boolean } = {};
  draggedCard: Card | null = null;
  listBackgroundColor = 'rgba(255,255,255,0.95)';
  backgroundStyle = 'linear-gradient(135deg, #667eea 0%, #5568d3 100%)';

  listForm: FormGroup;
  cardForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.listForm = this.fb.group({
      title: ['']
    });

    this.cardForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const boardIdParam = this.route.snapshot.paramMap.get('id');
    if (boardIdParam) {
      const boardId = +boardIdParam;
      this.loadBoard(boardId);
    } else {
      // No board ID specified, get user's boards
      this.apiService.getUserBoards().subscribe({
        next: (boards) => {
          if (boards.length > 0) {
            // Navigate to the first board
            this.router.navigate(['/board', boards[0].id]);
          } else {
            // Create a default board for the user
            this.createDefaultBoard();
          }
        },
        error: () => {
          // If getUserBoards fails, try to create a default board
          this.createDefaultBoard();
        }
      });
    }
  }

  loadBoard(boardId: number): void {
    this.loading = true;

    this.apiService.getBoard(boardId).subscribe({
      next: (board) => {
        this.board = board;
        this.listBackgroundColor = board.list_color || 'rgba(255,255,255,0.95)';
        this.updateBackgroundStyle();
        this.loadLists(boardId);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Board doesn't exist, try to get user's boards or create one
        this.apiService.getUserBoards().subscribe({
          next: (boards) => {
            if (boards.length > 0) {
              // Navigate to the first board
              this.router.navigate(['/board', boards[0].id]);
            } else {
              // Create a default board for the user
              this.createDefaultBoard();
            }
          },
          error: () => {
            // If getUserBoards fails, try to create a default board
            this.createDefaultBoard();
          }
        });
      }
    });
  }

  createDefaultBoard(): void {
    this.apiService.createBoard({
      title: 'Meu Primeiro Board',
      description: 'Board padrão para começar'
    }).subscribe({
      next: (board) => {
        // Create default lists with Portuguese names
        this.createDefaultLists(board.id);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  createDefaultLists(boardId: number): void {
    const listTitles = ['A Fazer', 'Em Progresso', 'Concluído'];
    let createdCount = 0;

    listTitles.forEach((title, index) => {
      this.apiService.createList({
        title,
        boardId,
        position: index
      }).subscribe({
        next: () => {
          createdCount++;
          if (createdCount === listTitles.length) {
            this.router.navigate(['/board', boardId]);
          }
        },
        error: () => {
          createdCount++;
          if (createdCount === listTitles.length) {
            this.router.navigate(['/board', boardId]);
          }
        }
      });
    });
  }

  loadLists(boardId: number): void {
    this.apiService.getListsByBoard(boardId).subscribe({
      next: (lists) => {
        this.lists = lists;
        this.loadCards(boardId);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadCards(boardId: number): void {
    this.apiService.getCardsByBoard(boardId).subscribe({
      next: (cards) => {
        this.cards = cards;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getCardsByList(listId: number): Card[] {
    return this.cards.filter(card => card.list_id === listId);
  }

  addList(): void {
    if (!this.board || this.listForm.invalid) return;

    const position = this.lists.length;
    this.apiService.createList({
      title: this.listForm.value.title,
      boardId: this.board.id,
      position
    }).subscribe({
      next: (list) => {
        this.lists.push(list);
        this.listForm.reset();
        this.showAddList = false;
      },
      error: () => {}
    });
  }

  deleteList(listId: number): void {
    if (!confirm('Delete this list and all its cards?')) return;

    this.apiService.deleteList(listId).subscribe({
      next: () => {
        this.lists = this.lists.filter(l => l.id !== listId);
        this.cards = this.cards.filter(c => c.list_id !== listId);
      },
      error: () => {}
    });
  }

  addCard(listId: number): void {
    if (this.cardForm.invalid) return;

    const listCards = this.getCardsByList(listId);
    const position = listCards.length;

    this.apiService.createCard({
      title: this.cardForm.value.title,
      description: this.cardForm.value.description,
      listId,
      position
    }).subscribe({
      next: (card) => {
        this.cards.push(card);
        this.cardForm.reset();
        this.showAddCard[listId] = false;
      },
      error: () => {}
    });
  }

  deleteCard(cardId: number): void {
    if (!confirm('Delete this card?')) return;

    this.apiService.deleteCard(cardId).subscribe({
      next: () => {
        this.cards = this.cards.filter(c => c.id !== cardId);
      },
      error: () => {}
    });
  }

  updateCardStatus(cardId: number, newStatus: string): void {
    this.apiService.updateCard(cardId, { status: newStatus }).subscribe({
      next: (updatedCard) => {
        const card = this.cards.find(c => c.id === cardId);
        if (card) {
          card.status = newStatus;
        }
      },
      error: () => {}
    });
  }

  onStatusChange(cardId: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    this.updateCardStatus(cardId, newStatus);
  }

  onDragStart(event: DragEvent, card: Card): void {
    this.draggedCard = card;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
    (event.target as HTMLElement).classList.add('dragging');
  }

  onDragEnd(event: DragEvent): void {
    (event.target as HTMLElement).classList.remove('dragging');
    this.draggedCard = null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent, listId: number): void {
    event.preventDefault();
    
    if (!this.draggedCard || this.draggedCard.list_id === listId) return;

    // Save card ID before API call to avoid null reference
    const draggedCardId = this.draggedCard.id;
    const currentStatus = this.draggedCard.status;

    const listCards = this.getCardsByList(listId);
    const newPosition = listCards.length;

    // Determine status based on list position
    const targetList = this.lists.find(l => l.id === listId);
    let newStatus = currentStatus;
    if (targetList) {
      if (targetList.position === 0) newStatus = 'todo';
      else if (targetList.position === 1) newStatus = 'in_progress';
      else if (targetList.position === 2) newStatus = 'done';
    }

    this.apiService.updateCard(draggedCardId, {
      listId,
      position: newPosition,
      status: newStatus
    }).subscribe({
      next: () => {
        const card = this.cards.find(c => c.id === draggedCardId);
        if (card) {
          card.list_id = listId;
          card.position = newPosition;
          card.status = newStatus;
        }
      },
      error: () => {}
    });
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'todo': 'A fazer',
      'in_progress': 'Em progresso',
      'done': 'Feito'
    };
    return statusLabels[status] || status;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateBackgroundStyle(): void {
    const bgColor = this.board?.background_color || '#667eea';
    this.backgroundStyle = `linear-gradient(135deg, ${bgColor} 0%, ${this.adjustColor(bgColor, -20)} 100%)`;
  }

  adjustColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  onSettingsSaved(settings: any): void {
    if (!this.board) return;

    console.log('Settings saved:', settings);
    console.log('Current board:', this.board);

    // Apply changes immediately for better UX
    if (settings.title) {
      this.board.title = settings.title;
    }
    if (settings.backgroundColor) {
      this.board.background_color = settings.backgroundColor;
      console.log('Setting background color to:', settings.backgroundColor);
      this.updateBackgroundStyle();
      console.log('Background style after update:', this.backgroundStyle);
    }
    if (settings.listBackgroundColor) {
      this.listBackgroundColor = settings.listBackgroundColor;
      console.log('Setting list background to:', settings.listBackgroundColor);
    }

    this.apiService.updateBoard(this.board.id, {
      title: settings.title,
      background_color: settings.backgroundColor,
      list_color: settings.listBackgroundColor
    }).subscribe({
      next: (updatedBoard) => {
        console.log('Board updated successfully:', updatedBoard);
        this.board = updatedBoard;
        if (updatedBoard.list_color) {
          this.listBackgroundColor = updatedBoard.list_color;
        }
        this.updateBackgroundStyle();
      },
      error: (err) => {
        console.error('Failed to update board settings:', err);
      }
    });
  }
}
