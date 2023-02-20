// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Person extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Person entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Person must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Person", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Person | null {
    return changetype<Person | null>(store.get("Person", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get secrets(): Array<string> | null {
    let value = this.get("secrets");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set secrets(value: Array<string> | null) {
    if (!value) {
      this.unset("secrets");
    } else {
      this.set("secrets", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Secret extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Secret entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Secret must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Secret", id.toString(), this);
    }
  }

  static load(id: string): Secret | null {
    return changetype<Secret | null>(store.get("Secret", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get _from(): Bytes {
    let value = this.get("_from");
    return value!.toBytes();
  }

  set _from(value: Bytes) {
    this.set("_from", Value.fromBytes(value));
  }

  get key(): string {
    let value = this.get("key");
    return value!.toString();
  }

  set key(value: string) {
    this.set("key", Value.fromString(value));
  }

  get date(): BigInt {
    let value = this.get("date");
    return value!.toBigInt();
  }

  set date(value: BigInt) {
    this.set("date", Value.fromBigInt(value));
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }
}
