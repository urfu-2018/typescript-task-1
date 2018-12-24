import { IObserver } from '../utils/observable/types';
import { GlobalView } from './globalView';

export class MobileView extends GlobalView implements IObserver {
    protected maxWeatherCount = 1;
    protected maxNewsCount = 1;
    protected markupClassName = 'mobile';
}
