import { ref, onMounted, computed } from 'vue'

export default function useCripto() {

    // Variables
    const criptomonedas = ref([])

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', texto: 'Peso Mexicano' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
    ])

    const cotizacion = ref({})

    const cargando = ref(false)

    // Funciones
    onMounted(() => {

        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(({ Data }) => {

                //Asignar a la variable criptomonedas los datos de respuesta de la API
                criptomonedas.value = Data
            })

    })

    const obtenerCotizacion = async (cotizar) => {

        cargando.value = true
        cotizacion.value = {}

        try {

            const { moneda, criptomoneda } = cotizar

            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

            const respuesta = await fetch(url)
            const data = await respuesta.json()

            cotizacion.value = data.DISPLAY[criptomoneda][moneda]

        } catch (error) {
            console.log(error);
        } finally {

            cargando.value = false

        }




    }

    const mostrarResultado = computed(()=>{
        //validando que el objeto cotizacion tenga valores
        return Object.values(cotizacion.value).length > 0 
      })

    return {
        monedas,
        criptomonedas,
        cargando,
        cotizacion,
        obtenerCotizacion,
        mostrarResultado
    }


}