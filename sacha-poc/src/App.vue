<template>
  <v-app>
    <v-main>
      <ClinicalScore/>
    </v-main>
  </v-app>
</template>

<script>
import ClinicalScore from './components/ClinicalScore';

export default {
  name: 'App',

  components: {
    ClinicalScore,
  },

  data: () => ({
    //
  }),
};
</script>
