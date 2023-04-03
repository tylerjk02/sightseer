<script lang="ts">
  import "../app.css";
  import Header from "$lib/Header.svelte";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });
</script>

<Header />

<slot></slot>
