<script setup lang="ts">
const route = useRoute()

const items = computed(() => [{
  label: 'Kategorien',
  to: '/kategorien',
  active: route.path.startsWith('/kategorien')
}, {
  label: 'Bestenlisten',
  to: '/bestenlisten',
  active: route.path.startsWith('/bestenlisten')
}, {
  label: 'Vergleiche',
  to: '/vergleiche',
  active: route.path.startsWith('/vergleiche')
}, {
  label: 'Reviews',
  to: '/reviews',
  active: route.path.startsWith('/reviews')
}, {
  label: 'Methodik',
  to: '/methodik',
  active: route.path.startsWith('/methodik')
}, {
  label: 'Ratgeber',
  to: '/blog',
  active: route.path.startsWith('/blog')
}])
</script>

<template>
  <UHeader class="border-b border-default/70 bg-default/85 backdrop-blur supports-[backdrop-filter]:bg-default/75">
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-3"
      >
        <AppLogo class="w-8 h-8 shrink-0" />

        <div class="hidden sm:flex flex-col leading-tight">
          <span class="font-display text-sm font-semibold tracking-tight text-highlighted">
            Gründer Schweiz
          </span>
          <span class="text-xs text-muted">
            Repository und Guide fuer Schweizer Freelancer-Software
          </span>
        </div>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      class="hidden xl:flex"
    />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <div class="rounded-2xl border border-default bg-elevated/70 p-4 mb-6">
        <p class="text-sm font-medium text-highlighted">
          Redaktioneller Einstieg
        </p>
        <p class="mt-1 text-sm text-muted">
          Kategorien, Guides, Reviews und transparente Einordnung fuer Schweizer Selbststaendige.
        </p>
      </div>

      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
