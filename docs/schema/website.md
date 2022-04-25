# Vue Schema.org WebSite

**Type**: `defineWebSite(webSite: WebSite)`

Describes a WebSite. Parent to WebPage.

## Useful Links

- [Schema.org WebSite](https://schema.org/WebSite)
- [Recommended Schema](/guide/how-it-works.html#recommended-schema)

## Recommended Manual Configuration

- **name**: Site name

### Minimal Example
```ts
useSchemaOrg([
  defineWebSite({
    name: 'My Site',
  }),
])
```

## Defaults

- **@type**: `WebSite`
- **@id**: `${canonicalHost}#website`
- **url**: `canonicalHost`
- **inLanguage**: `options.defaultLanguage` _(see: [global config](/guide/how-it-works.html#global-config))_
- **isPartOf**: WebSite reference
- **publisher**: Identity reference

## Type Definition

```ts
/**
 * A WebSite is a set of related web pages and other items typically served from a single web domain and accessible via URLs.
 */
export interface WebSite extends Thing {
  '@type': 'WebSite'
  /**
   * The site's home URL (excluding a trailing slash).
   */
  url?: string
  /**
   * The name of the website.
   */
  name: string
  /**
   * A description of the website (e.g., the site's tagline).
   */
  description?: string
  /**
   * A reference-by-ID to the Organization which publishes the WebSite
   * (or an array of Organization and Person in the case that the website represents an individual).
   */
  publisher?: Arrayable<IdReference|Person|Organization>
  /**
   * A SearchAction object describing the site's internal search.
   */
  potentialAction?: (SearchAction|unknown)[]
  /**
   * The language code for the WebSite; e.g., en-GB.
   * If the website is available in multiple languages, then output an array of inLanguage values.
   */
  inLanguage?: Arrayable<string>
}
```