<script setup>
defineProps({
  manager: { type: Object, required: true },
  label: { type: String, default: 'Изображения' }
})

function onFileChange(event, manager) {
  manager.addNewFiles(event.target.files)
  event.target.value = ''
}
</script>

<template>
  <div>
    <label class="text-base font-extralight">{{ label }}</label>

    <p v-if="manager.images.length === 0" class="text-xs text-black/40 mt-2 mb-3">
      Нет изображений
    </p>

    <div v-else class="flex flex-wrap gap-3 mt-2 mb-3">
      <div
        v-for="(image, index) in manager.images"
        :key="image.id"
        class="relative w-24 rounded-lg border p-1 bg-white"
        :class="index === 0 ? 'border-[#4a9092]' : 'border-black/20'"
      >
        <span
          v-if="index === 0"
          class="absolute top-1 left-1 z-10 bg-[#4a9092] text-white text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded"
        >
          Обложка
        </span>

        <img :src="image.previewUrl" class="w-full h-16 object-cover rounded" alt="">

        <div class="flex gap-1 mt-1">
          <button
            type="button"
            :disabled="index === 0"
            title="Влево"
            class="flex-1 h-6 rounded border border-black/20 text-xs disabled:opacity-30 hover:bg-black/5"
            @click="manager.moveImage(index, -1)"
          >
            ◀
          </button>
          <button
            type="button"
            :disabled="index === manager.images.length - 1"
            title="Вправо"
            class="flex-1 h-6 rounded border border-black/20 text-xs disabled:opacity-30 hover:bg-black/5"
            @click="manager.moveImage(index, 1)"
          >
            ▶
          </button>
          <button
            type="button"
            title="Удалить"
            class="flex-1 h-6 rounded border border-black/20 text-xs text-[#924a4c] hover:bg-[#924a4c]/10"
            @click="manager.removeImage(index)"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <input
      type="file"
      accept="image/*"
      multiple
      class="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:border-black/30 file:bg-white file:text-sm file:font-extralight file:cursor-pointer"
      @change="onFileChange($event, manager)"
    >
  </div>
</template>