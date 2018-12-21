import { UpdatesRenderer } from './updatesRenderer';

export class DesktopView extends UpdatesRenderer {
    protected articlesToRender = 3;
    protected measurementsToRender = 2;
    protected deviceType = 'desktop';
}
