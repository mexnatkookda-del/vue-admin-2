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


  /*
  function remove(id) {
    console.log('Удалить категорию', id)
  } 
    
  ниже вариант от гемини
*/

  async function remove(id) {
    if (!confirm('Удалить эту категорию?')) return

    error.value = ''
    try {
      await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      items.value = items.value.filter(item => item.id !== id)
    } catch {
      error.value = 'Не удалось удалить категорию'
    }
  } 

  function edit(id) {
    console.log('Редактировать категорию', id)
  }

  return { items, search, filtered, loading, error, load, remove, edit }
}