import { UpdatesRenderer } from './updatesRenderer';

export class MobileView extends UpdatesRenderer {
    protected articlesToRender = 1;
    protected measurementsToRender = 1;
    protected deviceType = 'mobile';
}
