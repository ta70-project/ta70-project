import { ImageInformationModel } from '../models/image-information.model';
import { InformationModel } from '../models/information.model';
import { VideoInformationModel } from '../models/video-information.model';
import { informationIds } from './information-ids.constant';

export const information: InformationModel[] = [
  new ImageInformationModel({
    id: informationIds.planning,
    src: 'assets/images/planning-1.png',
  }),
  new ImageInformationModel({ id: informationIds.cfaiPresentation }),
  new ImageInformationModel({ id: informationIds.fisaDefinition }),
  new ImageInformationModel({ id: informationIds.apprenticeshipDefinition }),
  new ImageInformationModel({ id: informationIds.eligibilityModes }),
  new ImageInformationModel({ id: informationIds.diploma }),
  new VideoInformationModel({
    id: informationIds.formation,
    src: 'https://www.youtube.com/embed/tCDvOQI3pco',
    displayDurationInSeconds: 100
  }),
];
