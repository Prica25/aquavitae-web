import { openDialog } from 'vue3-promise-dialog'
import Save from './save.vue'

export default function (options: Object) {
  return openDialog(Save, options)
}
