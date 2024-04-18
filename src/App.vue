<script setup>

  import {ref, reactive} from 'vue'
  import Alerta from './components/Alerta.vue'
  import Spiner from './components/Spiner.vue'
  import Cotizacion from './components/Cotizacion.vue'
  import useCripto from './composables/useCripto'


  const {monedas, criptomonedas, cargando,cotizacion, obtenerCotizacion, mostrarResultado} = useCripto()

  const error = ref('')

  const cotizar = reactive({
    moneda: '',
    criptomoneda: '',
  })


  const cotizarCripto = () => {
    // validar que la variable cotizar esté lleno
    if(Object.values(cotizar).includes('')){
      
      error.value = 'Todos los campos son obligatorios'

      //despues de 3 segundos desaparece
      setTimeout(() => {
        error.value = ""
      }, 3000);

      return
    }

    obtenerCotizacion(cotizar)
  }

  

</script>

<template>

  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
  </div>

  <div class="contenido">

    <Alerta 
      v-if="error"
    >
      {{ error }}
    </Alerta>

    <form 
      class="formulario"
      @submit.prevent="cotizarCripto"
      >

      <!-- Moneda -->
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="">-- Selecciona --</option>
            <option 
              v-for="moneda in monedas" 
              :value="moneda.codigo">{{ moneda.texto }}
            </option>
          </select>
        </div>

      <!-- Criptomoneda -->
        <div class="campo">
          <label for="criptomoneda">Criptomoneda:</label>
          <select id="criptomoneda" v-model="cotizar.criptomoneda">
            <option value="">-- Selecciona --</option>
            <option 
              v-for="criptomoneda in criptomonedas" 
              :value="criptomoneda.CoinInfo.Name">{{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>

        <input type="submit" value="Cotizar" />


    </form>

    <Spiner v-if="cargando"/>

    <Cotizacion v-if="mostrarResultado" :cotizacion="cotizacion"/>


    
  </div>
  
</template>

<style scoped>

</style>
