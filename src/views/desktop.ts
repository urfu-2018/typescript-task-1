import { IObserver } from '../utils/observable/types';
import { EffectiveLogView } from '../utils/viewUtils';

export class DesktopView extends EffectiveLogView implements IObserver {
    private static articlesSize = 3;
    private static measurementsSize = 2;
    private static htmlClass = 'desktop';

    protected getArticlesSize(): number {
        return DesktopView.articlesSize;
    }

    protected getHtmlClass(): string {
        return DesktopView.htmlClass;
    }

    protected getMeasurementsSize(): number {
        return DesktopView.measurementsSize;
    }
}
