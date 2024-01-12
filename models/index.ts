import { RequestInfoType, HTTPMethod, NetworkClient } from '@/networking/BaseNetwork';
import { ServiceClient } from '@/networking/ServiceClient';

export type RequestModel<T> = {
  type: ServiceType;
  data?: T;
  queryParams?: { [key: string]: string | number | boolean };
};

export enum ServiceType {
  TEMPLATE = 'TEMPLATE',
}

enum ServiceURL {
  TEMPLATE = '',
}

function getNetworkRequestInfo<T>(model: RequestModel<T>): RequestInfoType<T> {
  switch (model.type) {
    case ServiceType.TEMPLATE: {
      return {
        url: ServiceURL.TEMPLATE,
        method: HTTPMethod.GET,
      };
    }
  }
}

export class TemplateService {
  private networkRepository: NetworkClient;
  constructor() {
    this.networkRepository = ServiceClient.getRepositoryInstance();
  }

  getTemplate = (): Promise<any> => {
    const getTemplateCall = getNetworkRequestInfo({
      type: ServiceType.TEMPLATE,
    });

    //@ts-ignore
    return this.networkRepository.processRequest<any, any>(getTemplateCall);
  };
}
