export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
