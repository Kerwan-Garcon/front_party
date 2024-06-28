This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Roadmap

Le sign-up à été temporairement retirer, mais est possible via swagger sur l'api. ( ou postman / thunderclient)

Connecter-vous pour maintenant accéder au site, sans cela, vous n'aurez pas la possibilité d'intéragir avec le site.

PS : Changez en dark-theme une fois connecté si vous êtes plus à l'aise avec le sombre ( petit btn en haut a droite)

### home page

Sur cette page, une liste des evenement est disponible. Cliquez sur "see more" pour accéder au détails de celui-ci.

### party details page

Ici on peut s'inscrire, on remarquera que à l'inverse du message une fois inscrit, pour la DEMO, un user est à la fois Organiseur & 'timide' 👀.

### profil

C'est la page " admin " des organisateurs, on peut voir tout les NOS events ainsi que les participants en cliquant sur une ligne ( si il y en a ).

On a la possibilité de modifier, supprimer un event, ou bien d'y accéder directment d'ici.

Ou bien d'apprové ou refuser un participants.

### chat

la page pour texter les orgas...

IN BUILDING

### user

La liste des tuffer timide pour les noté

IN BUILDING

## Gestion du cache FRONT-END

Ici, react-query est utilisé pour pour mettre en cache les données venant du backend. En effet cela permet qu'en cas de probleme avec le serveur, des données seront tjrs disponible pour l'utilisateur, pendant un temps fixé.

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000, // ICI MIS A 5sc
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      const meta = mutation.options.meta as MutationMeta | undefined;

      meta?.invalidateQueries?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      meta?.customInvalidations?.forEach((invalidationFn) => {
        invalidationFn();
      });
    },
  }),
});
```
