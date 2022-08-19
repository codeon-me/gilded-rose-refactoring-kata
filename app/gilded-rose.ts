import { StrategyManager } from '@/StrategyManager'

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  constructor(
    private strategyManager: StrategyManager,
    private items: Array<Item>,
  ) {}

  updateQuality(): Array<Item> {
    for (const item of this.items) {
      const strategy = this.strategyManager.defineStrategy(item);
      strategy.process(item);
    }

    return this.items;
  }
}
