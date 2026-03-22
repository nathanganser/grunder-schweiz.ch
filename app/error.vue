<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'de-CH'
  }
})

useSeoMeta({
  title: 'Seite nicht gefunden',
  description: 'Die angeforderte Seite konnte nicht gefunden werden.'
})

const links = [{
  label: 'Startseite',
  icon: 'i-lucide-house',
  to: '/'
}, {
  label: 'Bestenlisten',
  icon: 'i-lucide-list',
  to: '/bestenlisten'
}, {
  label: 'Ratgeber',
  icon: 'i-lucide-newspaper',
  to: '/blog'
}, {
  label: 'Methodik',
  icon: 'i-lucide-badge-info',
  to: '/methodik'
}]
</script>

<template>
  <div>
    <AppHeader />

    <UMain class="py-16">
      <UContainer class="max-w-3xl">
        <div class="rounded-3xl border border-default bg-default/80 p-8 shadow-sm">
          <UBadge
            label="404"
            color="neutral"
            variant="subtle"
            class="mb-4"
          />
          <h1 class="font-display text-4xl font-semibold tracking-tight text-highlighted">
            Diese Seite existiert nicht oder wurde verschoben.
          </h1>
          <p class="mt-4 text-base leading-7 text-muted">
            Wir bauen Gründer Schweiz gerade als Review- und Ranking-Portal für Schweizer Freelancer um. Über diese Einstiege findest du schnell zur aktuellen Struktur.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <UButton
              v-for="link in links"
              :key="link.to"
              :label="link.label"
              :icon="link.icon"
              :to="link.to"
              color="neutral"
              variant="outline"
            />
          </div>
        </div>
      </UContainer>
    </UMain>

    <AppFooter />

    <UToaster />
  </div>
</template>
