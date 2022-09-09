import {Options, Trigger} from "../types";
import {escapeRegex} from "./index";
import {wordRegex} from "../constants";
import {Caret} from "./Caret";

export class TriggerFinder {
    text: string;
    dividedText: { left: string; right: string }

    static find(options: Options) {
        if (Caret.isSelectedPosition)
            return new TriggerFinder().find(options)
    }

    constructor() {
        let caretPosition = Caret.getCurrentPosition()
        this.text = Caret.getCurrentPieceOfText()
        this.dividedText = this.getDividedTextBy(caretPosition)
    }

    getDividedTextBy(position: number) {
        return {left: this.text.slice(0, position), right: this.text.slice(position)}
    }

    find(options: Options): Trigger | undefined {
        for (let option of options) {
            let match = this.matchInTextVia(option.trigger)
            if (match) return {
                value: match.word,
                source: match.annotation,
                index: match.index,
                piece: this.text,
                option
            }
        }
    }

    matchInTextVia(trigger: string) {
        const rightMatch = this.matchRightPart()
        const leftMatch = this.matchLeftPart(trigger)
        if (leftMatch) return {
            word: leftMatch.word + rightMatch.word,
            annotation: leftMatch.annotation + rightMatch.word,
            index: leftMatch.index,
        }
    }

    matchRightPart() {
        const {right} = this.dividedText
        return {word: right.match(wordRegex)?.[0]}
    }

    matchLeftPart(trigger: string) {
        const regex = this.makeTriggerRegex(trigger)
        const {left} = this.dividedText
        const match = left.match(regex)

        if (!match) return

        const [annotation, word] = match
        return {word, annotation, index: match.index ?? 0}
    }

    //TODO new trigger option if (isSpaceBeforeRequired) append space check for not first words '\\s'
    makeTriggerRegex(trigger: string): RegExp {
        const patten = escapeRegex(trigger) + '(\\w*)$'
        return new RegExp(patten)
    }
}