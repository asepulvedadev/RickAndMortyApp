import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Character, Gender } from '../../../models/character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-character-battle',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  template: `
    <div class="battle-container">
      <div class="battle-header">
        <h1>Batalla de Cartas</h1>
        <button class="battle-button" (click)="startBattle()" [disabled]="!canBattle">
          <i class="fas fa-bolt"></i> ¡Batallar!
        </button>
      </div>

      <div class="battle-arena">
        <div class="character-slot" [class.winner]="battleResult === 'player1'">
          @if (player1Card) {
            <app-character-card [character]="player1Card"></app-character-card>
          }
        </div>

        <div class="vs-container">
          <div class="vs-text">VS</div>
          <button class="new-battle-btn" (click)="newBattle()" title="Nueva Batalla">
            <i class="fas fa-random"></i>
          </button>
        </div>

        <div class="character-slot" [class.winner]="battleResult === 'player2'">
          @if (player2Card) {
            <app-character-card [character]="player2Card"></app-character-card>
          }
        </div>
      </div>

      @if (battleResult) {
        <div class="battle-result">
          <h2>{{ getResultMessage() }}</h2>
        </div>
      }

      <button class="home-button" (click)="goHome()">
        <i class="fas fa-home"></i> Volver al Inicio
      </button>
    </div>
  `,
  styles: [`
    .battle-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    .battle-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h1 {
        color: var(--text-color);
        font-size: 2rem;
        text-shadow: 0 2px 4px var(--shadow-color);
      }
    }

    .battle-button {
      padding: 1rem 2rem;
      font-size: 1.2rem;
      background: var(--primary-gradient);
      color: var(--text-color);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      i {
        font-size: 1.2rem;
      }
    }

    .battle-arena {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
      position: relative;
    }

    .character-slot {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      transition: all 0.5s ease;
      position: relative;

      &.winner {
        animation: winnerPulse 2s infinite;
        transform: scale(1.05);

        &::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(45deg, 
            rgba(255, 215, 0, 0.2),
            rgba(255, 215, 0, 0.1),
            rgba(255, 215, 0, 0.2)
          );
          border-radius: 20px;
          z-index: -1;
          animation: borderGlow 2s infinite;
        }

        &::after {
          content: '👑';
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          animation: crownFloat 2s infinite;
        }
      }
    }

    .vs-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100px;
      position: relative;
      gap: 1rem;
    }

    .vs-text {
      font-size: 2rem;
      font-weight: bold;
      color: var(--primary-color);
      text-shadow: 0 2px 4px var(--shadow-color);
      animation: vsPulse 2s infinite;
    }

    .new-battle-btn {
      background: var(--primary-gradient);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--text-color);
      box-shadow: 0 2px 8px var(--shadow-color);

      &:hover {
        transform: scale(1.1) rotate(180deg);
        box-shadow: 0 4px 12px var(--primary-color);
      }

      i {
        font-size: 1.2rem;
      }
    }

    .home-button {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem 2rem;
      background: var(--background-card);
      color: var(--text-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 12px var(--shadow-color);

      &:hover {
        transform: translateY(-2px);
        background: var(--primary-gradient);
      }

      i {
        font-size: 1.2rem;
      }
    }

    @keyframes winnerPulse {
      0% {
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
      }
      50% {
        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
      }
      100% {
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
      }
    }

    @keyframes borderGlow {
      0% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.5;
      }
    }

    @keyframes crownFloat {
      0% {
        transform: translateX(-50%) translateY(0);
      }
      50% {
        transform: translateX(-50%) translateY(-10px);
      }
      100% {
        transform: translateX(-50%) translateY(0);
      }
    }

    @keyframes vsPulse {
      0% {
        transform: scale(1);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0.8;
      }
    }

    .battle-result {
      text-align: center;
      margin-top: 2rem;
      padding: 1.5rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      border: 1px solid var(--border-color);
      animation: resultAppear 0.5s ease-out;

      h2 {
        color: var(--text-color);
        font-size: 1.5rem;
        text-shadow: 0 2px 4px var(--shadow-color);
        margin-bottom: 1.5rem;
      }
    }

    @keyframes resultAppear {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .battle-arena {
        flex-direction: column;
      }

      .vs-container {
        width: 100%;
        margin: 1rem 0;
      }

      .home-button {
        bottom: 1rem;
        right: 1rem;
        padding: 0.8rem 1.5rem;
      }
    }
  `]
})
export class CharacterBattleComponent implements OnInit {
  player1Card: Character | null = null;
  player2Card: Character | null = null;
  battleResult: 'player1' | 'player2' | 'draw' | null = null;

  constructor(private router: Router) {}

  get canBattle(): boolean {
    return !!this.player1Card && !!this.player2Card;
  }

  ngOnInit() {
    this.generateRandomCards();
  }

  generateRandomCards() {
    this.player1Card = this.generateRandomCharacter();
    this.player2Card = this.generateRandomCharacter();
    this.battleResult = null;
  }

  private generateRandomCharacter(): Character {
    const names = ['Rick', 'Morty', 'Summer', 'Beth', 'Jerry', 'Bird Person', 'Mr. Meeseeks'];
    const species = ['Human', 'Alien', 'Robot', 'Monster', 'God'];
    
    return {
      id: Math.floor(Math.random() * 1000),
      name: names[Math.floor(Math.random() * names.length)],
      status: 'Alive',
      species: species[Math.floor(Math.random() * species.length)],
      type: '',
      gender: Gender.MALE,
      origin: { name: 'Earth', link: '' },
      location: { name: 'Earth', link: '' },
      image: `https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 826)}.jpeg`,
      episode: [],
      url: '',
      created: new Date().toISOString(),
      power: {
        attack: Math.floor(Math.random() * 100) + 1,
        defense: Math.floor(Math.random() * 100) + 1,
        speed: Math.floor(Math.random() * 100) + 1,
        special: Math.floor(Math.random() * 100) + 1
      }
    };
  }

  startBattle() {
    if (!this.player1Card || !this.player2Card) return;

    const player1Total = this.calculateTotalPower(this.player1Card);
    const player2Total = this.calculateTotalPower(this.player2Card);

    if (player1Total > player2Total) {
      this.battleResult = 'player1';
    } else if (player2Total > player1Total) {
      this.battleResult = 'player2';
    } else {
      this.battleResult = 'draw';
    }
  }

  private calculateTotalPower(character: Character): number {
    if (!character.power) return 0;
    return (
      character.power.attack +
      character.power.defense +
      character.power.speed +
      character.power.special
    );
  }

  getResultMessage(): string {
    if (!this.battleResult) return '';
    
    switch (this.battleResult) {
      case 'player1':
        return `¡${this.player1Card?.name} ha ganado la batalla!`;
      case 'player2':
        return `¡${this.player2Card?.name} ha ganado la batalla!`;
      case 'draw':
        return '¡La batalla ha terminado en empate!';
      default:
        return '';
    }
  }

  newBattle() {
    this.generateRandomCards();
  }

  goHome() {
    this.router.navigate(['/characters']);
  }
} 