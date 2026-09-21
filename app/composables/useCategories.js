export function useCategories() {
  const items = ref([])
  const search = ref('')
  const loading = ref(false)
  const error = ref('')

  const filtered = computed(() =>
    items.value.filter(i =>
      i.name.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  async function load() {
    loading.value = true
    error.value = ''
    try {
      items.value = await $fetch('/api/admin/categories/')
    } catch {
      error.value = 'Не удалось загрузить категории'
    } finally {
      loading.value = false
    }
  }


  function remove(id) {
    console.log('Удалить категорию', id)
  } 
    

  function edit(id) {
    console.log('Редактировать категорию', id)
  }

  return { items, search, filtered, loading, error, load, remove, edit }
}