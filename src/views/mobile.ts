import { IObserver } from '../utils/observable/types';
import { IView } from './types';
import { BaseView } from './base';

export class MobileView extends BaseView implements IObserver, IView {
    constructor() {
        super(1, 1, 'mobile');
    }
}
