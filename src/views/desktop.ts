import { IObserver } from '../utils/observable/types';
import { View } from './view';
import { IView } from './types';

export class DesktopView extends View implements IObserver, IView {
    public constructor() {
        super(3, 2, 'desktop');
    }
}
