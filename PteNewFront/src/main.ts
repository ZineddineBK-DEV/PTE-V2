import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {registerLicense} from '@syncfusion/ej2-base';




registerLicense("ORg4AjUWIQA/Gnt2VFhiQlJPcUBDVHxLflF1VWRTfFl6cF1WESFaRnZdQV1lSHdTcUZrW3hWeHRU");


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
