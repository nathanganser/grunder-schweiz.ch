<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('legal').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Seite nicht gefunden', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <UContainer
    v-if="page"
    class="py-12 max-w-4xl"
  >
    <UPageHeader
      :title="page.title"
      :description="page.description"
    />

    <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
      <ContentRenderer :value="page" />
    </div>
  </UContainer>
</template>
