import { AuthHttpClient, AuthlessHttpClient, NetworkClient } from './BaseNetwork';

export class ServiceClient {
  private static authlessClient: AuthlessHttpClient;
  private static authClient: AuthHttpClient;

  static getRepositoryInstance(isProtected: boolean = true): NetworkClient {
    if (isProtected) {
      if (!ServiceClient.authClient) {
        ServiceClient.authClient = new AuthHttpClient(
          // ! move the URL into env folders
          'https://jsonplaceholder.typicode.com/todos/1'
        );
      }

      return ServiceClient.authClient;
    } else {
      if (!ServiceClient.authlessClient) {
        ServiceClient.authlessClient = new AuthlessHttpClient(
          'https://jsonplaceholder.typicode.com/todos/1'
        );
      }

      return ServiceClient.authlessClient;
    }
  }
}
