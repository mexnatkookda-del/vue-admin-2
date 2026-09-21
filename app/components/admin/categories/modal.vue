<script setup>
const { isModalOpen, editing, form, closeModal, save } = useCategories()
</script>

<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
  >
    <div class="bg-[#f5f4ef] rounded-2xl p-4 w-full max-w-md flex flex-col gap-4">
      <div class="border-b border-black pb-4 flex items-center justify-between">
        <h2 class="text-[32px] font-extralight">
          {{ editing ? 'Редактировать' : 'Новая категория' }}
        </h2>
        <button @click="closeModal" class="w-12 h-12 flex items-center justify-center hover:opacity-70">
          <img src="/close.svg" class="w-5 h-5" alt="Закрыть">
        </button>
      </div>

      <label class="text-base font-extralight">Название</label>
      <input
        v-model="form.name"
        placeholder="Название категории"
        class="bg-white rounded-lg border border-black/50 p-4 text-base font-extralight w-full outline-none"
      >

      <label class="text-base font-extralight">Описание</label>
      <textarea
        v-model="form.description"
        placeholder="Описание"
        rows="3"
        class="bg-white rounded-lg border border-black/50 p-4 text-base font-extralight w-full outline-none resize-none"
      ></textarea>

      <label class="text-base font-extralight">Картинка (имя файла)</label>
      <input
        v-model="form.image"
        placeholder="cloth.jpg"
        class="bg-white rounded-lg border border-black/50 p-4 text-base font-extralight w-full outline-none"
      >

      <div class="flex gap-4">
        <button
          @click="closeModal"
          class="flex-1 bg-[#924a4c] rounded-lg border border-black/50 p-4 text-white font-extralight"
        >
          Отменить
        </button>
        <button
          @click="save"
          class="flex-1 bg-[#4a9092] rounded-lg border border-black/50 p-4 text-white font-extralight"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>