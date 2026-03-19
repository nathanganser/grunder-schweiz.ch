<script setup lang="ts">
const { data: rankings } = await useAsyncData('rankings-index', () => queryCollection('rankings').all())

useSeoMeta({
  title: 'Bestenlisten',
  ogTitle: 'Bestenlisten',
  description: 'Seed-Rankings und Shortlists fuer Freelancer-Software in der Schweiz.',
  ogDescription: 'Seed-Rankings und Shortlists fuer Freelancer-Software in der Schweiz.'
})
</script>

<template>
  <UContainer class="py-12">
    <UPageHeader
      title="Bestenlisten"
      description="Unsere ersten Ranking-Starts fuer Schweizer Freelancer-Software. Jede Liste ist bewusst redaktionell, transparent und bei offenen Punkten klar markiert."
    />

    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      <NuxtLink
        v-for="ranking in rankings || []"
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
          Top Pick: {{ ranking.topPick?.name || 'noch pruefen' }}
        </p>
      </NuxtLink>
    </div>
  </UContainer>
</template>
