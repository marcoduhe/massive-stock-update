import type { EventContext } from '@vtex/api'
import { LogLevel } from '@vtex/api'

import type { Clients } from '../clients'
import {
  buildResponse,
  buildServiceErrorResponse,
  operation,
  retryCall,
  sleep,
} from './utils'

async function myOperations(
  ctx: any,
  elements: ResponseManager
): Promise<ResponseManager | void> {
  try {
    return await retryCall(ctx, operation, myOperations, elements)
  } catch (error) {
    buildServiceErrorResponse(error, ctx)
  }
}

export async function testStock(ctx: EventContext<Clients>) {
  const {
    body: { vtexIdToken, appKey, appToken, manager, validatedBody },
    vtex: { logger },
  } = ctx

  logger.log(
    {
      message: 'testEvent function testStock 1',
      request: validatedBody.length,
    },
    LogLevel.Info
  )

  const responseManager = manager

  try {
    logger.log(
      {
        message: 'testEvent function testStock 2',
        request: validatedBody.length,
      },
      LogLevel.Info
    )

    const itemsResponses: OperationResponse[] = []

    for (let i = 0; i < validatedBody.length; i++) {
      const {
        sku,
        warehouseId,
        quantity,
        unlimitedQuantity,
        dateUtcOnBalanceSystem,
      } = validatedBody[i]

      // eslint-disable-next-line no-await-in-loop
      const response = await operation(
        ctx,
        sku,
        warehouseId,
        quantity,
        unlimitedQuantity,
        dateUtcOnBalanceSystem,
        appKey,
        appToken,
        vtexIdToken
      )

      itemsResponses.push(response)
      sleep('0.1')
    }

    itemsResponses.map((element) =>
      element.type === '429'
        ? responseManager.errors429.push(element.item)
        : responseManager.updateResponse.push(element.item)
    )
    const data = await myOperations(ctx, responseManager)

    logger.log(
      {
        message: 'testEvent function testStock 3',
      },
      LogLevel.Info
    )

    if (data) {
      buildResponse(data, ctx)
    }
  } catch (error) {
    logger.log(
      {
        message: 'testEvent function testStock 4',
        request: error,
      },
      LogLevel.Info
    )
    buildServiceErrorResponse(error, ctx)
  }
}
