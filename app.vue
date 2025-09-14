<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.grecaptcha-badge {
  visibility: hidden;
}

/* Page load animation */
.page-enter-active {
  animation: page-fade-in-up 0.6s ease-out;
}

@keyframes page-fade-in-up {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>