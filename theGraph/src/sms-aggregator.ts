import {
  SecretAdded as SecretAddedEvent
} from "../generated/SMS_Aggregator/SMS_Aggregator"
import { Secret, Person } from "../generated/schema"

export function handleSecretAdded(event: SecretAddedEvent): void {
  //person
  let person = Person.load(event.params._from);
  if (!person) {
    person = new Person(event.params._from)
  }
  person.save()
  
  //secret
  let secret = new Secret(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  secret._from = event.params._from
  secret.key = event.params.key
  secret.date = event.params.date
  secret.description = event.params.description

  secret.save()
}
