---
layout: '../../layouts/Note.astro'
title: 'Hello'
description: 'a test post'
pubDate: 'Aug 27 2022'
---

Hello, welcome to my notes space!

```ts twoslash
interface IdLabel {
  id: number /* some fields */
}
interface NameLabel {
  name: string /* other fields */
}
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel
// This comment should not be included

// ---cut---
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw 'unimplemented'
}

let a = createLabel('typescript')
//  ^?
```
