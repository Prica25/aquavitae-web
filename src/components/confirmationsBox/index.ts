import { openDialog } from 'vue3-promise-dialog'

import Delete from './delete.vue'
import Save from './save.vue'
import Cancel from './cancel.vue'

const confirmationsBox = {
  delete: Delete,
  save: Save,
  cancel: Cancel,
}

export default function (type: String) {
  return openDialog(confirmationsBox[type])
}
