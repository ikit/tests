poc<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form>
          <v-text-field v-model="size" label="Taille"></v-text-field>
          <v-text-field v-model="weight" label="Poids"></v-text-field>
          <v-text-field v-model="age" label="Age"></v-text-field>
          <v-btn color="primary" @click="getScore()">
            Calculer le score
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    
    <v-dialog v-model="displayScore" width="500">
      <v-card>
          <v-card-title class="headline grey lighten-2">
            Résultat
          </v-card-title>

          <v-card-text>
            Super ! Votre score est de {{ score }}.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="reset()">
              Fermer
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      size: null,
      weight: null,
      age: null,
      score: null,
      displayScore: false
    }),
    methods: {
      getScore() {
        this.score = (this.size + this.weight) / this.age;
        this.displayScore = true;
      },

      reset() {
        this.size = 0;
        this.weight = 0;
        this.age = 0;
        this.score = 0;
        this.displayScore = false;
      }
    }
  }
</script>
