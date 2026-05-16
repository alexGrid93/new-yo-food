export const getOptionsForSelect = (values: string[]) => {
  return values.map((value) => ({ value, label: value }))
}
