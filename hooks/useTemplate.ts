import Logger from '@/lib/Logger';
import { ServiceType, TemplateService } from '@/models';

let tempService = new TemplateService();

const useTemplate = () => {
  const fetchTemplate = async () => {
    try {
      let response = await tempService.getTemplate();
      Logger.log('res', response);
      return response;
    } catch (error) {
      Logger.error('first');
    }
  };

  return {
    fetchTemplate,
  };
};

export default useTemplate;
