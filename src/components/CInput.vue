<template>
  <q-field
    v-model="model"
    :rules="componentRule"
    borderless
    color="eablue"
    class="full-width apply-text-field"
    style="height: 56px;"
  >
    <q-input
      outlined
      clearable
      clear-icon="close"
      v-model="model"
      :dense="true"
      :label="label"
      :c-id="cId"
      :c-formula="cFormula"
      :readonly="editable"
      :class="cssClass"
      :name="name"
      @input="onInput"
      @keypress="onKeyPress"
    >
      <q-tooltip anchor="top middle" self="bottom middle" class="font-14" :offset="[10, 10]">
        {{label}}
      </q-tooltip>
    </q-input>
  </q-field>
</template>

<script>
import {validators} from "src/validators/validators";

export default {
  name: 'CInput',
  mixins: [validators],
  props: {
    cssClass: {},
    value: {
      required: true
    },
    name: {
      required: true
    },
    label: {
      type: String,
      required: true
    },
    optionRule: {
      default: false
    },
    lotinText: {
      default: false
    },
    cId: {
      type: String
    },
    cFormula: {
      type: String
    },
    disable: {
      default: false
    },
    mask: {
      type: Array,
      default: null,
      required: false
    }
  },
  data() {
    return {
      model: this.value,
      editable: this.disable === true,
      previousValidValue: this.value || ''
    }
  },
  computed: {
    componentRule() {
      let rules = []

      if (this.optionRule === true) {
        rules.push(val => val !== null && val !== '' || this.$t('this_input_is_required'))

        if (this.lotinText === true) {
          rules.push(this.lotinIsValid)
        }
      }

      if (this.mask && this.mask.length > 0) {
        rules.push(this.validateMask)
      }

      return rules
    }
  },
  watch: {
    value(newVal) {
      this.model = newVal
    },
    model(newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    validateMask(val) {
      if (!this.mask || this.mask.length === 0 || !val || val === '') {
        return true
      }

      const isValid = this.mask.some(maskPattern => this.matchesMask(val, maskPattern))

      if (!isValid) {
        return this.$t('input_does_not_match_required_format') || 'Input does not match required format'
      }

      return true
    },

    matchesMask(value, maskPattern) {
      if (!maskPattern || value.length !== maskPattern.length) {
        return false
      }

      for (let i = 0; i < maskPattern.length; i++) {
        const maskChar = maskPattern[i]
        const valueChar = value[i]

        if (!this.charMatchesMask(valueChar, maskChar)) {
          return false
        }
      }

      return true
    },

    charMatchesMask(char, maskChar) {
      switch (maskChar) {
        case '#':
          return /\d/.test(char)
        case 'A':
          return /[a-zA-Z]/.test(char)
        case '*':
          return /[a-zA-Z0-9]/.test(char)
        default:
          return char === maskChar
      }
    },

    partiallyMatchesMask(value, maskPattern) {
      if (!maskPattern || value.length > maskPattern.length) {
        return false
      }

      for (let i = 0; i < value.length; i++) {
        const maskChar = maskPattern[i]
        const valueChar = value[i]

        if (!this.charMatchesMask(valueChar, maskChar)) {
          return false
        }
      }

      return true
    },

    isPartiallyValid(value) {
      if (!this.mask || this.mask.length === 0 || !value || value === '') {
        return true
      }

      return this.mask.some(maskPattern => this.partiallyMatchesMask(value, maskPattern))
    },

    onInput(value) {
      if (this.mask && this.mask.length > 0 && value) {
        if (!this.isPartiallyValid(value)) {
          this.$nextTick(() => {
            this.model = this.previousValidValue
          })
        } else {
          this.previousValidValue = value
        }
      } else {
        this.previousValidValue = value || ''
      }
    },

    onKeyPress(event) {
      if (!this.mask || this.mask.length === 0) {
        return
      }

      const currentValue = this.model || ''
      const cursorPos = event.target.selectionStart
      const newChar = event.key

      if (newChar.length !== 1) {
        return
      }

      const potentialValue = currentValue.slice(0, cursorPos) + newChar + currentValue.slice(cursorPos)

      if (!this.isPartiallyValid(potentialValue)) {
        event.preventDefault()
      }
    }
  }
}
</script>
