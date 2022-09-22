import { defineComponent } from '../../vue'

export const SchemaOrgDebug = defineComponent({
  name: 'SchemaOrgDebug',
  props: {
    console: {
      type: Boolean,
      default: false,
    },
    data() {
      return {
        schemaRaw: '',
        observer: MutationObserver

      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let $el = document.querySelector('script[data-id="schema-org-graph"]')
      if (!$el)
        return

      const fetchSchema = () => {
        $el = document.querySelector('script[data-id="schema-org-graph"]')
        this.schemaRaw = $el?.textContent || ''
      }

      // Create an observer instance linked to the callback function
      this.observer = new MutationObserver(fetchSchema)

      // Start observing the target node for configured mutations
      this.observer.observe(document.body, {
        childList: true,
        characterData: true,
        attributes: true,
        subtree: true,
      })

      fetchSchema()
    })
  },
  beforeUnmount() {
    this.observer?.disconnect()
  },
  watch: {
    schemaRaw(val: any) {
      // eslint-disable-next-line no-console
      if ((this as any).props.console) {
        console.info('[SchemaOrgDebug]', JSON.parse(val))
      }
    },
  },
  template: `
  <div style="display: inline-block">
    <div style=" background-color: #282839; color: #c5c6c9; padding: 5px;border-radius: 5px;width: 900px;height: 600px; overflow-y: auto; box-shadow: 3px 4px 15px rgb(0 0 0 / 10%)">
      <pre style="test-align:left">
         {{schemaRaw}}
      </pre>
    </div>
  </div>
  `,
})
