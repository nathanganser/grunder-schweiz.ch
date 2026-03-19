<script setup lang="ts">
const { data: comparisons } = await useAsyncData('comparisons-index', () => queryCollection('comparisons').all())

useSeoMeta({
  title: 'Vergleiche',
  ogTitle: 'Vergleiche',
  description: 'Direkte Vergleiche fuer Schweizer Selbststaendige, die Software nicht nach Werbetext, sondern nach Alltagstauglichkeit auswaehlen wollen.',
  ogDescription: 'Direkte Vergleiche fuer Schweizer Selbststaendige, die Software nicht nach Werbetext, sondern nach Alltagstauglichkeit auswaehlen wollen.'
})
</script>

<template>
  <UContainer class="py-12">
    <UPageHeader
      title="Vergleiche"
      description="Direkte Gegenueberstellungen fuer Rechnungs-, Buchhaltungs- und Admin-Themen im Schweizer Freelancer-Alltag."
    >
      <template #headline>
        <UBadge
          label="Vergleiche"
          color="neutral"
          variant="subtle"
        />
      </template>
    </UPageHeader>

    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <NuxtLink
        v-for="comparison in comparisons || []"
        :key="comparison.path"
        :to="comparison.path"
        class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30"
      >
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tool in comparison.compared_tools"
            :key="tool"
            :label="tool"
            color="neutral"
            variant="subtle"
          />
        </div>

        <h2 class="mt-5 text-2xl font-semibold tracking-tight text-highlighted">
          {{ comparison.title }}
        </h2>
        <p class="mt-3 text-sm leading-7 text-muted">
          {{ comparison.description }}
        </p>

        <p class="mt-4 text-sm text-highlighted">
          {{ comparison.winner_by_use_case?.[0]?.winner || 'Vergleich ansehen' }}
        </p>
      </NuxtLink>
    </div>
  </UContainer>
</template>
