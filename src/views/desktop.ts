import { IObserver } from '../utils/observable/types';
import { IView } from './types';
import { BaseView } from './base';

export class DesktopView extends BaseView implements IObserver, IView {
    constructor() {
        super(3, 2, 'desktop');
    }
}
