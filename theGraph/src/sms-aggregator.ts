import { ScretAdded as ScretAddedEvent } from "../generated/SMS_Aggregator/SMS_Aggregator"
import { ScretAdded } from "../generated/schema"

export function handleScretAdded(event: ScretAddedEvent): void {
  let entity = new ScretAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._from = event.params._from
  entity.key = event.params.key
  entity.date = event.params.date
  entity.description = event.params.description

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
