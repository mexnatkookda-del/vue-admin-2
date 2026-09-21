export function useCategories() {
  const items = useState('admin-categories-items', () => [])
  const search = ref('')
  const loading = ref(false)
  const error = ref('')

  // сортировка одной строкой: поле-направление
  const sort = ref('date-desc')

  // модалка: editing = null → создаём, объект → правим
  const isModalOpen = useState('admin-categories-modal-open', () => false)
  const editing = useState('admin-categories-editing', () => null)
  const form = useState('admin-categories-form', () => ({
    name: '',
    description: '',
    image: ''
  }))

  const filtered = computed(() =>
    items.value
      .filter(i => i.id !== 1) // "Без категории" не показываем
      .filter(i => i.name.toLowerCase().includes(search.value.toLowerCase()))
  )

  const sorted = computed(() => {
    const [field, dirWord] = sort.value.split('-')
    const dir = dirWord === 'asc' ? 1 : -1
    const list = [...filtered.value]

    if (field === 'name') list.sort((a, b) => dir * a.name.localeCompare(b.name, 'ru'))
    if (field === 'count') list.sort((a, b) => dir * (a.productsCount - b.productsCount))
    if (field === 'date') list.sort((a, b) => dir * (new Date(a.createdAt) - new Date(b.createdAt)))

    return list
  })

  // для таблицы на планшете/десктопе: клик по заголовку колонки
  function toggleSort(field) {
    const [currentField, currentDir] = sort.value.split('-')
    sort.value = currentField === field
      ? `${field}-${currentDir === 'asc' ? 'desc' : 'asc'}`
      : `${field}-asc`
  }

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

  function openCreate() {
    editing.value = null
    form.value.name = ''
    form.value.description = ''
    form.value.image = ''
    isModalOpen.value = true
  }

  function startEdit(category) {
    editing.value = category
    form.value.name = category.name
    form.value.description = category.description || ''
    form.value.image = category.image || ''
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
  }

  async function save() {
    try {
      if (editing.value) {
        await $fetch(`/api/admin/categories/${editing.value.id}`, { method: 'PUT', body: form.value })
      } else {
        await $fetch('/api/admin/categories/', { method: 'POST', body: form.value })
      }
      
      await load()

      closeModal()
    } catch (e) {
      error.value = e?.data?.message || 'Не удалось сохранить'
    }
  }

  async function remove(id) {
    if (!confirm('Удалить категорию? Её товары перейдут в «Без категории».')) return
    try {
      await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      await load()
    } catch {
      error.value = 'Не удалось удалить категорию'
    }
  }

  return {
    items, search, sort, sorted, loading, error, load,
    toggleSort, openCreate, startEdit, closeModal, save, remove,
    isModalOpen, editing, form
  }
}