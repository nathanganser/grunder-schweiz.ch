<script setup lang="ts">
const { data: page } = await useAsyncData('categories', () => queryCollection('categories').first())
const { data: rankings } = await useAsyncData('category-rankings', () => queryCollection('rankings').all())

useSeoMeta({
  title: page.value?.title || 'Kategorien',
  ogTitle: page.value?.title || 'Kategorien',
  description: page.value?.description,
  ogDescription: page.value?.description
})

function rankingForCategory(slug: string) {
  return rankings.value?.find(ranking => ranking.category === slug)
}
</script>

<template>
  <UContainer class="py-12">
    <UPageHeader
      :title="page?.title || 'Kategorien'"
      :description="page?.description"
    />

    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <div
        v-for="category in page?.items || []"
        :key="category.slug"
        class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <UIcon
            :name="category.icon"
            class="size-5"
          />
        </div>
        <h2 class="mt-5 text-2xl font-semibold tracking-tight text-highlighted">
          {{ category.title }}
        </h2>
        <p class="mt-3 text-sm leading-7 text-muted">
          {{ category.intro }}
        </p>
        <p class="mt-4 text-sm text-muted">
          {{ category.audience }}
        </p>

        <UButton
          v-if="rankingForCategory(category.slug)"
          :to="rankingForCategory(category.slug)?.path"
          :label="category.primaryCta"
          trailing-icon="i-lucide-arrow-right"
          class="mt-6"
        />
      </div>
    </div>
  </UContainer>
</template>
