<!--
  CInput Component Usage Examples with Mask Validation

  Mask Pattern Characters:
  - # : Represents a digit (0-9)
  - A : Represents a letter (a-z, A-Z)
  - * : Represents any alphanumeric character (a-z, A-Z, 0-9)
  - Any other character: Literal character that must match exactly
-->

<template>
  <div>
    <!-- Example 1: Phone Number with Multiple Format Support -->
    <c-input
      v-model="phoneNumber"
      name="phone"
      label="Phone Number"
      :optionRule="true"
      :mask="phonePatterns"
    />

    <!-- Example 2: Credit Card Number -->
    <c-input
      v-model="creditCard"
      name="creditCard"
      label="Credit Card"
      :optionRule="true"
      :mask="['####-####-####-####', '#### #### #### ####']"
    />

    <!-- Example 3: License Plate (Multiple Formats) -->
    <c-input
      v-model="licensePlate"
      name="licensePlate"
      label="License Plate"
      :optionRule="true"
      :mask="['##A###AA', 'AA###AAA', '###AAA']"
    />

    <!-- Example 4: Time Format -->
    <c-input
      v-model="time"
      name="time"
      label="Time (HH:MM)"
      :mask="['##:##']"
    />

    <!-- Example 5: Product Code (Alphanumeric) -->
    <c-input
      v-model="productCode"
      name="productCode"
      label="Product Code"
      :mask="['***-***-###']"
    />

    <!-- Example 6: Without Mask (Default Behavior) -->
    <c-input
      v-model="freeText"
      name="freeText"
      label="Free Text Input"
      :optionRule="false"
    />
  </div>
</template>

<script>
import CInput from './CInput.vue'

export default {
  components: {
    CInput
  },
  data() {
    return {
      phoneNumber: '',
      creditCard: '',
      licensePlate: '',
      time: '',
      productCode: '',
      freeText: '',

      // Multiple phone patterns supported
      phonePatterns: [
        '+998(##)###-##-##',  // Uzbekistan format
        '+1(###)###-####',    // US format
        '###-###-####',       // Simple format
        '(###) ###-####'      // Alternative format
      ]
    }
  }
}
</script>
