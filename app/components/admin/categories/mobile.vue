<script setup>
const { sorted, search, sort, loading, error, load, remove, openCreate, startEdit } = useCategories()
onMounted(load)


</script>

<template>
  <div class="bg-[#f5f4ef] p-4 flex flex-col gap-4">
    <h1 class="text-[32px] font-extralight">Категории</h1>

    <input
      v-model="search"
      type="text"
      placeholder="Поиск"
      class="bg-white rounded-lg border border-black/50 p-4 text-base font-extralight w-full outline-none"
    >

    <button  @click="openCreate"  class="bg-[#66924a] rounded-lg border border-black/50 p-4 text-base font-extralight text-white w-full text-left">
      Добавить категорию
    </button>

    <select
      v-model="sort"
      class="bg-white rounded-lg border border-black/50 p-4 text-base font-extralight w-full"
    >      
    
      <option value="date-desc">Сначала новые</option>
      <option value="date-asc">Сначала старые</option>

      <option value="name-asc">Название А→Я</option>
      <option value="name-desc">Название Я→А</option>
      <option value="count-asc">Сначала меньше товаров</option>
      <option value="count-desc">Сначала больше товаров</option>
    </select> 

    <p v-if="loading">Загружаю...</p>
    <p v-if="error">{{ error }}</p>

    <div
      v-for="category in sorted "
      :key="category.id"
      class="bg-white rounded-lg border border-black/50 p-4 flex flex-col gap-4"
    >
      <h3 class="text-base font-extralight line-clamp-2 break-words">{{ category.name }}</h3>

      <img
        v-if="category.image"
        :src="`/${category.image}`"
        :alt="category.name"
        class="h-[156px] w-full object-cover"
      >

      <p class="text-base font-extralight line-clamp-2 break-words">{{ category.description || '*Описание отсутствует*' }}</p>

      <div class="flex justify-between text-base font-extralight">
        <span>Кол-во товаров</span>
        <span>{{ category.productsCount ?? 0 }}</span>
      </div>

      <div class="flex gap-4">
        <button
          class="flex-1 bg-[#924a4c] rounded-lg border border-black/50 p-4 text-white font-extralight"
          @click="remove(category.id)"
        >
          Удалить
        </button>
        <button
          class="flex-1 bg-[#4a9092] rounded-lg border border-black/50 p-4 text-white font-extralight"
          @click="startEdit(category)"
        >
          Редактировать
        </button>
      </div>

    </div>



  </div>
<AdminCategoriesModal />


</template>