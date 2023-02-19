import {
  ScretAdded as ScretAddedEvent,
  newPerson as newPersonEvent
} from "../generated/SMS_Aggregator/SMS_Aggregator"
import { ScretAdded, newPerson } from "../generated/schema"

export function handleScretAdded(event: ScretAddedEvent): void {
  let entity = new ScretAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._from = event.params._from
  entity.key = event.params.key
  entity.date = event.params.date
  entity.description = event.params.description

  entity.save()
}

export function handlenewPerson(event: newPersonEvent): void {
  let entity = new newPerson(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._from = event.params._from

  entity.save()
}
