Proyecto creado con [Next.js](https://nextjs.org/). He hecho una  SPA y para los fetch uso el SSR para el tema de SEO, asi el cliente lo recibe ya renderizado y no tiene que esperar a que el JS se ejecute (incluso sin necesidad de js). Al ser una app de 100 podcast sin filtro por paginas y levantando el servidor en el propio equipo el rendimiento puede ser un poco lento, la manera clara de solucionarlo seria paginar los podcast y hacer el SSR solo de la primera pagina, pero como es un proyecto de prueba (con el diseño marcado) no lo he hecho.

## Primeros pasos 😉

Primero, instala las dependencias 📦:

```bash
npm install
```

Segundo, levanta el servidor en modo desarrollo 💻:

```bash
npm run dev
```

Entra a [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado 🏆.