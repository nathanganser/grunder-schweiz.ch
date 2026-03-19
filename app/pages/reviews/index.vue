<script setup lang="ts">
const { data: reviews } = await useAsyncData('reviews-index', () => queryCollection('reviews').all())

useSeoMeta({
  title: 'Reviews',
  ogTitle: 'Reviews',
  description: 'Tool-Reviews fuer Rechnungs-, Buchhaltungs- und Admin-Software mit Blick auf Schweizer Freelancer.',
  ogDescription: 'Tool-Reviews fuer Rechnungs-, Buchhaltungs- und Admin-Software mit Blick auf Schweizer Freelancer.'
})
</script>

<template>
  <UContainer class="py-12">
    <UPageHeader
      title="Reviews"
      description="Einzelne Tool-Einordnungen fuer Schweizer Freelancer. Mit Disclosure, letztem Review-Datum und bewusst markierten Unsicherheiten."
    />

    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <NuxtLink
        v-for="review in reviews || []"
        :key="review.path"
        :to="review.path"
        class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30"
      >
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm font-medium text-highlighted">
            {{ review.tool_name }}
          </p>
          <span class="text-xs uppercase tracking-[0.22em] text-muted">
            {{ review.category }}
          </span>
        </div>

        <h2 class="mt-4 text-2xl font-semibold tracking-tight text-highlighted">
          {{ review.title }}
        </h2>
        <p class="mt-3 text-sm leading-7 text-muted">
          {{ review.description }}
        </p>
        <p class="mt-4 text-sm text-muted">
          Zuletzt geprueft: {{ new Date(review.last_reviewed).toLocaleDateString('de-CH', { year: 'numeric', month: 'short', day: 'numeric' }) }}
        </p>
      </NuxtLink>
    </div>
  </UContainer>
</template>
