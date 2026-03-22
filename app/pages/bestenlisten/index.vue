<script setup lang="ts">
const { data: rankings } = await useAsyncData('rankings-index', () => queryCollection('rankings').all())

const selectedCategory = ref('all')
const categories = computed(() => {
  const cats = new Set((rankings.value || []).map(r => r.category))
  return ['all', ...Array.from(cats)]
})
const filteredRankings = computed(() => {
  if (selectedCategory.value === 'all') return rankings.value || []
  return (rankings.value || []).filter(r => r.category === selectedCategory.value)
})
const categoryLabels: Record<string, string> = {
  all: 'Alle',
  rechnungen: 'Rechnungen',
  buchhaltung: 'Buchhaltung',
  banking: 'Banking',
  zeiterfassung: 'Zeiterfassung'
}

useSeoMeta({
  title: 'Bestenlisten',
  ogTitle: 'Bestenlisten',
  description: 'Redaktionelle Rankings für Freelancer-Software in der Schweiz. Magic Heidi führt aktuell bei Rechnungen und leichter Buchhaltung.',
  ogDescription: 'Redaktionelle Rankings für Freelancer-Software in der Schweiz. Magic Heidi führt aktuell bei Rechnungen und leichter Buchhaltung.'
})
</script>

<template>
  <UContainer class="py-12">
    <UPageHeader
      title="Bestenlisten"
      description="Redaktionelle Rankings für Schweizer Freelancer-Software. Wo unsere Kriterien klar auf einen Gewinner zeigen, benennen wir ihn offen."
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

    <div class="mt-6 grid gap-6 lg:grid-cols-3">
      <NuxtLink
        v-for="ranking in filteredRankings"
        :key="ranking.path"
        :to="ranking.path"
        class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30"
      >
        <p class="text-xs uppercase tracking-[0.22em] text-muted">
          {{ ranking.category }}
        </p>
        <h2 class="mt-3 text-xl font-semibold tracking-tight text-highlighted">
          {{ ranking.title }}
        </h2>
        <p class="mt-3 text-sm leading-7 text-muted">
          {{ ranking.summary }}
        </p>
        <p class="mt-4 text-sm text-highlighted">
          Top Pick: {{ ranking.topPick?.name || 'noch prüfen' }}
        </p>
      </NuxtLink>
    </div>
  </UContainer>
</template>
