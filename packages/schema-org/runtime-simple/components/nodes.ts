import { defineComponent } from '../../vue'
import { useSchemaOrg } from '../composables/useSchemaOrg'
import {
  defineArticle,
  defineBook, defineBreadcrumb,
  defineComment,
  defineCourse, defineEvent,
  defineHowTo,
  defineImage,
  defineItemList, defineLocalBusiness,
  defineMovie, defineOrganization,
  definePerson,
  defineProduct,
  defineQuestion,
  defineRecipe,
  defineReview,
  defineSoftwareApp,
  defineVideo,
  defineWebPage,
  defineWebSite,
}
  from '../provider'

const shallowVNodesToText = (nodes: any) => {
  let text = ''
  for (const node of nodes) {
    if (typeof node.children === 'string')
      text += node.children.trim()
  }
  return text
}

const fixKey = (s: string) => {
  // kebab case to camel case
  let key = s.replace(/-./g, x => x[1].toUpperCase())
  // supports @type & @id
  if (key === 'type' || key === 'id')
    key = `@${key}`
  return key
}

const ignoreKey = (s: string) => {
  // pretty hacky, need to setup all props
  if (s.startsWith('aria-') || s.startsWith('data-'))
    return false

  return ['class', 'style'].includes(s)
}

export const defineSchemaOrgComponent = (name: string, defineFn: (input: any) => any) => {
  return defineComponent({
    name,
    data() {
      return {
        node: null,
      }
    },
    props: {
      as: String,
    },
    computed: {
      componentType(): string {
        return (this as any).as || 'div'
      },
      nodePartial() {
        const val: Record<string, any> = {}
        Object.entries((this as any).$attrs).forEach(([key, value]) => {
          if (!ignoreKey(key)) {
            // keys may be passed with kebab case, and they aren't transformed
            val[fixKey(key)] = value
          }
        })
        // only render vnodes while we don't have a node
        if (!(this as any).node) {
          // iterate through slots
          for (const [key, slot] of Object.entries((this as any).$slots)) {
            if (!slot || key === 'default')
              continue
            // allow users to provide data via slots that aren't rendered
            val[fixKey(key)] = shallowVNodesToText((this as any).$slots((this as any).props))
          }
        }
        return val
      }
    },
    mounted() {

      // may not be available
      if (defineFn) {
        // register via main schema composable for route watching
        useSchemaOrg(this, [defineFn(this.nodePartial)])
      }
    },
    template: `
        <component :is='componentType'>
            <slot v-bind="nodePartial"/>
        </component>
        `,
  })
}

export const SchemaOrgArticle = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgArticle', defineArticle)
export const SchemaOrgBreadcrumb = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgBreadcrumb', defineBreadcrumb)
export const SchemaOrgComment = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgComment', defineComment)
export const SchemaOrgEvent = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgEvent', defineEvent)
export const SchemaOrgHowTo = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgHowTo', defineHowTo)
export const SchemaOrgImage = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgImage', defineImage)
export const SchemaOrgLocalBusiness = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgLocalBusiness', defineLocalBusiness)
export const SchemaOrgOrganization = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgOrganization', defineOrganization)
export const SchemaOrgPerson = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgPerson', definePerson)
export const SchemaOrgProduct = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgProduct', defineProduct)
export const SchemaOrgQuestion = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgQuestion', defineQuestion)
export const SchemaOrgRecipe = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgRecipe', defineRecipe)
export const SchemaOrgReview = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgReview', defineReview)
export const SchemaOrgVideo = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgVideo', defineVideo)
export const SchemaOrgWebPage = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgWebPage', defineWebPage)
export const SchemaOrgWebSite = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgWebSite', defineWebSite)
export const SchemaOrgMovie = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgMovie', defineMovie)
export const SchemaOrgCourse = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgCourse', defineCourse)
export const SchemaOrgItemList = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgItemList', defineItemList)
export const SchemaOrgBook = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgBook', defineBook)
export const SchemaOrgSoftwareApp = /* @__PURE__ */ defineSchemaOrgComponent('SchemaOrgSoftwareApp', defineSoftwareApp)
