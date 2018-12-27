import { IObserver } from '../utils/observable/types';
import { EffectiveLogView } from '../utils/viewUtils';

export class MobileView extends EffectiveLogView implements IObserver {
    private static articlesSize = 1;
    private static measurementsSize = 1;
    private static htmlClass = 'mobile';

    protected getArticlesCount(): number {
        return MobileView.articlesSize;
    }

    protected getHtmlClass(): string {
        return MobileView.htmlClass;
    }

    protected getMeasurementsCount(): number {
        return MobileView.measurementsSize;
    }
}
