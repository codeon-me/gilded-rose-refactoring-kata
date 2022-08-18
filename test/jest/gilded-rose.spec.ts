import {
  Item,
  GildedRose,
} from '@/gilded-rose';
import {
  StrategyManager,
} from '@/StrategyManager'

describe('Gilded Rose', () => {
  describe('updateQuantity', () => {
    describe('Regular products', () => {
      it('decreases product quality by 1 per each day before expiration date', () => {
        const initialSellIn = 15;
        const initialQuality = 20;

        const item = new Item('Regular Test Product', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while(item.sellIn > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Regular Test Product');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(initialQuality - currentDay);

          currentDay++;
        }
      });

      it('decreases product quality by 2 per each day after expiration date', () => {
        const initialSellIn = 0;
        const initialQuality = 10;

        const item = new Item('Regular Test Product', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while (item.quality > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Regular Test Product');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(initialQuality - 2 * currentDay);

          currentDay++;
        }
      });

      it('does not allow negative quality', () => {
        const initialSellIn = 10;
        const initialQuality = 0;

        const item = new Item('Regular Test Product', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while (item.quality > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Regular Test Product');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(0);

          currentDay++;
        }
      });
    });

    describe('Conjured product', () => {
      it('decreases product quality by 2 per each day before expiration date', () => {
        const initialSellIn = 15;
        const initialQuality = 20;

        const item = new Item('Conjured Mana Cake', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while (item.sellIn > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Conjured Mana Cake');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(initialQuality - 2 * currentDay);

          currentDay++;
        }
      });

      it('decreases product quality by 4 per each day after expiration date', () => {
        const initialSellIn = 0;
        const initialQuality = 10;

        const item = new Item('Conjured Mana Cake', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while (item.quality > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Conjured Mana Cake');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(initialQuality - 4 * currentDay);

          currentDay++;
        }
      });

      it('does not allow negative quality', () => {
        const initialSellIn = 10;
        const initialQuality = 0;

        const item = new Item('Conjured Mana Cake', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while (item.quality > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Conjured Mana Cake');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(0);

          currentDay++;
        }
      });
    });

    describe('Aged Brie product', () => {
      it('increases product quality by 1 per each day before expiration date', () => {
        const initialSellIn = 15;
        const initialQuality = 20;

        const item = new Item('Aged Brie', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while(item.sellIn > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Aged Brie');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(initialQuality + currentDay);

          currentDay++;
        }
      });

      it('does not allow quality to exceed 50', () => {
        const initialSellIn = 15;
        const initialQuality = 50;

        const item = new Item('Aged Brie', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while(item.sellIn > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Aged Brie');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(50);

          currentDay++;
        }
      });
    });

    describe('Sulfuras, Hand of Ragnaros product', () => {
      it('does not change sellIn and quality', () => {
        const initialSellIn = 10;
        const initialQuality = 20;

        const item = new Item('Sulfuras, Hand of Ragnaros', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        const result = gildedRose.updateQuality();

        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Sulfuras, Hand of Ragnaros');
        expect(result[0].sellIn).toBe(initialSellIn);
        expect(result[0].quality).toBe(initialQuality);
      });
    })

    describe('Backstage pass product', () => {
      it('decreases product quality by 1 per each day if >10 days remaining', () => {
        const initialSellIn = 15;
        const initialQuality = 20;

        const item = new Item('Backstage passes to a TAFKAL80ETC concert', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while(item.sellIn > 10) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(initialQuality + currentDay);

          currentDay++;
        }
      });

      it('decreases product quality by 2 per each day if >5 and <= 10 days remaining', () => {
        const initialSellIn = 10;
        const initialQuality = 20;

        const item = new Item('Backstage passes to a TAFKAL80ETC concert', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while(item.sellIn > 5) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(initialQuality + 2 * currentDay);

          currentDay++;
        }
      });

      it('decreases product quality by 3 per each day if >0 and <= 5 days remaining', () => {
        const initialSellIn = 5;
        const initialQuality = 20;

        const item = new Item('Backstage passes to a TAFKAL80ETC concert', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        let currentDay = 1;

        while(item.sellIn > 0) {
          const result = gildedRose.updateQuality();

          expect(result.length).toBe(1);
          expect(result[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
          expect(result[0].sellIn).toBe(initialSellIn - currentDay);
          expect(result[0].quality).toBe(initialQuality + 3 * currentDay);

          currentDay++;
        }
      });

      it('resets quality to zero if product is expired', () => {
        const initialSellIn = 0;
        const initialQuality = 20;

        const item = new Item('Backstage passes to a TAFKAL80ETC concert', initialSellIn, initialQuality);
        const gildedRose = new GildedRose(new StrategyManager(), [item]);

        const result = gildedRose.updateQuality();

        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(result[0].sellIn).toBe(initialSellIn - 1);
        expect(result[0].quality).toBe(0);
      });
    })
  });
});
