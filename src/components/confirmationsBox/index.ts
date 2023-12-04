import { openDialog } from 'vue3-promise-dialog'

import Delete from './delete.vue'
import Save from './save.vue'
import Cancel from './cancel.vue'
import Complete from './complete.vue'
import CancelAppointment from './cancelAppointment.vue'

const confirmationsBox = {
  delete: Delete,
  save: Save,
  cancel: Cancel,
  complete: Complete,
  cancelAppointment: CancelAppointment,
}

export default function (type: String) {
  return openDialog(confirmationsBox[type])
}
