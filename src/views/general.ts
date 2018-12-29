import { IView } from './types';
import { IObservable, IObserver } from '../utils/observable/types';
import { LinesExtractor } from '../utils/extractors/lines-extractor';

export class ViewObserver implements IView, IObserver {
    private readonly outputClass: string;
    private readonly extractors: LinesExtractor[];

    protected constructor(outputClass: string, ...extractors: LinesExtractor[]) {
        this.outputClass = outputClass;
        this.extractors = extractors;
    }

    public render(): void {
        let lines: string[] = [];
        for (const extractor of this.extractors) {
            lines = lines.concat(extractor.getLines());
        }

        console.log(`<div class="${this.outputClass}">\n${lines.join('\n')}\n</div>`);
    }

    public update(observable: IObservable): void {
        let shouldRender = true;

        for (const extractor of this.extractors) {
            if (extractor.canExtractFrom(observable)) {
                const prevLines = extractor.getLines();
                extractor.extractLinesFrom(observable);
                const newLines = extractor.getLines();
                shouldRender = !arraysEquals(prevLines, newLines);
                break;
            }
        }

        if (shouldRender) {
            this.render();
        }
    }
}

function arraysEquals(arr1: string[], arr2: string[]): boolean {
    return arr1.length === arr2.length && arr1.every((_, i) => arr1[i] === arr2[i]);
}
