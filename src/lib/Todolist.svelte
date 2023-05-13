<script>
    import { onMount } from 'svelte';

    let input;
    let listaTareas = [];

    onMount(() => {
      getItems();
    });

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log("envío formulario:", input);
      const data = {
        txt_tarea : input,
      };
      
      fetch(`http://localhost:3000/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(response => {
          // Proceso resultados de Status

          const statusCode = response.status;
          const statusText = response.statusText;
          console.log(`Status es (${statusCode}) ${statusText}`);

          if (response.status === 400) {
            return response.text().then(errorMessage => {
              throw new Error(errorMessage); // el body lo va a manejar el catchError
            });
          }

          return response.text(); // Return the parsed TEXT body
          //return response.josn(); // Return the parsed JSON response body
      })
      .then(data => {
        console.log("body es:",data); // log the response body
        getItems(); // refrezco lista de items.
      })
      .catch(error => {
        alert(error);
        console.error('Tu Error:', error);
      });
    }

    const getItems = async () => {

      input="";
      return fetch('http://localhost:3000/tareas',{
                  method: 'GET', // Specify the desired HTTP method (GET, POST, PUT, etc.)
                  headers: {
                    //'Content-Type': 'application/json', // Set the content type header if needed
                    //'Access-Control-Allow-Origin': 'http://localhost:5173', // Set the origin to match your Svelte app URL
                  },
                })
              .then(response => response.json())
              .then(tareas => {
                listaTareas=tareas;
              })
              .catch(error => console.error(error));

    }

    const handleClickCompletar = async (id) => {
        // marcar como completada
        console.log("completar:",id); // Do something with the id

        fetch(`http://localhost:3000/tareas/${id}/completada`, {
          method: 'PUT',
        })
        .then(response => {
          // handle response
          console.log(response);
          getItems();
        })
        .catch(error => {
          console.error(error);
        });
    }

    const handleClickEliminar = async (id) => {
        console.log("eliminar:",id); // Do something with the id
              
        fetch(`http://localhost:3000/tareas/${id}`, {
          method: 'DELETE',
        })
        .then(response => {
          // handle response
          console.log(response);
          getItems();
        })
        .catch(error => {
          console.error(error);
        });
    }

    const handleClickEditar = async (id) => {
      console.log("editar:",id); // Do something with the id

      const data = {
        txt_tarea : input,
        id: id
      };

      fetch(`http://localhost:3000/tareas/${id}/editar`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          getItems();
        })
        .catch(error => console.error(error));
    }

    // theme swapper
    // const themes= ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"];
    // const html = document.querySelector('html');
    let chk_theme = false;
    let tf_dark;

    // btn_theme checkbox on change event
    const handleTemplate = () => {
      tf_dark = !tf_dark;
    }
   
    
</script>


<!-- esto es si voy a hacer un webComponent, pero esta es una librería
  <svelte:options tag="svelte-todolist" /> -->



<main data-theme={tf_dark ? "halloween" : "light"}>

    <div class="min-h-screen flex flex-col justify-center items-center">
  
      <!-- Theme swapper -->
      <label class="swap swap-rotate fixed right-5 top-5 z-50">
        <input type="checkbox" bind:value={chk_theme} on:change={handleTemplate} />
        <i class="swap-on fa-regular fa-sun"></i>
        <i class="swap-off fa-regular fa-moon"></i>
      </label>
  
      <div class="w-full max-w-md p-4 rounded-lg shadow shadow-lg -mt-2" style="--tw-shadow: 0 1px 10px 3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);">
  
        <h1 class="text-xl text-center mb-4">Formulario</h1>
  
        <form id="formulario" class="mb-4" on:submit={handleSubmit}>
          <label for="tarea"></label>
          <input type="text" name="txt_tarea"  bind:value={input}  placeholder="Nueva tarea.." class="input w-full mb-2 input-bordered input-primary">
          <button id="btn_enviar" class="btn w-full" data-id="0">Nueva</button>
        </form>
  
        <div class="divider"></div>
  
        <h1 class="text-xl text-center mt-4">Lista de Tareas</h1>
  
        <div id="listaTareas">
          {#each listaTareas as item}
          
          {@const completeIcon = item.tf_completada?"fa-circle":"fa-check"}
          {@const htmlTarea=(item.tf_completada)?`<span style="text-decoration:line-through">${item.tarea}</span>`:`<span>${item.tarea}</span>`}

          <div class="card-body">
            <div class="card-actions justify-end">
                <button on:click={()=>handleClickCompletar(item.id)}  class="btn btn-square btn-sm btn-success">        
                  <i class="fa-solid {completeIcon}"></i>
                </button>
                <button on:click={()=>handleClickEliminar(item.id)}  class="btn btn-square btn-sm btn-error">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <button on:click={()=>handleClickEditar(item.id)} class="btn btn-square  btn-sm btn-info">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
            </div>
            <p>
              {@html htmlTarea}
            </p>
          </div>
        {/each}

        </div>
  
      </div>
  
    </div>
  
</main>

<style>
  @import '@fortawesome/fontawesome-free/css/all.css';
</style>
