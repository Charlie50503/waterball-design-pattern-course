import { FullHouse } from './../card-pattern/full-house';
import { Straight } from './../card-pattern/straight';
import { Single } from './../card-pattern/single';
import { CardPattern } from '../card-pattern/card-pattern';
import { CardPatternType } from '../card-pattern/card-pattern-type';
import { FullHouseCombinations } from '../combinations/full-house-combinations';
import { PairCombinations } from '../combinations/pair-combinations';
import { SingleCombinations } from '../combinations/single-combinations';
import { StraightCombinations } from '../combinations/straight-combinations';
import { Player } from '../player/player';
import { Round } from '../round';
import { Play, PlayResultStatus } from './play';
import { BaseCombinations } from '../combinations/base-combinations';
import { Pair } from '../card-pattern/pair';

export class AIPlay extends Play {
  public playHook(
    player: Player,
    round: Round,
    isFirstPlay: boolean
  ): Promise<CardPattern | PlayResultStatus.PASS> {
    const singleCombinations = new SingleCombinations();
    const pairCombinations = new PairCombinations();
    const straightCombinations = new StraightCombinations();
    const fullHouseCombinations = new FullHouseCombinations();
    singleCombinations.combinations = singleCombinations.findAllCombinations(
      player.hand.cards
    );
    pairCombinations.combinations = pairCombinations.findAllCombinations(
      player.hand.cards
    );
    straightCombinations.combinations =
      straightCombinations.findAllCombinations(player.hand.cards);
    fullHouseCombinations.combinations =
      fullHouseCombinations.findAllCombinations(player.hand.cards);

    if (isFirstPlay) {
      singleCombinations.combinations =
        singleCombinations.filterHasClubThreeCombinations();
      pairCombinations.combinations =
        pairCombinations.filterHasClubThreeCombinations();
      straightCombinations.combinations =
        straightCombinations.filterHasClubThreeCombinations();
      fullHouseCombinations.combinations =
        fullHouseCombinations.filterHasClubThreeCombinations();

      const cardPatternTypes: CardPatternType[] = this.findHadCardPattern(
        singleCombinations,
        pairCombinations,
        straightCombinations,
        fullHouseCombinations
      );

      const selectedCardPatternType =
        this.randomCardPatternType(cardPatternTypes);
      const selectedCardPattern = this.randomCardPattern(
        selectedCardPatternType,
        singleCombinations,
        pairCombinations,
        straightCombinations,
        fullHouseCombinations
      );

      return Promise.resolve(selectedCardPattern!);
    } else if (round.topPlay !== null) {
      const cardPatternTypes: CardPatternType[] = this.findHadCardPattern(
        singleCombinations,
        pairCombinations,
        straightCombinations,
        fullHouseCombinations
      );

      const isNotSameCardPatternType =
        cardPatternTypes.filter(
          (cardPatternType) => round.topPlay!.getType() === cardPatternType
        ).length === 0;
      if (cardPatternTypes.length === 0 || isNotSameCardPatternType) {
        return Promise.resolve(PlayResultStatus.PASS);
      } else {
        if (round.topPlay.getType() === CardPatternType.SINGLE) {
          singleCombinations.combinations =
            singleCombinations.filterBiggerThanTopPlayCombinations(
              round.topPlay as Single
            );
        } else if (round.topPlay.getType() === CardPatternType.PAIR) {
          pairCombinations.combinations =
            pairCombinations.filterBiggerThanTopPlayCombinations(
              round.topPlay as Pair
            );
        } else if (round.topPlay.getType() === CardPatternType.STRAIGHT) {
          straightCombinations.combinations =
            straightCombinations.filterBiggerThanTopPlayCombinations(
              round.topPlay as Straight
            );
        } else if (round.topPlay.getType() === CardPatternType.FULL_HOUSE) {
          fullHouseCombinations.combinations =
            fullHouseCombinations.filterBiggerThanTopPlayCombinations(
              round.topPlay as FullHouse
            );
        }

        const selectedCardPattern = this.randomCardPattern(
          round.topPlay!.getType(),
          singleCombinations,
          pairCombinations,
          straightCombinations,
          fullHouseCombinations
        );
        if (!selectedCardPattern) {
          return Promise.resolve(PlayResultStatus.PASS);
        }

        return Promise.resolve(selectedCardPattern);
      }
    } else {
      const cardPatternTypes: CardPatternType[] = this.findHadCardPattern(
        singleCombinations,
        pairCombinations,
        straightCombinations,
        fullHouseCombinations
      );


      const selectedCardPatternType =
      this.randomCardPatternType(cardPatternTypes);
      const selectedCardPattern = this.randomCardPattern(
        selectedCardPatternType,
        singleCombinations,
        pairCombinations,
        straightCombinations,
        fullHouseCombinations
      );
      if (!selectedCardPattern) {
        return Promise.resolve(PlayResultStatus.PASS);
      }
      return Promise.resolve(selectedCardPattern);
      // return Promise.resolve(selectedCardPattern!);
      // if (cardPatternTypes.length === 0) {
      //   throw Error("沒有找到合適的牌型 錯誤");
      // } else {

      // }
    }
  }

  isLegalInput(answer: string) {
    let ary = answer.split(' ');
    return ary.every((item) => {
      return !isNaN(Number(item));
    });
  }

  findHadCardPattern(
    singleCombinations: SingleCombinations,
    pairCombinations: PairCombinations,
    straightCombinations: StraightCombinations,
    fullHouseCombinations: FullHouseCombinations
  ) {
    const cardPatternTypes: CardPatternType[] = [];

    if (!singleCombinations.isCombinationsEmpty()) {
      cardPatternTypes.push(CardPatternType.SINGLE);
    }
    if (!pairCombinations.isCombinationsEmpty()) {
      cardPatternTypes.push(CardPatternType.PAIR);
    }
    if (!straightCombinations.isCombinationsEmpty()) {
      cardPatternTypes.push(CardPatternType.STRAIGHT);
    }
    if (!fullHouseCombinations.isCombinationsEmpty()) {
      cardPatternTypes.push(CardPatternType.FULL_HOUSE);
    }
    return cardPatternTypes;
  }

  randomCardPatternType(cardPatternTypes: CardPatternType[]): CardPatternType {
    const randomIndex = Math.floor(Math.random() * cardPatternTypes.length);
    return cardPatternTypes[randomIndex];
  }

  randomSelectCombination<K extends CardPattern, T extends BaseCombinations<K>>(
    combinations: T
  ): K | null {
    if (combinations.combinations.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(
      Math.random() * combinations.combinations.length
    );
    return combinations.combinations[randomIndex];
  }

  randomCardPattern(
    selectedCardPatternType: CardPatternType,
    singleCombinations: SingleCombinations,
    pairCombinations: PairCombinations,
    straightCombinations: StraightCombinations,
    fullHouseCombinations: FullHouseCombinations
  ) {
    let selectedCardPattern: CardPattern | null = null;
    if (selectedCardPatternType === CardPatternType.SINGLE) {
      selectedCardPattern = this.randomSelectCombination(singleCombinations);
    } else if (selectedCardPatternType === CardPatternType.PAIR) {
      selectedCardPattern = this.randomSelectCombination(pairCombinations);
    } else if (selectedCardPatternType === CardPatternType.STRAIGHT) {
      selectedCardPattern = this.randomSelectCombination(straightCombinations);
    } else if (selectedCardPatternType === CardPatternType.FULL_HOUSE) {
      selectedCardPattern = this.randomSelectCombination(fullHouseCombinations);
    }
    return selectedCardPattern;
  }
}
