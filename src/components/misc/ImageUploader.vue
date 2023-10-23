<template>
  <div class="col image-uploader-container" :style="`width: ${size + 25}px;`">
    <span>Foto de Perfil</span>

    <q-avatar
      :size="size + 'px'"
      color="white"
      style="position: relative"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div v-show="hover" class="upload-hover" @click="openFileDialog">
        <q-icon :size="`${size * 0.25}px`" name="fa-solid fa-cloud-arrow-up" />
      </div>
      <img v-if="base64" :src="base64" />
      <img v-else :src="defaultImageSrc" />
    </q-avatar>
    <input ref="input" type="file" v-show="false" @change="teste" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      hover: false,
    }
  },
  methods: {
    openFileDialog() {
      this.$refs.input.click()
    },
    teste(e: Event): void {
      const file = e.target?.files[0]
      if (file) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.base64 = reader.result?.toString()
        }
        reader.onerror = () => {
          this.base64 = null
        }
      } else {
        this.base64 = null
      }
    },
  },
  computed: {
    base64: {
      get() {
        return this.modelValue
      },
      set(val: string | null) {
        this.$emit('update:modelValue', val)
      },
    },
    defaultImageSrc(): string {
      const url = new URL('/src/assets/default_user.svg', import.meta.url)
      return url.toString()
    },
  },
})
</script>
<style scoped>
.upload-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: var(--q-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.image-uploader-container {
  border: 1px solid rgba(0, 0, 0, 0.24);
  padding: 10px 12px;
  border-radius: 4px;
}
.image-uploader-container span {
  color: rgba(0, 0, 0, 0.6);
  letter-spacing: 0.00937em;
  line-height: 20px;
  font-size: 14px;
}
.image-uploader-container .q-avatar {
  margin-top: 12px;
  outline: 1px solid rgba(0, 0, 0, 0.24);
}
</style>
