import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board-settings',
  template: `
    <div class="settings-panel" [class.expanded]="expanded">
      <button class="settings-toggle" (click)="toggleSettings()">
        ⚙️
      </button>
      <div class="settings-content" *ngIf="expanded">
        <h3>Configurações do Board</h3>

        <div class="setting-group">
          <label>Nome do Board</label>
          <input type="text" [(ngModel)]="localTitle" placeholder="Nome do board">
        </div>

        <div class="setting-group">
          <label>Cor de Fundo</label>
          <div class="color-picker">
            <input type="color" [(ngModel)]="localBackgroundColor" (change)="onColorChange()">
            <input type="text" [(ngModel)]="localBackgroundColor" (change)="onColorChange()">
          </div>
        </div>

        <div class="setting-group">
          <label>Cor das Listas</label>
          <div class="color-picker">
            <input type="color" [(ngModel)]="localListColor" (change)="onColorChange()">
            <input type="text" [(ngModel)]="localListColor" (change)="onColorChange()">
          </div>
        </div>

        <div class="preset-colors">
          <label>Cores Predefinidas</label>
          <div class="preset-buttons">
            <button class="preset-btn" (click)="applyPreset('#667eea', '#ffffff')" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></button>
            <button class="preset-btn" (click)="applyPreset('#f093fb', '#ffffff')" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></button>
            <button class="preset-btn" (click)="applyPreset('#4facfe', '#ffffff')" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></button>
            <button class="preset-btn" (click)="applyPreset('#43e97b', '#ffffff')" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);"></button>
            <button class="preset-btn" (click)="applyPreset('#fa709a', '#ffffff')" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);"></button>
            <button class="preset-btn" (click)="applyPreset('#a8edea', '#ffffff')" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);"></button>
          </div>
        </div>

        <div class="setting-group">
          <label>Cor das Listas (Fundo)</label>
          <div class="color-picker">
            <input type="color" [(ngModel)]="localListBackgroundColor" (change)="onColorChange()">
            <input type="text" [(ngModel)]="localListBackgroundColor" (change)="onColorChange()">
          </div>
        </div>

        <div class="setting-actions">
          <button type="button" (click)="saveSettings()" class="save-btn">Salvar</button>
          <button type="button" (click)="cancelSettings()" class="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-panel {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 1000;
    }

    .settings-toggle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: white;
      border: 2px solid #667eea;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s;
    }

    .settings-toggle:hover {
      transform: rotate(90deg);
      background: #667eea;
    }

    .settings-content {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-top: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      width: 300px;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .settings-content h3 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }

    .setting-group {
      margin-bottom: 16px;
    }

    .setting-group label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-weight: 500;
      font-size: 14px;
    }

    .setting-group input[type="text"] {
      width: 100%;
      padding: 10px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    .setting-group input[type="text"]:focus {
      outline: none;
      border-color: #667eea;
    }

    .color-picker {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .color-picker input[type="color"] {
      width: 50px;
      height: 40px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
    }

    .color-picker input[type="text"] {
      flex: 1;
      padding: 8px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
    }

    .preset-colors {
      margin-bottom: 16px;
    }

    .preset-colors label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-weight: 500;
      font-size: 14px;
    }

    .preset-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .preset-btn {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      border: 2px solid #e0e0e0;
      cursor: pointer;
      transition: all 0.2s;
    }

    .preset-btn:hover {
      transform: scale(1.1);
      border-color: #667eea;
    }

    .setting-actions {
      display: flex;
      gap: 8px;
      margin-top: 20px;
    }

    .setting-actions button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .save-btn {
      background: #667eea;
      color: white;
    }

    .save-btn:hover {
      background: #5568d3;
    }

    .cancel-btn {
      background: #e0e0e0;
      color: #333;
    }

    .cancel-btn:hover {
      background: #d0d0d0;
    }
  `]
})
export class BoardSettingsComponent {
  expanded = false;
  localTitle: string = '';
  localBackgroundColor: string = '#667eea';
  localListColor: string = '#ffffff';
  localListBackgroundColor: string = 'rgba(255,255,255,0.95)';

  @Input() boardTitle: string = '';
  @Input() backgroundColor: string = '#667eea';
  @Input() listColor: string = '#ffffff';
  @Input() listBackgroundColor: string = 'rgba(255,255,255,0.95)';

  @Output() settingsSaved = new EventEmitter<any>();

  ngOnChanges(): void {
    this.localTitle = this.boardTitle;
    this.localBackgroundColor = this.backgroundColor;
    this.localListColor = this.listColor;
    this.localListBackgroundColor = this.listBackgroundColor;
  }

  toggleSettings(): void {
    this.expanded = !this.expanded;
  }

  onColorChange(): void {
    // Color change is handled by ngModel
  }

  applyPreset(bgColor: string, listColor: string): void {
    this.localBackgroundColor = bgColor;
    this.localListColor = listColor;
  }

  saveSettings(): void {
    const settings = {
      title: this.localTitle,
      backgroundColor: this.localBackgroundColor,
      listColor: this.localListColor,
      listBackgroundColor: this.localListBackgroundColor
    };
    this.settingsSaved.emit(settings);
    this.expanded = false;
  }

  cancelSettings(): void {
    this.localTitle = this.boardTitle;
    this.localBackgroundColor = this.backgroundColor;
    this.localListColor = this.listColor;
    this.localListBackgroundColor = this.listBackgroundColor;
    this.expanded = false;
  }
}
