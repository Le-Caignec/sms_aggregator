import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { ScretAdded } from "../generated/SMS_Aggregator/SMS_Aggregator"

export function createScretAddedEvent(
  _from: Address,
  key: string,
  date: BigInt,
  description: string
): ScretAdded {
  let scretAddedEvent = changetype<ScretAdded>(newMockEvent())

  scretAddedEvent.parameters = new Array()

  scretAddedEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  scretAddedEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromString(key))
  )
  scretAddedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )
  scretAddedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )

  return scretAddedEvent
}
