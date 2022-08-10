import { IOClients } from '@vtex/api'

import InventoryRestClient from './inventoryRestClient'
import AuthClient from './authClient'

export class Clients extends IOClients {
  public get inventoryRestClient() {
    return this.getOrSet('inventoryRestClient', InventoryRestClient)
  }

  public get authClient() {
    return this.getOrSet('authClient', AuthClient)
  }
}
