<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
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

const emit = defineEmits(['toggle', 'save'])

function cancel() {
  emit('toggle', false)
}

const code = ref('')
function save() {
  emit('toggle', false)
  emit('save', code.value)
}
</script>

<template>
  <Dialog :visible="props.dialogOpen" modal header="Configure Validation">
    <div class="flex flex-col gap-2">
      <label for="code"
        >Predicate function to validate the value of <code>{{ props.name }}</code></label
      >
      <Textarea
        id="code"
        v-model="code"
        rows="5"
        cols="30"
        aria-describedby="code-help"
        placeholder="return value.startsWith('A')"
      />
      <small id="code-help">
        Write the body of the function which signature is: <br />
        <code>async function(value: {{ props.type }}): boolean</code> <br />
        Note that the function will only apply to the rows that have a value.
      </small>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="cancel"></Button>
      <Button type="button" label="Save" @click="save"></Button>
    </div>
  </Dialog>
</template>
