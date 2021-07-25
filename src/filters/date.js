export default value => {
  const date = new Date(value) 
  return date.toLocaleDateString(['ru-RU'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
}