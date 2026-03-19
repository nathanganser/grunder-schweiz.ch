<script setup lang="ts">
const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
const { data: posts } = await useAsyncData('articles', () => queryCollection('articles').order('date', 'DESC').all())

const title = page.value?.seo?.title || page.value?.title || 'Ratgeber'
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <UContainer class="py-12">
    <UPageHeader
      :title="page?.title || 'Ratgeber'"
      :description="page?.description"
    >
      <template #headline>
        <UBadge
          label="Ratgeber"
          color="neutral"
          variant="subtle"
        />
      </template>
    </UPageHeader>

    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <NuxtLink
        v-for="post in posts || []"
        :key="post.path"
        :to="post.path"
        class="group rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:bg-default"
      >
        <div class="flex items-center justify-between gap-4">
          <UBadge
            :label="post.badge?.label || 'Artikel'"
            color="neutral"
            variant="subtle"
          />
          <time class="text-sm text-muted">
            {{ new Date(post.date).toLocaleDateString('de-CH', { year: 'numeric', month: 'short', day: 'numeric' }) }}
          </time>
        </div>

        <h2 class="mt-5 text-2xl font-semibold tracking-tight text-highlighted">
          {{ post.title }}
        </h2>
        <p class="mt-3 text-sm leading-7 text-muted">
          {{ post.description }}
        </p>
      </NuxtLink>
    </div>
  </UContainer>
</template>
