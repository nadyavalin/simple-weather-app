declare namespace ymaps {
  function ready(callback: () => void): void;
  function suggest(request: string, options?: any): Promise<any[]>;
  class SuggestView {
    constructor(element: string | HTMLElement, options?: any);
    events: {
      add: (event: string, handler: (e: any) => void) => void;
    };
  }
}
