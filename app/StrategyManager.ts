import { Item } from "@/gilded-rose";

type IProductProcessor = {
  process(product: Item): void;
}

class AgedBrieProductProcessor implements IProductProcessor {
  process(item: Item) {
    item.sellIn--;

    if (item.quality < 50) {
      item.quality++;
    }
  }
}

class BackstagePassProductProcessor implements IProductProcessor {
  process(item: Item) {
    if (item.sellIn < 1) {
      item.quality = 0;
    } else {
      item.quality++;

      if (item.sellIn < 11) {
        item.quality++;
      }

      if (item.sellIn < 6) {
        item.quality++;
      }
    }

    item.sellIn--;
  }
}

class SulfurasProductProcessor implements IProductProcessor {
  process(item: Item) {
    /* sellIn and quality props are immutable */
  }
}

class DefaultProductProcessor implements IProductProcessor {
  process(item: Item) {
    item.quality--;

    if (item.sellIn <= 0) {
      item.quality--;
    }

    item.sellIn--;
  }
}

export class StrategyManager {
  defineStrategy(product: Item): IProductProcessor {
    switch (product.name) {
      case 'Aged Brie':
        return new AgedBrieProductProcessor();
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePassProductProcessor();
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasProductProcessor();
      default:
        return new DefaultProductProcessor();
    }
  }
}
