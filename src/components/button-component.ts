
/**
 * ButtonComponent
 */
export class ButtonComponent {
  constructor() {
    this.init();
  }

  private init(): void {
    console.log('Hello there from ButtonComponent');
  }

  public logMessage(...message: string[]): void {
    console.log(...message);
  }
}
