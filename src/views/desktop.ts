import { IObserver } from '../utils/observable/types';
import { GlobalView } from './globalView';

export class DesktopView extends GlobalView implements IObserver {
    protected maxWeatherCount = 2;
    protected maxNewsCount = 3;
    protected markupClassName = 'desktop';
}
