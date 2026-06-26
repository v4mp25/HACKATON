# Acuerdos del equipo

## Ramas
- `main` → versión final estable para presentar. Solo Martel hace merge aquí.
- `develop` → rama de integración. Todos los PRs apuntan aquí.
- `feature/*` → ramas individuales de cada integrante.
- `integration/final-mvp` → rama temporal de Jhunior para unir todo.

## Reglas de oro
1. Nadie trabaja directo en `main`.
2. Toda rama individual sale desde `develop`.
3. Cada integrante toca solo sus archivos permitidos.
4. Todo avance se sube por commit y Pull Request hacia `develop`.
5. Martel revisa Pull Requests. Jhunior valida integración.
6. Antes de hacer push, siempre ejecutar `npm run build`.
7. No subir `.env` con credenciales reales al repositorio.
8. No agregar librerías nuevas sin avisar al equipo.
9. Si algo falla más de 20 minutos, se activa mock o modo demo.
10. Antes de la demo, se congela el código y solo se corrigen bugs críticos.

## Responsabilidades
- **Gilian** → Layout, sidebar, navbar, dashboard visual y cards modernas.
- **Pedro** → Login, registro, formularios de cultivo y lista de cultivos.
- **Jhunior** → Servicios Firebase, Open-Meteo, riskEngine, hooks y PWA.
- **Martel** → Firebase Console, Firestore rules, seed data, GitHub y documentación.
