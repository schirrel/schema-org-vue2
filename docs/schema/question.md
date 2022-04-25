# Vue Schema.org Question

**Type**: `defineQuestion(question: Question)`

Describes an individual question. Most commonly used for creating an FAQ type page.

## Useful Links

- [Schema.org Question](https://schema.org/Question)
- [Recipe: FAQ](/guide/recipes/faq)

## Recommended Manual Configuration

- **name**: `string` - The text content of the question.
- **acceptedAnswer**: `string|Answer` The text content of the answer.

### Minimal Example
```ts
useSchemaOrg([
  defineQuestion({
    name: 'Harlan Wilton',
    image: '/me.png',
  }),
])
```

## Defaults

- **@type**: `Question`
- **@id**: `${canonicalUrl}#/schema/question/${questionId}`
- **inLanguage**: `options.defaultLanguage` _(see: [global config](/guide/how-it-works.html#global-config))_

## Resolves

- will convert a string answer to an [Answer](https://schema.org/Answer) object.
- `@id` is resolved using a hash of the question name if not provided

## Relation Transforms

[WebPage](/schema/webpage)

- Each question will append an entry on to `mainEntity`

## Type Definition

```ts
/**
 * A specific question - e.g. from a user seeking answers online, or collected in a Frequently Asked Questions (FAQ) document.
 */
export interface Question extends Thing {
  /**
   * The text content of the question.
   */
  name: string
  /**
   * An answer object, with a text property which contains the answer to the question.
   */
  acceptedAnswer: Answer|string
  /**
   * The language code for the question; e.g., en-GB.
   */
  inLanguage?: string
}

/**
 * An answer offered to a question; perhaps correct, perhaps opinionated or wrong.
 */
export interface Answer extends Optional<Thing, '@id'> {
  text: string
}
```