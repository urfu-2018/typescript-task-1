import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { Content } from './content';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class DesktopView implements IObserver, IView {
    private data: Set<IObservable | NewsState | WeatherState> = new Set();
    private lastContent?: string;

    public update(observable: IObservable) {
        this.data.add(observable);
        const currentContent = new Content(this.data, 'desktop').getString();
        if (currentContent !== this.lastContent) {
            this.lastContent = currentContent;
            this.render();

        }
    }

    public render() {
        console.log(this.lastContent);
    }
}
