// composables/useImagesManager.js
//
// Хранит картинки одной формы (категория или товар) до момента сохранения.
// Каждая картинка — объект: { id, isNew, path, file, previewUrl }
//   isNew = false  → картинка уже на сервере, path — её ссылка, её и показываем
//   isNew = true   → картинка выбрана только что, file — сам файл,
//                    previewUrl — временная ссылка для превью в браузере

import { reactive } from 'vue'

export function useImagesManager() {
  let nextId = 1
  const images = reactive([])

  // Заполнить список уже существующими картинками (при открытии редактирования)
  function setExistingImages(paths) {
    clear()
    for (const path of paths) {
      images.push({ id: nextId++, isNew: false, path, previewUrl: path })
    }
  }

  // Пользователь выбрал новые файлы через <input type="file">
  function addNewFiles(fileList) {
    for (const file of fileList) {
      images.push({
        id: nextId++,
        isNew: true,
        file,
        previewUrl: URL.createObjectURL(file)
      })
    }
  }

  // Поменять картинку местами с соседней: direction = -1 (влево) или 1 (вправо)
  function moveImage(index, direction) {
    const otherIndex = index + direction
    if (otherIndex < 0 || otherIndex >= images.length) return

    const temp = images[index]
    images[index] = images[otherIndex]
    images[otherIndex] = temp
  }

  // Удалить картинку по индексу
  function removeImage(index) {
    const [removed] = images.splice(index, 1)
    if (removed.isNew) {
      URL.revokeObjectURL(removed.previewUrl)
    }
  }

  // Очистить всё (при открытии формы создания новой записи)
  function clear() {
    for (const img of images) {
      if (img.isNew) URL.revokeObjectURL(img.previewUrl)
    }
    images.splice(0, images.length)
  }

  // Файлы, которые ещё нужно загрузить на сервер
  function getNewFiles() {
    return images.filter(img => img.isNew).map(img => img.file)
  }

  // После загрузки сервер вернул пути новых файлов в том же порядке,
  // в котором мы их отправляли (getNewFiles()). Собираем итоговый список
  // путей с учётом порядка, который выставил пользователь стрелками.
  function buildFinalPathsList(uploadedPaths) {
    let uploadedIndex = 0
    return images.map((img) => {
      if (img.isNew) {
        const path = uploadedPaths[uploadedIndex]
        uploadedIndex++
        return path
      }
      return img.path
    })
  }

  return {
    images,
    setExistingImages,
    addNewFiles,
    moveImage,
    removeImage,
    clear,
    getNewFiles,
    buildFinalPathsList
  }
}