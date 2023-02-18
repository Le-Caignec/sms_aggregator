import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ScretAdded } from "../generated/schema"
import { ScretAdded as ScretAddedEvent } from "../generated/SMS_Aggregator/SMS_Aggregator"
import { handleScretAdded } from "../src/sms-aggregator"
import { createScretAddedEvent } from "./sms-aggregator-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _from = Address.fromString("0x0000000000000000000000000000000000000001")
    let key = "Example string value"
    let date = BigInt.fromI32(234)
    let description = "Example string value"
    let newScretAddedEvent = createScretAddedEvent(
      _from,
      key,
      date,
      description
    )
    handleScretAdded(newScretAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ScretAdded created and stored", () => {
    assert.entityCount("ScretAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ScretAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ScretAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "key",
      "Example string value"
    )
    assert.fieldEquals(
      "ScretAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "date",
      "234"
    )
    assert.fieldEquals(
      "ScretAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
