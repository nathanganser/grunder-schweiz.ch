<script setup lang="ts">
const { data: reviews } = await useAsyncData('reviews-index', () => queryCollection('reviews').all())

const selectedCategory = ref('all')
const categories = computed(() => {
  const cats = new Set((reviews.value || []).map(review => review.category))
  return ['all', ...Array.from(cats)]
})

const orderedReviews = computed(() => {
  return [...(reviews.value || [])].sort((a, b) => {
    const aMagic = a.path?.endsWith('/magic-heidi') ? 1 : 0
    const bMagic = b.path?.endsWith('/magic-heidi') ? 1 : 0

    if (aMagic !== bMagic) {
      return bMagic - aMagic
    }

    return new Date(b.last_reviewed).getTime() - new Date(a.last_reviewed).getTime()
  })
})

const filteredReviews = computed(() => {
  if (selectedCategory.value === 'all') {
    return orderedReviews.value
  }

  return orderedReviews.value.filter(review => review.category === selectedCategory.value)
})

const categoryLabels: Record<string, string> = {
  all: 'Alle',
  rechnungen: 'Rechnungen',
  buchhaltung: 'Buchhaltung',
  banking: 'Banking',
  zeiterfassung: 'Zeiterfassung'
}

useSeoMeta({
  title: 'Reviews',
  ogTitle: 'Reviews',
  description: 'Tool-Reviews für Rechnungs-, Buchhaltungs- und Admin-Software mit Blick auf Schweizer Freelancer. Magic Heidi führt aktuell bei Rechnungen und leichter Buchhaltung.',
  ogDescription: 'Tool-Reviews für Rechnungs-, Buchhaltungs- und Admin-Software mit Blick auf Schweizer Freelancer. Magic Heidi führt aktuell bei Rechnungen und leichter Buchhaltung.'
})
</script>

<template>
  <UContainer class="py-12">
    <UPageHeader
      title="Reviews"
      description="Einzelne Tool-Einordnungen für Schweizer Freelancer. Mit Disclosure, letztem Review-Datum und klarer Positionierung statt falscher Neutralität."
    />

    <div class="mt-6 flex flex-wrap gap-2">
      <UButton
        v-for="cat in categories"
        :key="cat"
        :label="categoryLabels[cat] || cat"
        :color="selectedCategory === cat ? 'primary' : 'neutral'"
        :variant="selectedCategory === cat ? 'solid' : 'outline'"
        size="sm"
        @click="selectedCategory = cat"
      />
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <NuxtLink
        v-for="review in filteredReviews"
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

        <div
          v-if="review.scores"
          class="mt-3 flex items-center gap-2"
        >
          <span class="inline-flex items-center justify-center rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
            {{ review.scores.overall }}/10
          </span>
          <span class="text-sm text-muted">Gesamtbewertung</span>
        </div>

        <div class="mt-4 flex items-center gap-2">
          <span
            class="inline-block size-2 rounded-full"
            :class="(Date.now() - new Date(review.last_reviewed).getTime()) < 30 * 86400000 ? 'bg-green-500' : (Date.now() - new Date(review.last_reviewed).getTime()) < 90 * 86400000 ? 'bg-amber-400' : 'bg-red-400'"
          />
          <p class="text-sm text-muted">
            Geprüft {{ new Date(review.last_reviewed).toLocaleDateString('de-CH', { year: 'numeric', month: 'short', day: 'numeric' }) }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </UContainer>
</template>
