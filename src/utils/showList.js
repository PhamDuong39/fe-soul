export const paginationMeta = computed(() => {
  return (options, total, isEn) => {
    const start = (options.page - 1) * options.itemsPerPage + 1

    const end =
      options.itemsPerPage !== -1
        ? Math.min(options.page * options.itemsPerPage, total)
        : total

    if (isEn) {
      return `Showing ${start} to ${end} of ${total} entries`
    } else {
      return `Hiển thị từ ${start} đến ${end} của tổng số ${total} mục`
    }
  }
})
