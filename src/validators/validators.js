export const validators = {
  methods: {
    lotinIsValid(val) {
      if (!val) return true
      // Latin text validation - only allows Latin characters, numbers, and common punctuation
      const latinPattern = /^[a-zA-Z0-9\s.,!?;:'"()\-_@#$%&*+=<>\/\\[\]{}|~`^]+$/
      return latinPattern.test(val) || this.$t('only_latin_characters_allowed') || 'Only Latin characters allowed'
    }
  }
}
