<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) =>
      ['string', 'number', 'boolean', 'object', 'mixed', 'unknown'].includes(value)
  },
  dialogOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle'])

function setIsOpened(value) {
  emit('toggle', value)
}

const patternFilter = ref(false)
const pattern = ref('')
const apiFilter = ref(false)
const url = ref('')
</script>

<template>
  <Dialog
    :visible="props.dialogOpen"
    modal
    header="Configure Validation"
    :style="{ width: '25rem' }"
  >
    <InputGroup>
      <InputGroupAddon>
        <Checkbox v-model="patternFilter" :binary="true" />
      </InputGroupAddon>
      <InputText id="pattern" v-model="pattern" placeholder="Pattern" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <Checkbox v-model="apiFilter" :binary="true" />
      </InputGroupAddon>
      <InputText id="url" v-model="url" placeholder="URL" />
    </InputGroup>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="setIsOpened(false)"
      ></Button>
      <Button type="button" label="Save" @click="setIsOpened(false)"></Button>
    </div>
  </Dialog>
</template>
