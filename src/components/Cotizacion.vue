<script setup>
    defineProps({
        cotizacion: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="contenedor-resultado">
      <h2>Cotizacion</h2>
      <div class="resultado">
        <img :src="'https://cryptocompare.com/'+cotizacion.IMAGEURL" alt="imagen cripto">

        <div class="">
          <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
          <p>Precio más alto del dia: <span>{{ cotizacion.HIGHDAY  }}</span></p>
          <p>El precio más bajo del dia: <span>{{ cotizacion.LOWDAY }}</span></p>
          <p>Varación última: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
          <p>Última actualización: <span>{{ cotizacion.LASTUPDATE }}</span></p>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>